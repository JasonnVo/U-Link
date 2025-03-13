function Login() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center text-center p-5 border border-gray-300 rounded-lg shadow-lg bg-gray-700 w-1/5 h-3/5">
                <h1 className="text-white text-2xl font-bold">Login</h1>
                <p className="text-white mt-4">Username</p>
                <input className="w-4/5 p-2 mt-1 border border-gray-300 rounded-md" />
                <p className="text-white mt-4">Password</p>
                <input className="w-4/5 p-2 mt-1 border border-gray-300 rounded-md" />
                <button className="w-2/5 p-2 mt-8 bg-blue-500 text-white rounded-md hover:bg-blue-700">Log In</button>
                <button className="w-2/5 p-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">Login with Google</button>
            </div>
        </div>
    );
}

export default Login;
