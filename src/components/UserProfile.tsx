import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Devices from "./devices/Devices";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import Navbar from "./navbar/Navbar";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}
interface Device {
    Id: number;
    BrandId: string;
    Name: string;
    TypeId: number;
    Comment: any;
    Description: string;
}
interface DeviceData {
    Id: number;
    DataType: string;
    Brand: string;
    Model: string;
    Name: string;
    DisplayName: string;
    Description: string;
    Status: any;
    GroupId: any;
    ProtocolOrder: any;
}

export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [devices, setDevices] = useState<Device[]>([]);
    const [deviceData, setDeviceData] = useState<DeviceData[]>([]);

    const access_token = Cookies.get("access_token");

    const config: object = {
        headers: {
            authorization: access_token,
        },
    };
    useEffect(() => {
        const config: object = {
            headers: {
                authorization: Cookies.get("access_token"),
            },
        };
        axios
            .get("http://163.47.115.230:30000/api/users", config)
            .then((res) => {
                const allUser = res.data[0];
                const filterOne = allUser.filter(
                    (userOne: User) =>
                        userOne.id.toString() === Cookies.get("userId")
                );
                setUser(filterOne[0]);
            })
            .catch((err) => console.log(err.response));
        axios
            .get("http://163.47.115.230:30000/api/overview/modeltype", config)
            .then((res) => setDevices(res.data))
            .catch((err) => console.log(err.response));
    }, []);

    const seeDeviceData = () => {
        axios
            .get(
                "http://163.47.115.230:30000/api/overview/modeldata/Hamilton/Galileo",
                config
            )
            .then((res) => setDeviceData(res.data))
            .catch((err) => console.log(err.response));
    };

    if (!access_token) {
        return <Link to="login">Please login first</Link>;
    }
    console.log(deviceData);
    return (
        <>
            <Navbar />
            <Box pt={4} pl={10} fontWeight="fontWeightMedium">
                <Typography component="p">
                    {user ? `${user.first_name} ${user.last_name}` : null} |{" "}
                    {user ? user.email : null}
                </Typography>
            </Box>
            <Box textAlign="center" pt={4} fontWeight="fontWeightMedium">
                <Typography variant="h5">Device Table</Typography>
            </Box>
            <Box py={4} px={10}>
                <Devices devices={devices && devices} />
            </Box>
            {/* 
            {deviceData &&
                deviceData.map((deviceData) => <p>{deviceData.Description}</p>)}
            
            <h4 className="App">Availabel Device</h4>
            {devices &&
                devices.map((device) => (
                    <>
                        <p key={device.Id}>{device.Name}</p>
                        <button onClick={seeDeviceData}>See details</button>
                    </>
                ))} */}
        </>
    );
}
