import { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// map container size 
const containerStyle = {
  width: "900px",
  height: "550px",
  borderRadius: "16px", 
  overflow: "hidden",
};

// boston as the center 
const center = {
  lat: 42.3601,
  lng: -71.0589,
};

// defining mbta vechicle type
interface MBTAVehicle {
  id: string;
  attributes: {
    latitude: number;
    longitude: number;
    label: string;
  };
  relationships?: {
    route?: {
      data?: {
        id: string;
      };
    };
  };
}

const Map = () => {
  const [buses, setBuses] = useState<MBTAVehicle[]>([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(
          `https://corsproxy.io/?https://api-v3.mbta.com/vehicles?filter[route_type]=3&api_key=${import.meta.env.VITE_MBTA_API_KEY}`
        );
        const data = await response.json();
        console.log("Fetched buses:", data.data);
        setBuses(data.data);


        // posting data into postgres database 
        await fetch('http://localhost:4000/vehicles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data.data),
        });


      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchBuses();
    const interval = setInterval(fetchBuses, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-semibold mb-4">Live MBTA Bus Tracker</h2>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          {buses
            .filter(
              (bus) =>
                bus.attributes.latitude !== null &&
                bus.attributes.longitude !== null
            )
            .map((bus) => ( // bus marker on google maps
              <Marker
                // bus position
                key={bus.id}
                position={{
                  lat: bus.attributes.latitude as number,
                  lng: bus.attributes.longitude as number,
                }}
                
                // label
                label={{
                  text:`${bus.relationships?.route?.data?.id ?? "?"}`,
                  color: "#90ee90",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}

                // icon
                icon={{
                  url: "/red-bus.png", 
                  scaledSize: new window.google.maps.Size(30, 30),
                }}

              />
            ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
