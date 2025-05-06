import greendot from "../assets/greendot.png";
import alert from "../assets/alert.webp"
import React, { useState, useEffect } from "react";

// Mock bus routes data
type Route = {
  id: string;
  name: string;
  status: string;
};

const routes: Route[] = [
  {
    id: "30",
    name: "Mattapan Station - Forest Hills Station via Cummins Highway and Roslindale Square",
    status: "Normal",
  },
  {
    id: "31",
    name: "Mattapan Station - Forest Hills Station via Morton Street",
    status: "Normal",
  },
  {
    id: "32",
    name: "Wolcott or Cleary Square - Forest Hills Station",
    status: "Delay",
  },
  {
    id: "33",
    name: "River Street & Milton Street - Mattapan Station",
    status: "Normal",
  },
  { id: "34", name: "Dedham Square - Forest Hills Station", status: "Normal" },
  {
    id: "34E",
    name: "Walpole Center - Forest Hills Station",
    status: "No_Service",
  },
  {
    id: "35",
    name: "Dedham Mall or Stimson Street - Forest Hills Station",
    status: "Normal",
  },
  {
    id: "36",
    name: "Millennium Park or VA Hospital - Forest Hills Station",
    status: "Normal",
  },
  {
    id: "37",
    name: "Baker Street & Vermont Street - Forest Hills Station",
    status: "Detour",
  },
  { id: "38", name: "Wren Street - Forest Hills Station", status: "Normal" },
];

export default function BusRoutesList() {
  return (
    <div className="flex flex-col items-center mt-15">
      <h2 className="text-4xl font-bold mb-2">Routes</h2>
      <div className="w-full max-w-xl">
        <ol className="list-none p-0">
          {routes.map((route) => {
            return (
              <li
                key={route.id}
                onClick={() => {}}
                className="flex justify-between items-center border-b py-1 cursor-pointer hover:bg-gray-700 p-2"
              >
                <div>
                  <h1 className="text-xl font-semibold">{route.id}</h1>
                  <p className="text-sm">{route.name}</p>
                </div>
                {route.status === "Normal" ? (
                  <img src={greendot} alt="Green status" className="w-4 h-4"></img>
                ) : (
                  <div className="flex flex-col items-center">
                    <img src={alert} alt="Alert symbol" className="w-4 h-4 mb-1"></img>
                    <p className="text-xs font-bold text-yellow-500">{route.status}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
