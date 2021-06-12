// external imports
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Devices from "./devices/Devices";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

// internal imports
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

export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [devices, setDevices] = useState<Device[]>([]);

    const access_token = Cookies.get("access_token");

    useEffect(() => {
        const config: object = {
            headers: {
                authorization: Cookies.get("access_token"),
            },
        };
        axios
            .get("http://163.47.115.230:30000/api/users", config)
            .then((res) => {
                // got all user then
                // need to filter the user who login in this client
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
    // this useEffect will act like componentDidMount
    // because of empty array as 2nd args

    // If user not logged in then need to login first to get profile page
    if (!access_token) {
        return <Link to="/login">Please login first</Link>;
    }

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
                {/* Devices component to see all devices in a table */}
                <Devices devices={devices && devices} />
            </Box>
        </>
    );
}
