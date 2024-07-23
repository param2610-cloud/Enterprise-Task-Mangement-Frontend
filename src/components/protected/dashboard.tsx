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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useToast } from "../ui/use-toast";
import { Card } from "../ui/card";

const Dashboard: React.FC = () => {
    const { user, setUser } = useAppContext();
    const [UserDetails, setUserDetails] = useState<ApiResponse | any>();
    const [avatarImage, setAvatarImage] = useState<string>("");
    const [Loading, setLoading] = useState<boolean>(false);
    const [RoomName, setRoomName] = useState<string | null>();
    const [RoomList, setRoomList] = useState<any>([]);
    const [DialogOpen,setDialogOpen] = useState<boolean>(false)

    const { toast } = useToast();
    useEffect(() => {
        const authenticate = async () => {
            const user_details = await authenticateUser();
            console.log(user_details);
            if (typeof user_details?.data?.user?._id === "string") {
                setUser(user_details?.data?.user?._id);
            }
        };
        authenticate();
    }, []);
    const FetchAllRoomData = async () => {
      if(user){
        const roomData = await api.get("/rooms/employee-list", {

            params: { userId: user }, 
          });
          setRoomList(roomData.data.data);
          console.log("api response ",roomData);
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
            FetchAllRoomData();
            
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
        console.log(user);
        if (user != null) {
            FetchAllRoomData();
            fetchUserDetails(user);
        }
    }, [user]);
    useEffect(() => {
        if (UserDetails) {
            if (typeof UserDetails.data.data.avatarUrl == "string")
                setAvatarImage(UserDetails.data.data.avatarUrl);
        }
    }, [UserDetails]);

    useEffect(()=>{
      console.log("this is from use effect ",RoomList)
    },[RoomList])
    return (
        <div className="box-order w-full  h-full overflow-hidden bg-[#ffffff] m-0 p-0">
            <div className="w-screen min-h-screen max-h-full flex flex-col">
                <div className="fixed right-0 left-0 top-0 w-screen h-[7vh]  flex px-5 py-2 items-center justify-between z-10 bg-white">
                    <div className="font-Lato text-[3vh] font-semibold ">
                        ManageMate
                    </div>
                    <div className="flex gap-7">
                        <div id="CreateRoom">
                            <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger>
                                    <button onClick={()=>setDialogOpen(e=>!e)} className="bg-red-500 px-4 py-2 rounded-md text-white font-bold">
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
                            <button onClick={FetchAllRoomData} className="bg-green-500 px-4 py-2 rounded-md text-white font-bold">
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
                <div className="w-screen h-full grid-flow-row mt-[7vh]">
                  {RoomList && RoomList.map((item:any,index:any)=>(
                    <Card id={index} className="">
                      {JSON.stringify(item)}
                    </Card>
                  ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
