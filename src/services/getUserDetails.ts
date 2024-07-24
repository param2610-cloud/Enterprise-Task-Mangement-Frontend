import api from './api'

async function getUserDetails(UserID:String) {
    const response1 =await api.get("/users/getEmployee",{params:{employeeId:UserID}})
    const response2 =await api.get("/users/getUser",{params:{userId:response1.data.data.user}})

    if(!response2){
        return null;
    }
    return response2;
}

export default getUserDetails
