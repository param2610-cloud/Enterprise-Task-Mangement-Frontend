import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/lib/context";
import { User } from "@/lib/interface/user";
import { Edit, Trash2 } from "lucide-react";
import { useEffect } from "react";


function Overview() {
    const { RoomDatabase } = useAppContext();
    console.log("asdsad",RoomDatabase);
    return (
        <div className="w-screen h-full grid gap-4 grid-cols-10 grid-rows-10">
            <div
                id="roomName"
                className="row-start-1 row-end-3 col-start-1 col-end-4 flex justify-start items-center text-[3vw] font-Montserrat font-extrabold  pl-10 flex-col"
            >
                <div className="w-full h-full">
                <p>{RoomDatabase?.Room_Details?.name}</p>
                <p className="text-green-500 text-sm font-medium w-full pl-2">{RoomDatabase?.Employee_Details?.role}</p>
                </div>
            </div>
            <div
                id="author"
                className="row-start-3 row-end-5 col-start-1 col-end-4 flex justify-center items-center"
            >
                <div className=" ml-2 shadow-lg  rounded-lg text-[2vw] font-Lato flex w-full h-full justify-center items-center flex-col">
                    {console.log("this",RoomDatabase)||"asd"}
                    <p className="flex ">
                    <p className="text-black">Author :{" "}</p><p className="text-blue-500 pl-1 hover:border-b-2 border-blue-500 cursor-pointer">{RoomDatabase?.Manager_Details[0]?.name}</p>
                    </p>
                    
                </div>  
            </div>
            <div className="row-start-5 row-end-10 col-start-1 col-end-4 pl-3">
              <div className=" w-full h-full">
              <div className="text-[30px] font-bold flex justify-between items-center pl-4">
                Manager List
                <Button>Add Manager</Button>
              </div>
                <div className="border-2 w-full h-full rounded-md shadow-lg mt-5">
                    <ScrollArea className="h-full w-full">
                        {RoomDatabase && Array.isArray(RoomDatabase?.Manager_Details)?(RoomDatabase?.Manager_Details.map((manager:User,index:number)=>{
                          return(
                            <div id={index.toString()} className="text-[20px] px-6 py-4  m-2 rounded-md flex items-center font-bold justify-between shadow-md">
                              {index+1+'.'}{' '}{manager?manager?.name:""}
                              <div>
                              <Button className="bg-white hover:bg-white text-black active:scale-8  0 transition-transform duration-150 ease-in-out">
                                <Edit size={15}/>
                              </Button>
                              <Button className="bg-white hover:bg-white text-black active:scale-80 transition-transform duration-150 ease-in-out">
                                <Trash2 size={15}/>
                              </Button>
                              </div>
                            </div>
                          )
                        })) : (
                          <></>
                        )}
                    </ScrollArea>
                </div>
              </div>
            </div>
            <div className="col-start-4 col-end-10 row-start-1 row-end-11 border-2 m-4">
              <div className="text-[2vw] font-bold pl-5 pt-2 pb-1">
                Employees list
              </div>
              <Separator/>
              <div className="h-full w-full">
                <ScrollArea className="h-full w-full">
                  {RoomDatabase?.Room_Details?.manager.map((item,index)=>{ 
                    
                    return (
                      <div>
                        {}
                      </div>
                    )
                  })}
                </ScrollArea>
              </div>
            </div>
        </div>
    );
}

export default Overview;
