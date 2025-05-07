import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () =>{
        console.log("Logging in with:", { username, password })
    };

    const handleSignup = () => {
        
    }

    return (
        <div className="flex flex-col h-screen w-full items-center justify-center bg-opacity-0 mt-[-350px]">
            <div className="flex flex-col items-center text-center p-5 border border-gray-300 rounded-lg shadow-lg w-1/5 h-auto space-y-6 backdrop-blur-md bg-white/10">
                <h1 className="text-white text-2xl font-bold">Login</h1>
                <input 
                    className="w-4/5 p-2 border border-gray-300 rounded-md" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    className="w-4/5 p-2 border border-gray-300 rounded-md" 
                    placeholder="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button onClick={handleLogin} className="w-2/5 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-800">
                    Log In
                </button>
                <button onClick={handleSignup} className="w-2/5 p-2 text-white rounded-md underline hover:text-blue-500">
                    Sign Up
                </button>
                <button className="w-3/5 p-2 bg-red-500 text-white rounded-md hover:bg-red-700">
                    Signin with Google
                </button>
            </div>
        </div>
    );
}

export default Login;