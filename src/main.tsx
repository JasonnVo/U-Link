import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";
// component imports
import HeaderContainer from "./Components/HeaderContainer";
import NavBar from "./Components/NavBar";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import InfoPage from "./pages/InfoPage";
import LeaderboardPage from "./pages/LeaderboardPage";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router>
			<div>
				<video
					autoPlay
					loop
					muted
					className="absolute inset-0 w-full h-full object-cover"
				>
					<source src="/background.mp4" type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-black/40"></div>
				<div className="relative z-10">
					<NavBar />
					<Routes>
						<Route path="/" element={<HeaderContainer />} />
						<Route path="/map" element={<MapPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/info" element={<InfoPage />} />
						<Route path="/leaderboard" element={<LeaderboardPage />} />
					</Routes>
				</div>
			</div>
		</Router>
	</StrictMode>
);
