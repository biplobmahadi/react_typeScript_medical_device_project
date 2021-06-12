// external imports
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

// internal imports
import Navbar from "../navbar/Navbar";

export default function Logout() {
    const [token, setToken] = useState(Cookies.get("access_token"));

    // If there is no token in cookies that means user not logged in
    // need to redirect user to login
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
                        // After clicking logout button token will remove from cookies
                        // and user will be redirect to login page again
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
