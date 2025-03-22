import { useState } from "react";

/**
 * @property name - Student's name
 * @property rides - Total number of rides taken
 * @property points - Total points earned based on various factors (minutes, miles, etc.)
 */
interface Student {
	name: string;
	rides: number;
	points: number;
}

/**
 * Leaderboard Component
 * Displays a frosted-glass styled table showing student rankings based on their ride counts
 */
function Leaderboard() {
	// TODO: Replace with actual data from backend
	// Currently using placeholder data for demonstration
	const [students] = useState<Student[]>([
		{ name: "Emma Thompson", rides: 45, points: 450 },
		{ name: "James Wilson", rides: 38, points: 380 },
		{ name: "Sarah Davis", rides: 32, points: 320 },
		{ name: "Michael Brown", rides: 29, points: 9000 },
		{ name: "Lisa Anderson", rides: 25, points: 250 },
	]);

	// Sort students by rides in descending order and update ranks
	const sortedStudents = [...students]
		.sort((a, b) => {
			// Sort by points first
			if (b.points !== a.points) {
				return b.points - a.points;
			}
			// If points are equal, sort by rides
			return b.rides - a.rides;
		})
		.map((student, index) => ({
			...student,
			rank: index + 1, // Add rank during rendering
		}));

	return (
		// Main container with frosted glass effect
		<div className="backdrop-blur-md bg-white/10 shadow-2xl rounded-lg overflow-hidden">
			<table className="min-w-full">
				<thead className="bg-white/5">
					{/* Table header with slightly less transparent background */}
					<tr>
						<th className="px-6 py-4 text-left text-sm font-medium text-white/90 uppercase tracking-wider">
							Rank
						</th>
						<th className="px-6 py-4 text-left text-sm font-medium text-white/90 uppercase tracking-wider">
							Name
						</th>
						<th className="px-6 py-4 text-left text-sm font-medium text-white/90 uppercase tracking-wider">
							Total Rides
						</th>
						<th className="px-6 py-4 text-left text-sm font-medium text-white/90 uppercase tracking-wider">
							Points
						</th>
					</tr>
				</thead>
				{/* Table body with subtle dividers between rows */}
				<tbody className="divide-y divide-white/10">
					{/* Map through students and create a row for each */}
					{sortedStudents.map((student) => (
						<tr
							key={student.rank}
							className="hover:bg-white/5 transition-colors duration-150"
						>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm font-medium text-white/80">
									{/* Display the student's rank */}#{student.rank}
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								{/* Display the student's name */}
								<div className="text-sm text-white/80">{student.name}</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								{/* Display the student's total rides */}
								<div className="text-sm text-white/80">{student.rides}</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								{/* Display the student's total points */}
								<div className="text-sm text-white/80">{student.points}</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Leaderboard;
