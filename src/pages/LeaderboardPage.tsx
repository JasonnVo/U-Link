import Leaderboard from "../Components/Leaderboard";

function LeaderboardPage() {
	return (
		<div className="my-20 mx-auto max-w-4xl p-6">
			<h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
				Student Leaderboard
			</h1>
			<Leaderboard />
		</div>
	);
}

export default LeaderboardPage;
