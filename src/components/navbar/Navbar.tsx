// external imports
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

export default function NavBar() {
    const classes = useStyles();
    const token = Cookies.get("access_token");

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link
                            to="/"
                            style={{ color: "#FFF", textDecoration: "none" }}
                        >
                            Dummy
                        </Link>
                    </Typography>

                    {/* If user logged in then no need to show login button, show logout and other route button.
                    If user not logged in then only show login button
                    */}

                    {token ? (
                        <>
                            <Link to="/logout" style={{ color: "#FFF" }}>
                                <Button color="inherit">Logout</Button>
                            </Link>
                            <Link
                                to="/add-new-device"
                                style={{ color: "#FFF" }}
                            >
                                <Button color="inherit">Add Device</Button>
                            </Link>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Link
                                    to="/user-profile"
                                    style={{ color: "#FFF" }}
                                >
                                    <AccountCircle />
                                </Link>
                            </IconButton>
                        </>
                    ) : (
                        <Link to="/login" style={{ color: "#FFF" }}>
                            <Button color="inherit">Login</Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
