import React, { useState, FormEvent } from "react";

interface EntryForm {
	name: string;
	rides: string;
	points: string;
}

export function AddEntryForm({ onSuccess }: { onSuccess(): void }) {
	const [entry, setEntry] = useState<EntryForm>({
		name: "",
		rides: "",
		points: "",
	});
	const [error, setError] = useState<string>("");

	async function submit(e: FormEvent) {
		e.preventDefault();
		setError("");

		// parse the string inputs into numbers
		const ridesNum = parseInt(entry.rides, 10);
		const pointsNum = parseInt(entry.points, 10);

		// minimal validation
		if (!entry.name.trim() || isNaN(ridesNum) || isNaN(pointsNum)) {
			setError("Please enter a name and valid numbers for rides & points.");
			return;
		}

		try {
			const res = await fetch("/api/leaderboard", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: entry.name.trim(),
					rides: ridesNum,
					points: pointsNum,
				}),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.error || res.statusText);
			}
			// clear the form
			setEntry({ name: "", rides: "", points: "" });
			onSuccess();
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Failed to add entry");
			}
		}
	}

	return (
		<form onSubmit={submit} className="flex gap-2 mb-4 items-center">
			<input
				type="text"
				placeholder="Name"
				value={entry.name}
				onChange={(e) => setEntry((old) => ({ ...old, name: e.target.value }))}
				className="p-2 rounded bg-white/20 text-white placeholder-white/50 border border-white/30 focus:bg-white/30 focus:outline-none transition duration-150"
			/>
			<input
				type="number"
				placeholder="Rides"
				value={entry.rides}
				onChange={(e) => setEntry((old) => ({ ...old, rides: e.target.value }))}
				className="p-2 rounded bg-white/20 text-white placeholder-white/50 border border-white/30 focus:bg-white/30 focus:outline-none transition duration-150"
			/>
			<input
				type="number"
				placeholder="Points"
				value={entry.points}
				onChange={(e) =>
					setEntry((old) => ({ ...old, points: e.target.value }))
				}
				className="p-2 rounded bg-white/20 text-white placeholder-white/50 border border-white/30 focus:bg-white/30 focus:outline-none transition duration-150"
			/>

			<button
				type="submit"
				className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
			>
				Add
			</button>
			{error && <span className="text-red-400 ml-4">{error}</span>}
		</form>
	);
}
