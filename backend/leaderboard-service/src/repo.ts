import { DataSource } from "typeorm";
import { Student } from "./entity/Student";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT!,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: [Student],
	synchronize: true, // DEV only: auto-create tables
});
