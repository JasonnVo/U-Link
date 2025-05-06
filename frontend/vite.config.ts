import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
	server: {
		host: "0.0.0.0",
		proxy: {
			"/api": {
				target: "http://leaderboard:4000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
