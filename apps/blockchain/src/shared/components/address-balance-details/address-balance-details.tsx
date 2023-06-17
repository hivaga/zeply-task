import styles from "./address-balance-details.module.scss";
import {IAddressDetails} from "../../../features/search/store/search.store";
import {Grid, TextField} from "@mui/material";

export function AddressBalanceDetails(props: {
  details: IAddressDetails
}) {
  return (
    <div className={styles.container}>
      <h3>Address Details</h3>
      <Grid container wrap={'wrap'} spacing={2} columns={12}>
        <Grid item xs={8} className={styles.noLeftPadding}>
          <TextField
            className={styles.fullwidth}
            id="outlined-required"
            label="Address"
            defaultValue={props.details.address}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="outlined-required"
            label="Current Balance"
            defaultValue={props.details.final_balance}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="outlined-required"
            label="Total Recieved"
            defaultValue={props.details.total_received}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="outlined-required"
            label="Total Sent"
            defaultValue={props.details.total_sent}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddressBalanceDetails;
