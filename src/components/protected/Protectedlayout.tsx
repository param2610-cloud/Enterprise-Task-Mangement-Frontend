import { useAppContext } from "@/lib/context";
import authenticateUser from "@/services/authenticate";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Protectedlayout = () => {
    const navigate = useNavigate();
    const [login, setlogin] = useState(false);
    const { setUser } = useAppContext();
    useEffect(() => {
        const authenticate = async () => {
            const user_details = await authenticateUser();
            console.log(user_details)
            if (user_details?.data?.user?._id) {
                setUser(user_details.data._id);
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
                <Outlet />
            </>
        );
    }
};

export default Protectedlayout;
