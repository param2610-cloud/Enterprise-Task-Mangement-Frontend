import React from 'react';


const Dashboard: React.FC = () => {
  // const [login, setlogin] = useState(false)
  // const navigate = useNavigate();
  //   const {setUser} = useAppContext();
  //   useEffect(() => {
  //       const authenticate = async () => {
  //           const user_details = await authenticateUser();
  //           if (user_details) {
  //               setUser(user_details.data._id)
  //               console.log("triggered");
  //               setlogin(true);
  //           }
  //       };
  //       authenticate();
  //   }, []);
  // if(!login){
  //   return (<div></div>);
  // }
  // if(login){
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <h1 className='text-[100px]'>Dashboard</h1>
      </div>
    )
  // }
};

export default Dashboard;
