import greendot from "../assets/greendot.png";
import alert from "../assets/alert.webp";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Mock bus routes data
type Route = [string, { name: string; status: string }];

export default function BusRoutesList() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/routes");
        const json = await response.json();
        setRoutes(Object.entries(json.routes));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRouteClick = (route: Route) => {
    // Save to sessionStorage
    sessionStorage.setItem(`route_${route[0]}`, JSON.stringify(route));

    // Navigate to the route detail page
    navigate(`/route/${route[0]}`, { state: route });
  };

  return (
    <div className="flex flex-col items-center mt-15">
      <h2 className="text-4xl font-bold mb-2">Routes</h2>
      <div className="backdrop-blur-md bg-white/10 shadow-2xl rounded-lg overflow-hidden min-w-1/2">
        <ol className="list-none p-0 text-white/80 overflow-y-auto max-h-[calc(100vh-200px)]">
          {routes.map((route) => {
            return (
              <div
                onClick={() => handleRouteClick(route)}
                className="block border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors duration-150 p-3"
              >
                <li className="flex justify-between items-center">
                  {/* Route ID & Name */}
                  <div>
                    <h1 className="text-xl font-semibold">{route[0]}</h1>
                    <p className="text-sm">{route[1].name}</p>
                  </div>

                  {/* Status Indicator */}
                  {route[1].status === "Normal" ? (
                    <img
                      src={greendot}
                      alt="Green status"
                      className="w-4 h-4"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <img
                        src={alert}
                        alt="Alert symbol"
                        className="w-4 h-4 mb-1"
                      />
                      <p className="text-xs font-bold text-yellow-500">
                        {route[1].status}
                      </p>
                    </div>
                  )}
                </li>
              </div>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
