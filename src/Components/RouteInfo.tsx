import { useParams } from "react-router-dom";
import { SetStateAction, useState } from "react";

// Mock data for now
const stops = [
  {
    name: "Forest Hills",
    address: "Washington St and Hyde Park Ave, Jamaica Plain, MA 02130",
  },
  { name: "3867 Washington St opp Tollgate Way", address: null },
  { name: "Washington St @ Lochdale Rd", address: null },
  { name: "Washington St @ Archdale Rd", address: null },
  { name: "Washington St @ Mosgrove Ave", address: null },
];
const name =
  "Mattapan Station - Forest Hills Station via Cummins Highway and Roslindale Square";
const status = "Active";
const mockAvgRating = 3.5;
const mockNumRatings = 10;
const mockComments: {user: string, comment: string}[] = [
  {user: "Bob21", comment: "Clean buses, friendly drivers"},
  {user: "Lisa_G17", comment: "Has been late multiple times this week"},
  {user: "BusLuvr<3", comment: "No issues!"},
];

export default function RouteInfo() {
  const [comments, setComments] = useState(mockComments);
  const [avgRating, setAvgRating] = useState(mockAvgRating);
  const [numRatings, setNumRatings] = useState(mockNumRatings);
  const [curComment, setCurComment] = useState("");
  const { id } = useParams(); // Route ID

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setCurComment(e.target.value);
  };

  function submitComment(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (curComment === "") return;
    const mockUser = "MockUser"; // Temporary
    setComments((current) => [{user: mockUser, comment: String(curComment)}].concat(current));
    setCurComment("");
  }

  function handleRatingSubmit(rating: number) {
    setAvgRating(
      (cur) => (cur * numRatings / (numRatings + 1)) + (rating / (numRatings + 1))
    );
    setNumRatings((cur) => cur + 1);
  }

  return (
    <div className="backdrop-blur-md bg-white/10 shadow-2xl rounded-lg overflow-y-auto min-w-1/2 m-6 mt-16 mb-0 p-6 pb-2 h-[calc(100vh-100px)]">
      {/* Top Section: ID, Name, Status */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">{`Route ${id}`}</h1>
        <h2 className="text-2xl">{name}</h2>
        <h4 className="text-lg text-green-500">{`Status: ${status}`}</h4>
      </div>

      {/* Rating Section */}
      <div className="flex flex-col md:flex-row items-center space-x-4 justify-center mb-6">
        <h2 className="text-2xl font-bold">{`${+avgRating.toFixed(1)}/5`}</h2>
        <StarRating rating={avgRating} />

        {/* User rating input */}
        <div className="flex items-center space-x-2">
          <label htmlFor="user-rating" className="text-sm">
            Your Rating:
          </label>
          <select
            id="user-rating"
            className="border rounded px-2 py-1 bg-white/40 border-gray-300 text-white"
            onChange={(e) => handleRatingSubmit(Number(e.target.value))}
          >
            <option value="" disabled selected>Rate</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num} className="bg-gray-500">
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lists Section (Stops & Comments) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stops List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Stops</h2>
          <ol className="space-y-2 bg-white/15 rounded-lg p-2 overflow-y-auto max-h-60">
            {stops.map((stop, index) => (
              <li key={index} className="border-b pb-2 border-white/10">
                <p className="font-medium">{stop.name}</p>
                {stop.address && (
                  <p className="text-sm text-white/80">{stop.address}</p>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Comments List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          <ul className="space-y-2 bg-white/15 rounded-lg p-2 overflow-y-auto max-h-60">
            {comments.map((comment, index) => (
              <li key={index} className="border-b pb-2 border-white/10">
                <p className="text-sm text-white/80">{comment.user}</p>
                <p className="w-full break-words">{comment.comment}</p>
              </li>
            ))}
          </ul>
          <form onSubmit={submitComment}>
            <div className="flex w-full mt-2">
              <input
                name="comment"
                placeholder="Add a comment"
                maxLength={300}
                onChange={handleChange}
                value={curComment}
                autoComplete="off"
                className="border-gray-300 border rounded-md p-2 flex-1"
              />

              <button
                type="submit"
                className="bg-white/40 border-gray-300 border rounded-md p-2 ml-2 hover:bg-white/20"
              >
                Post
              </button>
            </div>
            <div
              className={`text-xs ${
                curComment.length >= 290 ? "text-red-500" : "text-gray-400"
              }`}
            >
              {curComment.length} / 300
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const StarRating = ({ rating }: { rating: number }) => {
  const maxStars = 5;

  return (
    <div className="relative inline-block text-[30px]">
      {/* Empty stars (gray background) */}
      <div className="text-gray-400">★★★★★</div>

      {/* Filled stars (gold foreground) */}
      <div
        className="absolute top-0 left-0 overflow-hidden text-yellow-400 whitespace-nowrap"
        style={{ width: `${(rating / maxStars) * 100}%` }}
      >
        ★★★★★
      </div>
    </div>
  );
};
