import{ useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avataruploader from "../reusable/avataruploader";
import api from "@/services/api";
import { useToast } from "../ui/use-toast";
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

function Signup() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [Confirmpassword, setConfirmPassword] = useState("");
    const [selectedfile] = useState(null);
    const [error, setError] = useState<ErrorMessage>();
    const [message, setMessage] = useState<Message>();
    const [same, setSame] = useState<boolean | null>(false);
    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);
    const { setUser } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const login = async (): Promise<string | null> => {
            if (email && password) {
                try {
                    const response = await api.post("/users/login", {
                        email,
                        password,
                    });
                    const { user } = response.data.data;
                    setMessage({
                        message: true,
                        title: "Successfully logged in",
                        description: user.name,
                    });
                    return user._id;
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
                    description:
                        "Please fill in the email and password sections",
                });
            }
            return null;
        };

        if (registerSuccess) {
            const loginUser = async () => {
                const userId_ = await login();
                console.log(userId_);
                if (userId_) {
                    setUserId(userId_);
                    setLoginSuccess(true);
                }
            };

            loginUser();
        }
    }, [registerSuccess]);

    useEffect(() => {
        if (loginSuccess && userId) {
            setUser(userId);
            navigate("/panel/dashboard");
        }
    }, [loginSuccess, userId, setUser, navigate]);

    useEffect(() => {
        if (
            Confirmpassword === password &&
            Confirmpassword !== "" &&
            password !== ""
        ) {
            setSame(true);
        } else {
            setSame(false);
        }
    }, [Confirmpassword, password]);

    const { toast } = useToast();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (
            email &&
            password &&
            name &&
            Confirmpassword &&
            password === Confirmpassword &&
            selectedfile
        ) {
            try {
                const formdata = new FormData();
                formdata.append("fullName", name);
                formdata.append("email", email);
                formdata.append("password", password);
                formdata.append("avatar", selectedfile, "Avatar.jpg");

                const response = await api.post("users/register", formdata, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                const user = response.data.data;

                setMessage({
                    message: true,
                    title: "Successfully Registered.",
                    description: user.name,
                });
                setRegisterSuccess(true);
            } catch (error: any) {
                if (error.response) {
                    setError({
                        error: true,
                        title: "Registration Failed",
                        description:
                            error.response.data.message ||
                            "An unexpected error occurred",
                    });
                } else {
                    setError({
                        error: true,
                        title: "Registration Failed",
                        description: "An unexpected error occurred",
                    });
                }
            }
        } else {
            setError({
                error: true,
                title: "Registration Failed",
                description:
                    "Please fill Full Name, Email, password and confirm password",
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
            <div className="flex  items-center justify-center w-1/2 bg-green-50 p-8">
                <div className="flex flex-col items-center justify-center">
                    <Avataruploader
                        setselecetedfile={selectedfile}
                    />
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 bg-green-50 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold">MANAGE-MATE</h2>
                    </div>
                    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            />
                        </div>
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
                        <div className="mb-6">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="********"
                                value={Confirmpassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            />
                            {same && same ? (
                                <p className="text-green-400">
                                    Passwords are matched.
                                </p>
                            ) : (
                                <p className="text-red-600">
                                    Passwords are till unmatched
                                </p>
                            )}
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
                            Sign up
                        </button>
                        {/* <div className="text-center text-gray-500 mb-4">or</div> */}
                        {/* <button type="button" className="w-full py-2 mb-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-400" onClick={GoogleAuth}>Sign up with Google</button> */}
                        <div className="text-center text-gray-500">
                            Already have an Account{" "}
                            <Link
                                to="/auth/login"
                                className="text-blue-600 hover:underline"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
