import Profile from '../Components/Profile';

function ProfilePage() {
    return (
        <div className="w-full min-h-screen p-4">
            <h1 className="mt-20 text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
				Profile Page
			</h1>
            <Profile />
        </div>
    );
}

export default ProfilePage; 