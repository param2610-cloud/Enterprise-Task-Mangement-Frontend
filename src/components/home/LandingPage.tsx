import { Link } from "react-router-dom";

function Landing_view() {
    return (
        <div className="box-order w-full  h-full overflow-hidden bg-[#ffffff] m-0 p-0">
            <div
                className="w-screen min-h-screen max-h-full flex flex-col"
                id="landing_view"
            >
                <div
                    id="taskbar"
                    className="flex w-full h-[80px] px-10 pt-6 justify-center items-start"
                >
                    <div id="logo" className="text-[30px] font-extrabold">
                        <span>
                            <h1>ManageMate</h1>
                        </span>
                    </div>
                    <div
                        id="taskMenu"
                        className="flex-grow flex justify-start items-center gap-8 pl-[80px] px-6 pt-2 text-xl"
                    >
                        <a href="#home" className="cursor-pointer">
                            Home
                        </a>
                        <a href="#pricing" className="cursor-pointer">
                            Pricing
                        </a>
                        <a href="#about-us" className="cursor-pointer">
                            About Us
                        </a>
                        <a href="#contact" className="cursor-pointer">
                            Contact
                        </a>
                    </div>
                    <div
                        id="login"
                        className="flex justify-start items-start gap-2 text-[20px] pt-1"
                    >
                        <div>
                            <Link to="auth/login">
                            <button className="rounded-xl px-5 py-2 text-black font-bold">
                                Log in
                            </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="auth/signup">
                            <button className="bg-blue-600 rounded-xl px-5 py-2 text-white font-bold">
                                Sign up
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex w-full h-full" id="home">
                    <div className="w-full h-full font-semibold flex flex-col items-start justify-center ml-[100px] mt-[10%]">
                        <div id="title" className="text-[8vh] font-poppins">
                            <h1>
                                <div className="mb-[-30px]">
                                    The Best Way
                                    <br />
                                </div>
                                <div className="mb-[-30px]">
                                    to Manage Your
                                    <br />
                                </div>
                                <div>Project</div>
                            </h1>
                        </div>
                        <div
                            id="desc"
                            className="text-[2vh] mt-[10px] text-gray-600 font-inter"
                        >
                            Here you will add your employee and assign task to
                            them with deadline with awesome UI.
                        </div>
                        <div
                            id="btn"
                            className="text-[2vh] mt-[35px] flex gap-7"
                        >
                            <button className="px-5 py-4 bg-blue-600 text-white font-bold rounded-xl">
                                Get Started
                            </button>
                            <button className="rounded-xl border-[1px] border-black px-4">
                                See how it works
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <img src="/show.jpg" alt="" />
                    </div>
                </div>

                <div
                    className="flex justify-center items-center w-full h-auto flex-col my-20"
                    id="pricing"
                >
                    <h1 className="font-bold text-start w-full text-[4vh] ml-14 font-poppins">
                        Pricing
                    </h1>
                    <div className="border-[4px] border-black w-[20vw] h-[50vh] my-10 rounded-xl flex flex-col justify-center items-center">
                        <h1 className="font-poppins text-[6vh] border-b-2 border-black">
                            FREE
                        </h1>
                        <div className="flex-grow flex justify-center items-center font-[2px]">
                            <ul className="flex flex-col gap-4 text-black text-[20px] font-inter">
                                <li>Free Lifetime Access</li>
                                <li>100 Employee call via email</li>
                                <li>Unlimited Tasks</li>
                                <li>Full Access</li>
                                <li>Unlimited Room</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div
                    className="flex justify-center items-center w-full h-auto flex-col my-20"
                    id="about-us"
                >
                    <h1 className="font-bold text-start w-full text-[4vh] ml-14 font-poppins">
                        About Us
                    </h1>
                    <div className="border-[4px] border-black w-[60vw] h-auto my-10 rounded-xl flex flex-col justify-center items-center p-8 bg-white shadow-lg">
                        <p className="text-black text-[20px] font-inter leading-relaxed text-center">
                            ManageMate is a comprehensive project management
                            tool designed to streamline your workflow and
                            enhance team productivity. Our mission is to provide
                            an intuitive and efficient platform for managing
                            projects, tasks, and teams with ease. With features
                            like task assignment, deadline tracking, and a
                            user-friendly interface, ManageMate helps you stay
                            organized and focused on achieving your project
                            goals.
                        </p>
                    </div>
                </div>

                <div
                    className="flex justify-center items-center w-full h-auto flex-col my-20"
                    id="contact"
                >
                    <h1 className="font-bold text-start w-full text-[4vh] ml-14 font-poppins">
                        Contact
                    </h1>
                    <div className="border-[4px] border-black w-[60vw] h-auto my-10 rounded-xl flex flex-col justify-center items-center p-8 bg-white shadow-lg">
                        <p className="text-black text-[20px] font-inter leading-relaxed text-center">
                            We would love to hear from you! If you have any
                            questions, feedback, or need support, please feel
                            free to reach out to us.
                        </p>
                        <div className="flex flex-col gap-4 text-black text-[20px] font-inter mt-4 text-center">
                            <p>
                                Email:{" "}
                                <a
                                    href="mailto:gpampa138@gmail.com"
                                    className="text-blue-600 underline"
                                >
                                    gpampa138@gmail.com
                                </a>
                            </p>
                            <p>Address: Howrah, West Bengal, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing_view;
