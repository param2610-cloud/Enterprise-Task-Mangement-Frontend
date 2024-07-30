import { useAppContext } from "@/lib/context";
import api from "@/services/api";
import authenticateUser from "@/services/authenticate";
import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import "../../index.css";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ApiResponse } from "@/lib/interface/user";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useToast } from "../ui/use-toast";
import { Card, CardContent, CardTitle } from "../ui/card";
import getUserDetails from "@/services/getUserDetails";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
    const { user, setUser,setRoomDatabase } = useAppContext();
    const [UserDetails, setUserDetails] = useState<ApiResponse | any>();
    const [avatarImage, setAvatarImage] = useState<string>("");
    const [, setLoading] = useState<boolean>(false);
    const [RoomName, setRoomName] = useState<string | null>();
    const [Array_Of_Employee_Details_On_Specific_Room, setArray_Of_Employee_Details_On_Specific_Room] = useState<any>([]);
    const [DialogOpen, setDialogOpen] = useState<boolean>(false);
    const [refineroomDatawithoutmanager, setrefineRoomDatawithoutmanager] = useState<any>([]);
    const [refineroomData, setrefineRoomData] = useState<any>([]);
    // const [] = useState<boolean>(false);

    const { toast } = useToast();
    useEffect(() => {
        const authenticate = async () => {
            const user_details = await authenticateUser();
            if (typeof user_details?.data?.user?._id === "string") {
                setUser(user_details?.data?.user?._id);
            }
        };
        authenticate();
    }, []);
    
    //now fetch details of all roomId exists at this state
    //store the details of those in RoomList_Detail useState {Room_id,manager,name,isParent,Role}
    
    
    
    //Get all employee exists on this user id  
    const Fetch_All_Employee_Exists_On_This_UserID = async () => {
        if (user) {
            const employeeData = await api.get("/rooms/employee-list", {
                params: { userId: user },
            });
            //store it in Array_Of_Employee_Details_On_Specific_Room useState
            setArray_Of_Employee_Details_On_Specific_Room(employeeData.data.data);
        }
    };

    const fetchUserDetails = async (userId: String) => {
        const UserDetails = await api.get("/users/getUser", {
            params: { userId: userId },
        });
        
        if (!UserDetails) {
            return null;
        }
        setUserDetails(UserDetails);
    };

    //run it in useeffect[user]
    useEffect(() => {
        if (user != null) {
            Fetch_All_Employee_Exists_On_This_UserID();
            fetchUserDetails(user);
        }
    }, [user]);

    const fetch_Specific_Room_Details = async (roomId: string) => {
        const result = await api.get("/rooms/room-details", {
            params: { roomId: roomId },
        });
        if (result) {
            return result;
        } else return null;
    };
    useEffect(() => {
        const fetchAllRoomDetails = async () => {
            if (Array_Of_Employee_Details_On_Specific_Room) {
                const fetchdata = await Promise.all(
                    Array_Of_Employee_Details_On_Specific_Room.map(async (item: any) => {
                        const data = await fetch_Specific_Room_Details(item.roomid);
                        return { Employee_Details:item, Room_Details: data?.data.data };
                    })
                );
                setrefineRoomDatawithoutmanager(fetchdata);
            }
        };
        
        fetchAllRoomDetails();
        
    }, [Array_Of_Employee_Details_On_Specific_Room]);
    useEffect(()=>{
        const fetchManagerDetailsAndRole = async () => {
                const fetchdata = await Promise.all(
                    refineroomDatawithoutmanager.map(async (item: any) => {
                        const Manager = await getUserDetails(
                            item.Room_Details.manager[0]
                        );

                        return { ...item, Manager_Details: Manager?.data.data };
                    })
                );
                setrefineRoomData(fetchdata);
            
        };
        if(refineroomDatawithoutmanager.length > 0 && refineroomDatawithoutmanager[0]?.Room_Details){
            fetchManagerDetailsAndRole();
        }
    },[refineroomDatawithoutmanager])



    const MakeRoom = async () => {
        setLoading(true);
        if (RoomName && user) {
            const Roomdetails = await api.post("/rooms/make-room", {
                user,
                RoomName,
            });

            setLoading(false);
            if (!Roomdetails) {
                toast({
                    title: "Failed",
                    description:
                        "Failed to Make room for an unexpected error. Try Again.",
                });
            } else {
                toast({
                    title: "Success",
                    description: "Room Created Successfully",
                });
                setDialogOpen(false);
            }
            Fetch_All_Employee_Exists_On_This_UserID();
        } else {
            if (!RoomName) {
                toast({
                    title: "Empty Room Name!!!",
                    description: "Please Provide a Room name. Try Again.",
                });
            }
        }
    };
    useEffect(() => {
        if (UserDetails) {
            if (typeof UserDetails.data.data.avatarUrl == "string")
                setAvatarImage(UserDetails.data.data.avatarUrl);
        }
    }, [UserDetails]);

    // useEffect(() => {}, [RoomList]);
    return (
        <div className="box-order w-full  h-full overflow-hidden bg-[#ffffff] m-0 p-0">
            <div className="w-screen min-h-screen max-h-full flex flex-col">
                <div className="fixed right-0 left-0 top-0 w-screen h-[7vh]  flex px-5 py-2 items-center justify-between z-10 bg-white">
                    <div className="font-Lato text-[3vh] font-semibold ">
                        ManageMate
                    </div>
                    <div className="flex gap-7">
                        <div id="CreateRoom">
                            <Dialog
                                open={DialogOpen}
                                onOpenChange={setDialogOpen}
                            >
                                <DialogTrigger>
                                    <button
                                        onClick={() => setDialogOpen((e) => !e)}
                                        className="bg-red-500 px-4 py-2 rounded-md text-white font-bold"
                                    >
                                        Create Room
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader className="text-2xl font-Inter font-bold py-5">
                                        Create Room
                                    </DialogHeader>
                                    <DialogDescription className="p-2 pb-0">
                                        <div className="flex gap-5 justify-center items-center">
                                            <Label className="text-lg text-black">
                                                Name:
                                            </Label>
                                            <Input
                                                onChange={(e) =>
                                                    setRoomName(e.target.value)
                                                }
                                                className="h-8 border-2 "
                                            />
                                        </div>
                                        <div className="w-full m-4 flex justify-end">
                                            <button
                                                onClick={MakeRoom}
                                                className="text-xl bg-red-600 text-white font-bold px-3 py-2 rounded-lg"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div>
                            <button
                                onClick={Fetch_All_Employee_Exists_On_This_UserID}
                                className="bg-green-500 px-4 py-2 rounded-md text-white font-bold"
                            >
                                Join Room
                            </button>
                        </div>
                        <div className="flex justify-center items-centers">
                            <Popover>
                                <PopoverTrigger>
                                    <button className="">
                                        <Bell />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="w-full h-full flex flex-col ">
                                        //notification
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex justify-center items-centers">
                            <button>
                                <Avatar className="border-[1px] border-black">
                                    <AvatarImage src={avatarImage} />
                                </Avatar>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-screen h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-[7vh]">
                    {refineroomData.map((item: any, index: any) =>{
                        console.log(item)
                        
                    return (
                        <Link to={`/panel/room/${item.Room_Details._id}`} onClick={()=>{setRoomDatabase(item)}}>
                        <Card key={index} className="">
                            <CardTitle>
                                {item.Room_Details
                                    ? item.Room_Details.name
                                    : "Loading..."}
                            </CardTitle>
                            <CardContent>
                                <div>{item.Manager_Details.name}</div>
                                <div>{item.Employee_Details.role}</div>
                            </CardContent>
                        </Card>
                    </Link>
                    )})}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
