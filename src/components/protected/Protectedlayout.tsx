import { AppProvider } from "@/lib/context";
import authenticateUser from "@/services/authenticate";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "../ui/toaster";

const Protectedlayout = () => {
    const navigate = useNavigate();
    const [login, setlogin] = useState(false);
    useEffect(() => {
        const authenticate = async () => {
            const user_details = await authenticateUser();
            console.log(user_details)
            if (typeof(user_details?.data?.user?._id)==='string') {
                
                setlogin(true);
            }
        };
        authenticate();
    }, []);
    if (!login) {
        return <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="text-[50px]">Looks like, you are not logged in.</h1>
            <button className="text-[30px] border-2 border-black rounded-md px-6 px-4" onClick={()=>navigate('/auth/login')}>Login</button>
        </div>;
    }
    if (login) {
        return (
            <>  
                <AppProvider>
                <Outlet />
                <Toaster/>
                </AppProvider>
            </>
        );
    }
};

export default Protectedlayout;
