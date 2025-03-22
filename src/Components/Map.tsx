import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "600px",
  height: "400px",
};

// boston as center
const center = {
  lat: 42.3601,
  lng: -71.0589, 
};

const Map = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="my-20 font-bold">Map Page</h1>
      <h2 className="font-semibold mb-4">Google Maps</h2>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} />
      </LoadScript>
    </div>
  );
};

export default Map;
