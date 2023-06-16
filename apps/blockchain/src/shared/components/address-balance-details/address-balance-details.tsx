import {IAddressDetails} from "../../../features/search/store/search.store";
import {Grid} from "@mui/material";

export function AddressBalanceDetails(props: {
  details: IAddressDetails
}) {
  return (
    <Grid container spacing={2} columns={6}>
      <Grid xs={4}>
        <span>Address:</span>
        <span>{props.details.address}</span>
      </Grid>
      <Grid xs={2}>
        <span>Balance:</span>
        <span>{props.details.final_balance}</span>
      </Grid>
    </Grid>
  );
}

export default AddressBalanceDetails;
