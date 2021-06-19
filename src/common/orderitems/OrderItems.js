import React, { Fragment } from "react";
//Stylesheet imports
//import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import "./OrderItems.css";
//Material UI imports
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    width: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function OrderItems(props) {
  const classes = useStyles();
  const [couponName, setCouponName] = React.useState("");
  const couponNamesList = ["NEW30", "BEST20", "FLAT50", "FLAT30"];
  const handleChange = (event) => {
    setCouponName(event.target.value);
  };

  return (
    <Fragment>
      {(props.orderitems.items || []).map((item, index) => (
        <Grid key={item.id} container>
          <Grid item xs={1}>
            <i
              className="fa fa-stop-circle-o icon-type"
              aria-hidden="true"
              style={
                item.type === "VEG" ? { color: "green" } : { color: "red" }
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              color="textSecondary"
              style={{ textTransform: "capitalize" }}
            >
              {item.name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography color="textSecondary">{item.quantity}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color="textSecondary">
              <i className="fa fa-inr" aria-hidden="true">
                ₹
              </i>
              {item.priceForAll.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </Typography>
          </Grid>
        </Grid>
      ))}
      {props.divider ? (
        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      ) : null}
      <Grid container>
        <Grid item xs={8}>
          {/* <TextField
            id="filled-basic"
            label="Coupon Code"
            placeholder="Ex: FLAT30"
            variant="filled"
          /> */}
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Coupon Code
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={couponName}
              onChange={handleChange}
            >
              <MenuItem value="None">{"None"}</MenuItem>
              {couponNamesList.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl style={{ minWidth: 150 }}>
            <Button
              variant="contained"
              color="default"
              size="large"
              onClick={() => props.setCouponId(couponName)}
            >
              APPLY
            </Button>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={9}>
          <Typography color="textSecondary">Sub Total</Typography>
        </Grid>
        <Grid item xs={3}>
          <div className="payable-bill-amount">
            <Typography color="textSecondary">
              <i className="fa fa-inr" aria-hidden="true">
                ₹
              </i>
            </Typography>
            <Typography style={{ marginRight: 10 }} color="textPrimary">
              {Number(props.subtotal).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={9}>
          <Typography color="textSecondary">Discount</Typography>
        </Grid>
        <Grid item xs={3}>
          <div className="payable-bill-amount">
            <Typography color="textSecondary">
              <i className="fa fa-inr" aria-hidden="true">
                ₹
              </i>
            </Typography>
            <Typography style={{ marginRight: 10 }} color="textPrimary">
              {Number(
                (Number(props.discount) / 100) * Number(props.subtotal)
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </Typography>
          </div>
        </Grid>
      </Grid>
      {props.divider ? (
        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      ) : null}
      <Grid container>
        <Grid item xs={9}>
          <Typography color="textPrimary">Net Amount</Typography>
        </Grid>
        <Grid item xs={3}>
          <div className="payable-bill-amount">
            <Typography color="textSecondary">
              <i className="fa fa-inr" aria-hidden="true">
                ₹
              </i>
            </Typography>
            <Typography style={{ marginRight: 10 }} color="textPrimary">
              {Number(
                Number(props.subtotal) -
                  (Number(props.discount) / 100) * Number(props.subtotal)
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FormControl className="place-order-button">
            <Button
              variant="contained"
              color="primary"
              onClick={props.placeOrder}
            >
              PLACE ORDER
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  );
}
