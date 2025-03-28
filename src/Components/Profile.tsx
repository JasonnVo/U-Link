import { useState } from "react";

const Profile = () => {
    const [bio, setbio] = useState("hi I LIKE TRAINS");

    const handleEditprofile = () =>{
        setbio(() => "I LIKE TRAINS A LOT CHOO CHOO CHOOO CHOOO 🚂｡🚋｡🚋｡🚋｡🚋˙⊹⁺.")
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-opacity-100 p-10">
            <div className="bg-gray-700 p-12 rounded-lg shadow-lg text-left w-[600px] backdrop-blur-md bg-white/10 flex items-center space-x-8">
                <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-7xl">👤</span>
                </div>
                <div>
                    <h1 className="text-5xl font-bold mt-2 text-white">John Doe</h1>
                    <p className="text-xl text-white">Followers: 0 | Following: 0 | Rank: 1</p>
                    <p className="text-xl text-white mt-2">{bio}</p>
                    <button onClick={handleEditprofile} className="mt-4 px-8 py-4 bg-blue-500 text-white text-xl rounded-lg shadow-md hover:bg-blue-600">
                        Edit Profile
                    </button>
                </div>
            </div>
            <div className="mt-10 p-8 bg-gray-200 rounded-lg text-3xl font-semibold w-[600px] text-center backdrop-blur-md bg-white/10">
                Total Rides: 1000
            </div>
        </div>
    );
};

export default Profile;
