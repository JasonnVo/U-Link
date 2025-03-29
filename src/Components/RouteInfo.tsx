import { useParams } from "react-router-dom";

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
const avgRating = 3.5;
const comments = [
  "Clean buses, friendly drivers",
  "Has been late multiple times this week",
  "No issues!",
];

export default function RouteInfo() {
  const { id } = useParams();

  return (
    <div className="backdrop-blur-md bg-white/10 shadow-2xl rounded-lg overflow-y-auto min-w-1/2 m-6 mt-16 p-6 h-[calc(100vh-160px)]">
      {/* Top Section: ID, Name, Status */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">{`Route ${id}`}</h1>
        <h2 className="text-2xl">{name}</h2>
        <h4 className="text-lg text-green-500">{`Status: ${status}`}</h4>
      </div>

      {/* Rating Section */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-xl font-semibold">{`${avgRating}/5`}</h2>
        <StarRating rating={avgRating} />
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
                {comment}
              </li>
            ))}
          </ul>
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
