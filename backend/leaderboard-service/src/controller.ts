// src/controller.ts
import { Router, Request, Response, NextFunction } from "express";
import { Student } from "./entity/Student";
import { AppDataSource } from "./repo";
import { redisClient } from "./index";

export const router = Router();

/**
 * GET /leaderboard
 * - Check Redis cache
 * - Fallback to Postgres + sort + rank
 * - Cache result
 */
router.get(
	"/leaderboard",
	async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const cacheKey = "leaderboard";

			// 1) Try cache
			const cached = await redisClient.get(cacheKey);
			if (cached) {
				res.json(JSON.parse(cached));
				return; // <— no return value, just exit
			}

			// 2) Hit Postgres
			const repo = AppDataSource.getRepository(Student);
			const students = await repo.find();

			// 3) Sort & rank
			const sorted = students
				.sort((a, b) => b.points - a.points || b.rides - a.rides)
				.map((s, i) => ({ rank: i + 1, ...s }));

			// 4) Store in Redis
			await redisClient.setEx(
				cacheKey,
				Number(process.env.CACHE_TTL ?? 30),
				JSON.stringify(sorted)
			);

			// 5) Return
			res.json(sorted);
		} catch (err) {
			next(err);
		}
	}
);

/**
 * POST /leaderboard
 * - Validate body
 * - Insert new Student
 * - Bust cache
 */
router.post(
	"/leaderboard",
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { name, rides, points } = req.body as {
				name: string;
				rides: number;
				points: number;
			};

			if (!name || typeof rides !== "number" || typeof points !== "number") {
				res.status(400).json({
					error: "Must supply name:string, rides:number, points:number",
				});
				return;
			}

			const repo = AppDataSource.getRepository(Student);
			const student = repo.create({ name, rides, points });
			await repo.save(student);

			// Bust the cached leaderboard
			await redisClient.del("leaderboard");

			res.status(201).json(student);
		} catch (err) {
			next(err);
		}
	}
);
