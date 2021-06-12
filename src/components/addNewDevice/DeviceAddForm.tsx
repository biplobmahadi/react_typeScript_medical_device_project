// external imports
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface Device {
    BrandId: string;
    Name: string;
    TypeId: any;
    Comment: string;
}

interface DeviceType {
    Id: number;
    Description: string;
}

export default function DeviceAddForm(props: { deviceType: DeviceType[] }) {
    const [device, setDevice] = useState<Device | null>(null);
    const classes = useStyles();

    const deviceType = props.deviceType;

    // add new device function to post request in api endpoints
    const addNewDevice = (
        values: Device,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const config: object = {
            headers: {
                authorization: Cookies.get("access_token"),
            },
        };
        // we must need typeId to create new device
        // and also we need to resolve it from /devicetype using select option
        // to do it we can't set typeId 0 in initial value of formik, because 0 is also a value for select
        // that's why make it string and then parse it in int
        const { TypeId } = values;
        const id = parseInt(TypeId);
        axios
            .post(
                "http://163.47.115.230:30000/api/devicemodel",
                { ...values, TypeId: id },
                config
            )
            .then((res) => {
                setDevice(res.data);
                setSubmitting(false);
            })
            .catch((err) => {
                console.log(err.response);
                setSubmitting(false);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* if device successfully added then need to show to user
                for 1st rendering user can see the form, after successfully added device then 
                user can see the device which s/he added
                */}
                {device ? (
                    <>
                        <Typography component="h5" variant="h5">
                            Successfully Device Added!
                        </Typography>
                        <h4>
                            Name: {device.Name} | Brand Id: {device.BrandId} |
                            Type Id: {device.TypeId}
                        </h4>

                        <br />
                        <br />
                        <br />
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => setDevice(null)}
                        >
                            Add More Device
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography component="h5" variant="h5">
                            Add New Device
                        </Typography>

                        <div className={classes.form}>
                            <Formik
                                initialValues={{
                                    TypeId: "",
                                    BrandId: "",
                                    Name: "",
                                    Comment: "",
                                }}
                                validationSchema={Yup.object({
                                    TypeId: Yup.string().required("Required"),
                                    BrandId: Yup.string()
                                        .trim("Required")
                                        .min(2, "Must be min 2 characters")
                                        .required("Required"),
                                    Name: Yup.string()
                                        .trim("Required")
                                        .min(2, "Must be min 2 characters")
                                        .required("Required"),
                                    Comment: Yup.string()
                                        .trim("Required")
                                        .required("Required"),
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    addNewDevice(values, setSubmitting);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <div>
                                        <Form>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name="TypeId"
                                                        type="text"
                                                        component={TextField}
                                                        select={true}
                                                        label="Device Type *"
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                    >
                                                        {deviceType &&
                                                            deviceType.map(
                                                                (
                                                                    deviceType
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                deviceType.Id
                                                                            }
                                                                        >
                                                                            <MenuItem
                                                                                value={`${deviceType.Id}`}
                                                                            >
                                                                                {
                                                                                    deviceType.Description
                                                                                }
                                                                            </MenuItem>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name="BrandId"
                                                        type="text"
                                                        component={TextField}
                                                        label="Brand Id *"
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name="Name"
                                                        type="text"
                                                        component={TextField}
                                                        label="Name *"
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Field
                                                        name="Comment"
                                                        type="text"
                                                        multiline={true}
                                                        rows={4}
                                                        component={TextField}
                                                        label="Comment *"
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
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
                                                Add New Device
                                            </Button>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </>
                )}
            </div>
        </Container>
    );
}
