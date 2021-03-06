// external imports
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

// internal imports
import Navbar from "../navbar/Navbar";
import DeviceAddForm from "./DeviceAddForm";

interface DeviceType {
    Id: number;
    Description: string;
}

export default function AddNewDevice() {
    const [deviceType, setDeviceType] = useState<DeviceType[]>([]);

    const access_token = Cookies.get("access_token");

    // we need to resolve typeid from /devicetype endpoint
    // so need to get all devicetype
    useEffect(() => {
        const config: object = {
            headers: {
                authorization: Cookies.get("access_token"),
            },
        };
        axios
            .get("http://163.47.115.230:30000/api/devicetype", config)
            .then((res) => {
                setDeviceType(res.data[0]);
            })
            .catch((err) => console.log(err.response));
    }, []);

    // user need to login first to add device
    // if user not logged in then need to login first
    if (!access_token) {
        return <Link to="login">Please login first</Link>;
    }

    return (
        <>
            <Navbar />
            <DeviceAddForm deviceType={deviceType && deviceType} />
        </>
    );
}
