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

interface BusFromDB {
  id: string;
  latitude: number;
  longitude: number;
  label: string;
  route_id: string;
}

const Map = () => {
  const [buses, setBuses] = useState<BusFromDB[]>([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const updateAndFetchBuses = async () => {
      try {
        // tell backend to update buses
        await fetch('http://localhost:4000/update-vehicles', { method: 'POST' });

        // fetch buses from backend
        const response = await fetch('http://localhost:4000/vehicles');
        const data = await response.json();
        console.log('Fetched buses:', data); // test is data is coming 
        setBuses([...data]);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    updateAndFetchBuses();
    const interval = setInterval(updateAndFetchBuses, 10000);

    return () => clearInterval(interval);
  }, []);


  // front end code (map + marker)
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
            .filter((bus) => bus.latitude !== null && bus.longitude !== null)
            .map((bus) => (
              <Marker
                key={`${bus.id}-${bus.latitude}-${bus.longitude}`}
                position={{
                  lat: bus.latitude,    
                  lng: bus.longitude,
                }}
                label={{
                  text: `${bus.route_id ?? "?"}`,
                  color: "#90ee90",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
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
