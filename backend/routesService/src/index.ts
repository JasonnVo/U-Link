import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import { Schema, model, connect } from "mongoose";

const app = express();
app.use(cors());
app.use(json());

// Define interface for mongodb documents
interface iRouteInfo {
  _id: string;
  stops: { name: string; address: string }[];
  ratings: number[];
  comments: { user: string; comment: string }[];
}

// Create mongodb document schema
const routeSchema = new Schema<iRouteInfo>({
  _id: String,
  stops: { type: [{ name: String, address: String }], default: [] },
  ratings: { type: [Number], default: [] },
  comments: { type: [{ user: String, comment: String }], default: [] },
});

// Create mongodb document model
const routeInfo = model<iRouteInfo>("routeInfo", routeSchema);

// Connect to mongodb
async function run() {
  await connect(process.env.MONGODB_URI!);
}
run().catch((err) => console.log(err));

// Store all routes from mbta and refresh them every minute
let busRoutes = getRoutes();
setInterval(async () => {
  busRoutes = getRoutes();
}, 60000);

interface MbtaRoute {
  id: string;
  attributes: {
    long_name: string;
  };
}

interface MbtaAlert {
  attributes: {
    effect: string;
    informed_entity: {
      route: string;
    }[];
    header: string;
  };
}

interface MbtaApiResponse {
  data: MbtaRoute[];
}

interface MbtaAlertResponse {
  data: MbtaAlert[];
}

async function getRoutes() {
  const response = await fetch(
    `https://api-v3.mbta.com/routes?api_key=${process.env.MBTA_KEY}&fields%5Broute%5D=id%2Clong_name`
  );
  if (!response.ok) {
    console.error(
      "Failed to fetch MBTA routes:",
      response.status,
      response.statusText
    );
    return [];
  }
  const mbtaResponse = (await response.json()) as MbtaApiResponse;
  const routes = new Map();
  mbtaResponse.data.forEach((route) => {
    routes.set(route.id, {
      name: route.attributes.long_name,
      status: "Normal",
    });
  });

  const alertsResponse = await fetch(
    `https://api-v3.mbta.com/alerts?api_key=${process.env.MBTA_KEY}&fields%5Balert%5D=effect%2Cinformed_entity`
  );
  if (!alertsResponse.ok) {
    console.error(
      "Failed to fetch MBTA alerts:",
      alertsResponse.status,
      alertsResponse.statusText
    );
    return [];
  }
  const alerts = (await alertsResponse.json()) as MbtaAlertResponse;
  alerts.data.forEach((alert) => {
    alert.attributes.informed_entity.forEach((entity) => {
      if (routes.has(entity.route)) {
        routes.set(entity.route, {
          name: routes.get(entity.route).name,
          status: alert.attributes.effect,
        });
      }
    });
  });

  return routes;
}

app.get("/routes", async (req, res) => {
  const result = await busRoutes;
  res.json({ routes: Object.fromEntries(result) });
});

interface MbtaStop {
  attributes: {
    address: string | null;
    name: string;
  };
}

interface MbtaStopResponse {
  data: MbtaStop[];
}

app.get("/routeInfo/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await routeInfo.findById(id);
    if (doc) {
      res.json(doc);
    } else {
      const stopsResponse = await fetch(
        `https://api-v3.mbta.com/stops?api_key=${process.env.MBTA_KEY}&fields%5Bstop%5D=name%2Caddress&filter%5Broute%5D=${id}`
      );
      const stops = (await stopsResponse.json()) as MbtaStopResponse;
      const processedStops = stops.data.map((stop) => ({
        name: stop.attributes.name,
        address: stop.attributes.address,
      }));
      const newDoc = {
        _id: id,
        stops: processedStops,
        ratings: [],
        comments: [],
      };
      await routeInfo.create(newDoc);
      res.json(newDoc);
    }
  } catch (err) {
    console.log(`Error fetching route info: ${(err as Error).message}`);
    res.status(500).send("Error fetching route info");
  }
});

app.post("/rating", async (req, res) => {
  const { id, rating } = req.body;
  try {
    const updatedRatings = await routeInfo.findByIdAndUpdate(
      id,
      { $push: { ratings: rating } },
      { new: true }
    );
    res.json(updatedRatings?.ratings);
  } catch (error) {
    console.error("Error updating ratings:", error);
    res.status(500).send("Error updating ratings");
  }
});

app.post("/comment", async (req, res) => {
  const { id, user, comment } = req.body;
  try {
    const updatedComments = await routeInfo.findByIdAndUpdate(
      id,
      { $push: { comments: {user: user, comment: comment} } },
      { new: true }
    );
    res.json(updatedComments?.comments);
  } catch (error) {
    console.error("Error updating comments:", error);
    res.status(500).send("Error updating comments");
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
