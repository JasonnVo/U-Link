import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useState } from "react";
import {jwtDecode } from "jwt-decode";

interface GoogleJwtPayload {
    email: string;
    name: string;
    sub: string;
}

function Login() {
    const [loggedin, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // handles the login process for google OAuth
    const handleSuccess = async (credentialResponse : any) => {
        console.log("Login Success:", credentialResponse);

        const token = credentialResponse.credential;
        const decodedToken = jwtDecode<GoogleJwtPayload>(token);
        console.log("Decoded Token:", decodedToken);

        const {email, name, sub} = decodedToken
        // Stores user into database
        try {
            const res = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    google_id: sub,
                    email: email,
                    username: name
                })
            })
    
            if (!res.ok) throw new Error("Failed to save user");
            const data = await res.json();
            console.log("User stored or exists:", data);
    
            setLoggedIn(() =>true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // handles the login process fail for google OAuth
    const handleError = () => {
        console.log("Login Failed");
    };

    // handles the logout process for google OAuth
    const handleLogout = () => {
        googleLogout();
        setLoggedIn(() => false);
        console.log("Logout");
    };

    // this function handles manual login without google OAuth got scrapped when the app was made
    // this is just a placeholder for now
    const handleLogin = () => {
        console.log("Login");
        setLoggedIn(() =>true);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-start w-80 pt-6 pb-8 px-6 rounded-lg shadow-lg backdrop-blur-md bg-white/10 space-y-4">
                {/* this part is for when user is logged in it shows a logout button otherwise it shows a login stuff */}
                {!loggedin ? (
                    <>
                        {/* username input */}
                        <input 
                            className="w-4/5 p-2 border border-gray-300 rounded-md" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        {/* password input */}
                        <input 
                            className="w-4/5 p-2 border border-gray-300 rounded-md" 
                            placeholder="Password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        {/* login button */}
                        <button onClick={handleLogin} className="w-2/5 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-800">
                            Log In
                        </button>
                        {/* google login button */}
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                    </>
                ) : (
                    <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}


export default Login;
