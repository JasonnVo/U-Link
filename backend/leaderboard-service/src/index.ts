import "reflect-metadata";
import express from "express";
import { config } from "dotenv";
import { AppDataSource } from "./repo";
import { createClient } from "redis";
import { router as leaderboardRouter } from "./controller";

config();
const app = express();
app.use(express.json());

export const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });
  redisClient.on("error", (err) => console.error("Redis Error", err));
(async () => {
  try {
	await redisClient.connect();
  
	await AppDataSource.initialize();

	app.use("/api", leaderboardRouter);

	app.listen(4000, () => {
	  console.log("🎉 Leaderboard running on http://localhost:4000");
	});
  } catch (error) {
	console.error(error);
  }
})();
