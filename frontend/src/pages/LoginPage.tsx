import Login from "../Components/Login";

function LoginPage() {
	return (
		<div className="w-full min-h-screen p-4">
			<h1 className="mt-50 text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
				Login Page
			</h1>
			<Login />
		</div>
	);
}

export default LoginPage;
