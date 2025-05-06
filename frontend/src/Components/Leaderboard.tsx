import React, { useState, useEffect } from "react";
import { AddEntryForm } from "./AddEntryForm";

interface Student {
	name: string;
	rides: number;
	points: number;
	rank: number;
}

export default function Leaderboard() {
	const [students, setStudents] = useState<Student[]>([]);
	const [loading, setLoading] = useState(true);

	const load = () => {
		setLoading(true);
		fetch("/api/leaderboard")
			.then((r) => r.json())
			.then(setStudents)
			.finally(() => setLoading(false));
	};

	useEffect(load, []);

	// useEffect(() => {
	// 	fetch("/api/leaderboard")
	// 		.then((res) => {
	// 			if (!res.ok) throw new Error(res.statusText);
	// 			return res.json();
	// 		})
	// 		.then((data: Student[]) => {
	// 			setStudents(data);
	// 		})
	// 		.catch((err) => {
	// 			console.error("Failed to load leaderboard:", err);
	// 		})
	// 		.finally(() => setLoading(false));
	// }, []);

	if (loading) {
		return <div className="p-4 text-white/80">Loading leaderboard…</div>;
	}

	return (
		<>
			<AddEntryForm onSuccess={load} />

			<div className="backdrop-blur-md bg-white/10 shadow-2xl rounded-lg overflow-hidden">
				<table className="min-w-full">
					<thead className="bg-white/5">
						<tr>
							{["Rank", "Name", "Total Rides", "Points"].map((h) => (
								<th
									key={h}
									className="px-6 py-4 text-left text-sm font-medium text-white/90 uppercase tracking-wider"
								>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-white/10">
						{students.map((s) => (
							<tr
								key={s.rank}
								className="hover:bg-white/5 transition-colors duration-150"
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-white/80">
										#{s.rank}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-white/80">{s.name}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-white/80">{s.rides}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-white/80">{s.points}</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
