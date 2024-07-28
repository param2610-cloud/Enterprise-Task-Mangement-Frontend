import { useAppContext } from "@/lib/context";
import api from "@/services/api";
import authenticateUser from "@/services/authenticate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import {
    EmployeeDetails,
    ManagerDetails,
    RoomData,
    RoomDetails,
} from "@/lib/interface/Roomdata";

const Room = () => {
    const { roomId } = useParams();
    const { user, setUser, RoomDatabase, setRoomDatabase } = useAppContext();
    const { toast } = useToast();
    useEffect(() => {
        const authenticate = async () => {
            const user_details = await authenticateUser();
            if (typeof user_details?.data?.user?._id === "string") {
                console.log(user_details?.data?.user?._id);
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
                            api.get("/users/getUser", {
                                params: { userId: id },
                            })
                        );
                        const responses = await Promise.all(promises);
                        const managers = responses.map(
                            (response) => response.data.data
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

        if (RoomDatabase == null) {
            fetchData();
        }
    }, [
        roomId,
        user,
        RoomDetails,
        ManagerDetails,
        employeeDetails,
        RoomDatabase,
        setUser,
        setRoomDatabase,
        toast,
    ]);

    console.log(employeeDetails);
    console.log(ManagerDetails);
    console.log(RoomDetails);

    return (
        <div className="box-order w-full h-full overflow-hidden bg-[#ffffff] m-0 p-0">
            <div className="w-screen min-h-screen max-h-full flex flex-col">
                <div
                    id="roomTitle"
                    className="fixed top-0 right-0 bottom-0 w-screen bg-green-100 h-[100px] flex items-center p-5 text-2xl font-PlayfairDisplay"
                >
                    {RoomDatabase?.Room_Details?.name || "Loading..."}
                </div>
            </div>
        </div>
    );
};

export default Room;
