import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppContext } from "@/lib/context";
import { Edit, Trash2 } from "lucide-react";


function Overview() {
    const { RoomDatabase } = useAppContext();
    return (
        <div className="w-screen h-full grid gap-4 grid-cols-10 grid-rows-10">
            <div
                id="roomName"
                className="row-start-1 row-end-3 col-start-1 col-end-3 flex justify-start items-center text-[40px] font-Montserrat font-extrabold  pl-10"
            >
                {RoomDatabase?.Room_Details.name}
            </div>
            <div
                id="author"
                className="row-start-1 row-end-5 col-start-1 col-end-3 flex justify-center items-center"
            >
                <div className="shadow-lg p-10 rounded-lg text-xl font-Lato flex">
                    Author :{" "}
                    <p className="text-blue-500 pl-1 hover:border-b-2 border-blue-500 cursor-pointer">
                        {RoomDatabase?.Manager_Details[0].name}
                    </p>
                </div>
            </div>
            <div className="row-start-3 row-end-10 col-start-1 col-end-4 p-10">
              <div className="mt-10 w-full h-full">
              <div className="text-[30px] font-bold flex justify-between justify-center items-center">
                Manager List
                <Button>Add Manager</Button>
              </div>
                <div className="border-2 w-full h-full rounded-md shadow-lg mt-5">
                    <ScrollArea className="h-full w-full">
                        {RoomDatabase?.Manager_Details.map((manager,index:number)=>{
                          return(
                            <div id={index.toString()} className="text-[20px] px-6 py-4 border-2 m-2 rounded-md flex items-center font-bold justify-between">
                              {manager.name}
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
                        })}
                    </ScrollArea>
                </div>
              </div>
            </div>
        </div>
    );
}

export default Overview;
