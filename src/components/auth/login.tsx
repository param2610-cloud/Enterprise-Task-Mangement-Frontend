import api from "@/services/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import authenticateUser from "@/services/authenticate";
import { useAppContext } from "@/lib/context";

interface ErrorMessage {
    error: boolean;
    title: string;
    description: string;
}
interface Message {
    message: boolean;
    title: string;
    description: string;
}

function LoginPage() {
    const navigate = useNavigate();
    const {setUser} = useAppContext();
    useEffect(() => {
        const authenticate = async () => {
            const user_details = await authenticateUser();
            if (user_details?.data?.user?._id) {
                setUser(user_details.data._id)
                console.log("triggered");
                navigate("/panel/dashboard");
            }
        };
        authenticate();
    }, []);

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<ErrorMessage>();
    const [message, setMessage] = useState<Message>();
    const { toast } = useToast();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(`email: ${email}, password: ${password}`);

        if (email && password) {
            try {
                const response = await api.post("/users/login", {
                    email,
                    password,
                });
                console.log(response);
                const { user } = response.data.data;
                console.log(user);
                setMessage({
                    message: true,
                    title: "Successfully logged in",
                    description: user.name,
                });
                navigate("/panel/dashboard");
            } catch (error: any) {
                if (error.response) {
                    setError({
                        error: true,
                        title: "Login Failed",
                        description:
                            error.response.data.message ||
                            "An unexpected error occurred",
                    });
                } else {
                    setError({
                        error: true,
                        title: "Login Failed",
                        description: "An unexpected error occurred",
                    });
                }
            }
        } else {
            setError({
                error: true,
                title: "Login Failed",
                description: "Please fill in the email and password sections",
            });
        }
    };

    useEffect(() => {
        if (error?.error == true) {
            toast({
                title: error.title,
                description: error.description,
            });
        }
    }, [error]);
    useEffect(() => {
        if (message?.message == true) {
            toast({
                title: message.title,
                description: message.description,
            });
        }
    }, [message]);

    return (
        <div className="flex h-screen">
            <div className="flex flex-col items-center justify-center w-1/2 bg-green-100 p-8">
                <div className="mb-8">
                    <img
                        src="path/to/your/illustration.png"
                        alt="Exam Mastery Hub"
                        className="w-64 h-64"
                    />{" "}
                    {/* Add the path to your illustration image */}
                </div>
                <h1 className="text-3xl font-semibold mb-4">
                    Exam Mastery Hub
                </h1>
                <p className="text-lg text-gray-600 text-center">
                    Unleash Your Academic Success with Exam Mastery Hub's Exam
                    Excellence Platform
                </p>
            </div>
            <div className="flex flex-col items-center justify-center w-1/2 bg-green-50 p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold">MANAGE-MATE</h2>
                </div>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="xyz@email.com"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        />
                    </div>
                    <div className="flex justify-end mb-6">
                        <a
                            href="#"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mb-4 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-700"
                    >
                        Sign in
                    </button>
                    {/* <div className="text-center text-gray-500 mb-4">or</div>
          <button type="button" className="w-full py-2 mb-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-400" onClick={GoogleAuth}>Sign in with Google</button> */}
                    <div className="text-center text-gray-500">
                        Are you new?{" "}
                        <Link
                            to="/auth/signup"
                            className="text-blue-600 hover:underline"
                        >
                            Create an Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
