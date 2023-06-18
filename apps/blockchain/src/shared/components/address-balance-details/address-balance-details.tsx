import {useContext, useEffect, useState} from "react";
import {combineLatest, Subject} from "rxjs";
import {AppStoreContext} from "../../../features/main/components/main-page/main-page";
import {formatCurrency} from "../../../utils/http-utils";
import {CurrencyCodes} from "../../consts/consts";
import {ICurrencyRate} from "../../store/app.store";
import styles from "./address-balance-details.module.scss";
import {IAddressDetails} from "../../../features/search/store/search.store";
import {Grid, TextField} from "@mui/material";

export function AddressBalanceDetails(props: {
  details: IAddressDetails
}) {
  const appStore = useContext(AppStoreContext);
  const onDestroyComponent = new Subject<void>();

  const [currencyCode, setCurrencyCode] = useState(CurrencyCodes.BTC);
  const [currencyRate, setCurrencyRate] = useState(1);

  useEffect(() => {
    console.log('Component AddressBalanceDetails is update!');
    // Clean subscriptions on component destruction
    return () => {
      onDestroyComponent.next();
    }
  }, []);

  combineLatest([appStore.$currentCurrency, appStore.$currencyRates])
    .pipe()
    .subscribe(([currentCurrency, currencyRates]) => {
      if (currentCurrency && (currentCurrency !== currencyCode) && currencyRates[currentCurrency]) {
        const rates = currencyRates[currentCurrency] as ICurrencyRate;
        setCurrencyCode(currentCurrency);
        setCurrencyRate(rates.sell);
      }
    })

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
            label={`Current Balance`}
            defaultValue={props.details.final_balance}
            value={formatCurrency(props.details.final_balance * currencyRate, currencyCode)}
            prefix={currencyCode}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="outlined-required"
            label={`Total Received`}
            defaultValue={props.details.total_received}
            value={formatCurrency(props.details.total_received * currencyRate, currencyCode)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="outlined-required"
            label={`Total Sent`}
            defaultValue={props.details.total_sent}
            value={formatCurrency(props.details.total_sent * currencyRate, currencyCode)}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddressBalanceDetails;
