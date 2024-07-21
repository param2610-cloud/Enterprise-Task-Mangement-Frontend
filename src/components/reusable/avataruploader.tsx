import { useRef, useState } from "react"

const Avataruploader = ({selectedfile,setselecetedfile}:{selectedfile:any,setselecetedfile:any})=>{
    const [previewUrl, setprevieUrl] = useState<any>(null);
    const uploadref = useRef<any>(null);

    const fileselectedhandler = (event:any) => {
        const file = event.target.files[0];
        setselecetedfile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setprevieUrl(reader.result);

        };
        reader.readAsDataURL(file);

    };
    
    const triggerfileinput = ()=>{
        uploadref.current.click();
    }
    return(
        <div className="flex flex-col items-center w-[300px] h-[300px] border-r-2">
            <input 
            type="file" 
            ref={uploadref}
            style={{display:'none'}}
            onChange={fileselectedhandler}
            />
            {!previewUrl && <img src="/usericon.png" alt="Avatar Preview" className="w-[180px] h-[180px] object-cover rounded-full"/>}
            {previewUrl && <img src={previewUrl} alt="Avatar Preview" className="w-[180px] h-[180px] object-cover rounded-full"/>}
            <button onClick={triggerfileinput} className="bg-blue-600 px-5 py-3 rounded-xl text-white font-semibold font-inter mt-10">Upload Profile Image</button>
        </div>
    )

}
export default Avataruploader;