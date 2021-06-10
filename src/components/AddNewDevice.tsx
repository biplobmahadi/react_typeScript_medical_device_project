import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const config: object = {
    headers: {
        authorization: Cookies.get("access_token"),
    },
};

interface Device {
    BrandId: string;
    Name: string;
    TypeId: number;
    Comment: string;
}

export default function AddNewDevice() {
    const [device, setDevice] = useState<Device | null>(null);
    // const [deviceType, setDeviceType] = useState<Device | null>(null);

    const access_token = Cookies.get("access_token");

    const deviceObject: Device = {
        BrandId: "TestModel12",
        Name: "Test Model12",
        TypeId: 1,
        Comment: "test12",
    };
    const addNewDevice = () => {
        axios
            .post(
                "http://163.47.115.230:30000/api/devicemodel",
                deviceObject,
                config
            )
            .then((res) => setDevice(res.data))
            .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        const config: object = {
            headers: {
                authorization: Cookies.get("access_token"),
            },
        };
        axios
            .get("http://163.47.115.230:30000/api/devicetype", config)
            .then((res) => {
                console.log(res.data[0]);
            })
            .catch((err) => console.log(err.response));
    });

    if (!access_token) {
        return <Link to="login">Please login first</Link>;
    }
    return (
        <>
            <Navbar />
            <h5>AddNewDevice Page</h5>
            <button onClick={addNewDevice}>Add device</button>
            {device && (
                <>
                    <p>{device.Name}</p>
                    <p>{device.BrandId}</p>
                </>
            )}
        </>
    );
}
