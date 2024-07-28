import React,{createContext,ReactNode,useContext,useState} from "react";
import { RoomData } from "./interface/Roomdata";

interface AppcontextProps{
    user:String|null | undefined,
    setUser : React.Dispatch<React.SetStateAction<String | null | undefined >>
    RoomDatabase:RoomData|null | undefined,
    setRoomDatabase : React.Dispatch<React.SetStateAction<RoomData | null | undefined >>
}

const Appcontext = createContext<AppcontextProps | undefined>(undefined);


const AppProvider : React.FC<{children: ReactNode}> = ({children}) =>{
    const [user,setUser] = useState<String | null>();
    const [RoomDatabase,setRoomDatabase] = useState<RoomData | null>();

    return (
        <Appcontext.Provider value={{user,setUser,RoomDatabase,setRoomDatabase}}>
            {children}
        </Appcontext.Provider>
    )
}


const useAppContext = () => {
    const context = useContext(Appcontext);
    if (context === undefined) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
  };


export {Appcontext, AppProvider, useAppContext};