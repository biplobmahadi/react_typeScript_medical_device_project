import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "../navbar/Navbar";
import { useState } from "react";

export default function Logout() {
    const [token, setToken] = useState(Cookies.get("access_token"));
    if (!token) {
        return <Redirect to="/login" />;
    }
    return (
        <>
            <Navbar />
            <Box pt={4} textAlign="center">
                <Typography>Do you want to logout?</Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        Cookies.remove("access_token");
                        setToken("");
                    }}
                >
                    Logout
                </Button>
            </Box>
        </>
    );
}
