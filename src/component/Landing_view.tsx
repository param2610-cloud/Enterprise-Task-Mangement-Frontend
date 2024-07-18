
import { MoveRight } from 'lucide-react';
function Landing_view() {
    return (
        <div className="w-screen h-screen flex overflow-hidden" id="landing_view">
            <div id="left" className="flex flex-col ">
            <div id="aim-container" className="absolute top-[-100px] left-[-180px] p-0 ">
                <div id="aim" className="relative   flex justify-center items-center">
                    <div id="circle1" className="rounded-full bg-[#254381] w-[400px] h-[400px] flex justify-center items-center">
                        <div id="circle2" className="rounded-full bg-white w-[320px] h-[320px] flex justify-center items-center">
                            <div id="circle3" className="rounded-full bg-[#FEC955] w-[280px] h-[280px] flex justify-center items-center">
                                <div id="circle4" className="rounded-full bg-white w-[200px] h-[200px] flex justify-center items-center">
                                    <div id="circle5" className="rounded-full bg-[#48753A] w-[160px] h-[160px] flex justify-center items-center">
                                        <div id="circle6" className="rounded-full bg-white w-[80px] h-[80px] flex justify-center items-center">
                                            <div id="circle7" className="rounded-full bg-[#323757] w-[40px] h-[40px]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div id="title" className="relative text-[6vw] font-bold top-[25%] left-6 flex flex-col">
                    <h1 className="text-[#97A43B] mb-[-30px]">Employee</h1>
                    <h1 className="text-[#48753A] mb-[-30px]">Management</h1>
                    <h1 className="text-[#48753A]">System</h1>
                    <div className="flex justify-start">
                    <button className="ml-[120px] mt-[20px] text-2xl text-[#254381] flex items-center gap-2">Get Started <MoveRight strokeWidth={3} className='mt-1' size={30}/></button>
                    </div>
                </div>
            </div>
            <div id="right" className=" flex-grow flex flex-col justify-center items-center    ">
                <div id="login" className=''>
                    
                    <button className='absolute right-10 text-2xl font-bold text-[#323757] top-2'>Login/SignUp</button>

                </div>
                <div id="image" className='flex-grow flex justify-center items-center '>
                    <img src='public/show.jpg' alt="" className='w-[45vw] '/>
                </div>
            </div>
        </div>
    );
}

export default Landing_view;
