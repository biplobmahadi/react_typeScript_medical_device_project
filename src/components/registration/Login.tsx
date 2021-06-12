// external imports
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

// internal imports
import Navbar from "../navbar/Navbar";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface Event {
    preventDefault(): void;
}
interface userObject {
    email: string;
    password: string;
}

export default function Login() {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: Event) => {
        event.preventDefault();
    };

    const login = (
        userInfo: userObject,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/api/login`, userInfo)
            .then((res) => {
                Cookies.set("access_token", res.data.access_token, {
                    expires: 1, // set expire for 24 hour
                });
                Cookies.set("userId", res.data.user.id);
                setSuccess(true);
                setErrMessage("");
                setSubmitting(false);
            })
            .catch((err) => {
                setErrMessage(err.response.data.message);
                setSubmitting(false);
            });
    };

    // If user successfully login then redirect to user profile page
    if (success) {
        return <Redirect to="user-profile" />;
    }
    // if user already logged in and user want to access login page, it will redirect /user-profile
    if (Cookies.get("access_token")) {
        return <Redirect to="/user-profile" />;
    }

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>

                    {errMessage && (
                        <Box mt={2}>
                            <Alert severity="error">{errMessage}</Alert>
                        </Box>
                    )}

                    {/* using formik for form handing in react  */}
                    <div className={classes.form}>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email("Invalid email address")
                                    .required("Required"),
                                password: Yup.string()
                                    .matches(
                                        /^[A-Za-z\d]{8,}$/,
                                        "Need min 8 characters needed"
                                    )
                                    .required("Required"),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                login(values, setSubmitting);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <div>
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    fullWidth
                                                    variant="outlined"
                                                    component={TextField}
                                                    label="Email *"
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    name="password"
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    component={TextField}
                                                    label="Password *"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={
                                                                        handleClickShowPassword
                                                                    }
                                                                    onMouseDown={
                                                                        handleMouseDownPassword
                                                                    }
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? (
                                                                        <Visibility fontSize="small" />
                                                                    ) : (
                                                                        <VisibilityOff fontSize="small" />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            disabled={isSubmitting}
                                        >
                                            Login
                                        </Button>
                                    </Form>

                                    <Grid container>
                                        <Grid item xs>
                                            <Link to="#">Forgot password?</Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="#">
                                                Don't have an account? Register
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </Container>
        </>
    );
}
