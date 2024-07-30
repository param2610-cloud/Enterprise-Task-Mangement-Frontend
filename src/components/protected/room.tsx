import { useAppContext } from "@/lib/context";
import api from "@/services/api";
import authenticateUser from "@/services/authenticate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import {
    EmployeeDetails,
    ManagerDetails,
    RoomDetails,
} from "@/lib/interface/Roomdata";
import getUserDetails from "@/services/getUserDetails";
import { ResizableHandle,ResizablePanel,ResizablePanelGroup } from "../ui/resizable";
import { Box } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Overview from "./roomComponent/overview";
import Tasks from "./roomComponent/tasks";
import Employee from "./roomComponent/employee";
import Status from "./roomComponent/status";

const Room = () => {
    const { roomId } = useParams();
    const { user, setUser, RoomDatabase, setRoomDatabase } = useAppContext();
    const { toast } = useToast();
    const [Tab,setTab] = useState<number>(1);
    useEffect(() => {
        const authenticate = async () => {
            const user_details = await authenticateUser();
            if (typeof user_details?.data?.user?._id === "string") {
                setUser(user_details?.data?.user?._id);
            }
        };
        authenticate();
    }, []);

    const [ManagerDetails, setManagerDetails] = useState<
        ManagerDetails[] | null
    >(null);
    const [RoomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
    const [employeeDetails, setEmployeeDetails] =
        useState<EmployeeDetails | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Authenticate user
                if (!user) {
                    const user_details = await authenticateUser();
                    if (typeof user_details?.data?.user?._id === "string") {
                        setUser(user_details.data.user._id);
                    }
                }

                // Fetch room details
                if (!RoomDetails) {
                    if (roomId) {
                        const roomResponse = await api.get(
                            "/rooms/room-details",
                            { params: { roomId: roomId } }
                        );
                        if (roomResponse?.data) {
                            setRoomDetails(roomResponse.data.data);
                        } else {
                            throw new Error("Failed to fetch room details");
                        }
                    }
                }

                // Fetch all manager details
                const fetchManagerDetails = async (managerIds: string[]) => {
                    try {
                        const promises = managerIds.map((id) =>
                            getUserDetails(id)
                        );
                        const responses = await Promise.all(promises);
                        const managers = responses.map(
                            (response) => response?.data.data
                        );
                        return managers;
                    } catch (error) {
                        console.error("Failed to fetch user details", error);
                        throw new Error("Failed to fetch user details");
                    }
                };

                if (!ManagerDetails && RoomDetails?.manager) {
                    try {
                        const newManagerDetails = await fetchManagerDetails(
                            RoomDetails.manager
                        );
                        setManagerDetails((prevDetails) => {
                            if (prevDetails) {
                                return [...prevDetails, ...newManagerDetails];
                            }
                            return newManagerDetails;
                        });
                    } catch (error) {
                        console.error(error);
                    }
                }

                // Fetch employee details
                if (!employeeDetails && user && roomId) {
                    const employeeResponse = await api.get(
                        "/employee/specific-employee-details",
                        {
                            params: {
                                userId: user,
                                roomId: roomId,
                            },
                        }
                    );
                    if (employeeResponse?.data) {
                        setEmployeeDetails(employeeResponse.data.data);
                    } else {
                        throw new Error("Failed to fetch employee details");
                    }
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: (error as Error).message,
                });
            }
        };

        if (RoomDatabase == null && user != null) {
            fetchData();
        }
    }, [RoomDatabase, user, RoomDetails]);

    useEffect(() => {
        if (employeeDetails && ManagerDetails && RoomDetails) {
            setRoomDatabase({
                Employee_Details: employeeDetails,
                Manager_Details: ManagerDetails, 
                Room_Details: RoomDetails,
            });
        }
        console.log(RoomDatabase)
    }, [employeeDetails, ManagerDetails, RoomDetails]);

    return (
        <div className="box-order w-full h-full overflow-hidden bg-[#ffffff] m-0 p-0">
            <div className="w-screen min-h-screen max-h-full flex flex-row">
                <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                <div className=" h-full w-full  ">
                    <div className="flex w-full h-[50px] gap-2 pl-5 mt-2 justify-start items-center text-[20px]`">
                        <Box size={30}/>
                        <p className="text-[23px] font-extrabold">
                        Panel
                        </p>
                    </div>
                    <Separator/>
                    <div className=" h-full w-full flex flex-col items-start">
                        <Button className={`w-full  bg-white text-black h-[60px] hover:bg-white pt-[8px] pb-[2px] `} onClick={()=>setTab(1)}>
                            <div className={Tab==1?`bg-gray-200  w-full h-full flex justify-center items-center text-[20px] font-bold rounded-md active:scale-95 transition-transform duration-150 ease-in-out`:`bg-white  w-full h-full flex justify-center items-center text-[20px] font-bold rounded-md active:scale-95 transition-transform duration-150 ease-in-out`}>
                            Overview
                            </div>
                        </Button>
                        <Button className="w-full  bg-white text-black h-[60px] hover:bg-white pb-[2px]" onClick={()=>setTab(2)}>
                            <div className={Tab==2?`bg-gray-200  w-full h-full flex justify-center items-center text-[20px] font-bold rounded-md active:scale-95 transition-transform duration-150 ease-in-out`:`bg-white  w-full h-full flex justify-center items-center text-[20px] font-bold rounded-md active:scale-95 transition-transform duration-150 ease-in-out`}>
                            Tasks
                            </div>
                        </Button>
                        {RoomDatabase?.Employee_Details.role==='Manager'?
                        <>
                        <Button className="w-full  bg-white text-black h-[60px] hover:bg-white pb-[2px]" onClick={()=>setTab(3)}>
                            <div className={Tab==3?`bg-gray-200  w-full h-full flex justify-center items-center text-[20px] font-bold rounded-md active:scale-95 transition-transform duration-150 ease-in-out`:`bg-white  w-full h-full flex justify-center items-center text-[20px] font-bold rounded-md active:scale-95 transition-transform duration-150 ease-in-out`}>
                                Employees
                            </div>
                        </Button>
                        <Button className="w-full  bg-white text-black h-[60px] hover:bg-white pb-[2px]" onClick={()=>setTab(4)}>
                            <div className={Tab==4?`bg-gray-200  w-full h-full flex justify-center items-center text-[20px] font-bold rounded-md active:scale-95 transition-transform duration-150 ease-in-out`:`bg-white  w-full h-full flex justify-center items-center text-[20px] font-bold rounded-md active:scale-95 transition-transform duration-150 ease-in-out`}>
                                Status
                            </div>
                        </Button>

                        </> :
                        <></>}
                        
                    </div>
                </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={87}>
                <div className=" w-full h-screen">
                    {Tab===1? <Overview/>:<></>}
                    {Tab===2? <Tasks/>:<></>}
                    {Tab===3? <Employee/>:<></>}
                    {Tab===4? <Status/>:<></>}
                </div>
                </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default Room;
