export interface EmployeeDetails {
    tasks: {
        room: any[]; // Specify type if known
        personal: any[]; // Specify type if known
    };
    _id: string;
    user: string;
    role: string;
    roomid: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface RoomDetails {
    _id: string;
    name: string;
    employees: string[]; // Array of employee IDs
    manager: string[]; // Array of manager IDs
    __v: number;
}

export interface ManagerDetails {
    _id: string;
    name: string;
    email: string;
    active: boolean;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface RoomData {
    Employee_Details: EmployeeDetails;
    Room_Details: RoomDetails;
    Manager_Details: ManagerDetails[];
}
