import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DeviceData from "./DeviceData";
import axios from "axios";
import Cookies from "js-cookie";

const config: object = {
    headers: {
        authorization: Cookies.get("access_token"),
    },
};

interface Device {
    Id: number;
    BrandId: string;
    Name: string;
    TypeId: number;
    Comment: any;
    Description: string;
}

interface DeviceDataInterface {
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

export default function DeviceDataDialog(props: { device: Device }) {
    const { device } = props;
    const [open, setOpen] = React.useState(false);
    const [deviceData, setDeviceData] = React.useState<DeviceDataInterface[]>(
        []
    );

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

    const handleClickOpen = (BrandId: string, Name: string) => {
        axios
            .get(
                `http://163.47.115.230:30000/api/overview/modeldata/${BrandId}/${Name}`,
                config
            )
            .then((res) => setDeviceData(res.data))
            .catch((err) => console.log(err.response));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(deviceData);

    return (
        <div>
            <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => handleClickOpen(device.BrandId, device.Name)}
            >
                See Device Data
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {`Details data of ${device.BrandId} | ${device.Name}`}
                </DialogTitle>
                <DialogContent>
                    <DeviceData />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
