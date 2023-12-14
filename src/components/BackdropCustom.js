import React, {useState, useEffect} from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { useStyles } from "../assets/styles/CustomStyles";
import CircularProgress from '@material-ui/core/CircularProgress';

const BackdropCustom = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open);
      }, [props.open]);

    return  <Backdrop className={classes.backdrop} open={open}>
                 <CircularProgress color="primary" />
            </Backdrop>;
}

export default BackdropCustom;