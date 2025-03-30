import { useState } from "react";

interface Student {
	name: string;
	rides: number;
	points: number;
}

const Profile = () => {
    const [bio, setBio] = useState("add a bio");
    const [isEditing, setIsEditing] = useState(false);
    const [tempBio, setTempBio] = useState(bio);

    const [students] = useState<Student[]>([
        { name: "Michael Brown", rides: 29, points: 9000 }
    ]);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        setBio(tempBio);
        setIsEditing(false);
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-opacity-100 p-10">
            <div className="bg-gray-700 p-12 rounded-lg shadow-lg text-left w-[600px] backdrop-blur-md bg-white/10 flex items-center space-x-8">
                <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-7xl">👤</span>
                </div>
                <div>
                    <h1 className="text-5xl font-bold mt-2 text-white">{students[0].name}</h1>
                    <p className="text-xl text-white">Followers: 0 | Following: 0 | Rank: 1</p>
                    {isEditing ? (
                        <div className="mt-2">
                            <input
                                type="text"
                                value={tempBio}
                                onChange={(e) => setTempBio(e.target.value)}
                                className="p-2 border rounded w-full text-white"
                            />
                            <button onClick={handleSaveProfile} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
                                Save Bio
                            </button>
                        </div>
                    ) : (
                        <p className="text-xl text-white mt-2">{bio}</p>
                    )}

                    {!isEditing && (
                        <button onClick={handleEditProfile} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                            Edit Bio
                        </button>
                    )}
                </div>
            </div>
            <div className="mt-10 p-8 bg-gray-200 rounded-lg text-3xl font-semibold w-[600px] text-center backdrop-blur-md bg-white/10">
                Total Rides: {students[0].rides}
            </div>
        </div>
    );
};

export default Profile;
