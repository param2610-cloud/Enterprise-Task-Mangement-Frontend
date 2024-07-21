import React,{createContext,ReactNode,useContext,useState} from "react";

interface AppcontextProps{
    user:String|null | undefined,
    setUser : React.Dispatch<React.SetStateAction<String | null | undefined >>
}

const Appcontext = createContext<AppcontextProps | undefined>(undefined);


const AppProvider : React.FC<{children: ReactNode}> = ({children}) =>{
    const [user,setUser] = useState<String | null>();

    return (
        <Appcontext.Provider value={{user,setUser}}>
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