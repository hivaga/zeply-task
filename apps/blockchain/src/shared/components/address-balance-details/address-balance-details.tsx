import {useContext, useEffect, useState} from "react";
import {combineLatest, Subject} from "rxjs";
import {AppStoreContext} from "../../../features/main/components/main-page/main-page";
import {formatCurrency} from "../../../utils/http-utils";
import {IAddressDetails} from "../../model/btc-address.types";
import {CurrencyCodes, ICurrencyRate} from "../../model/currency.types";
import styles from "./address-balance-details.module.scss";
import {Grid, TextField} from "@mui/material";

export function AddressBalanceDetails(props: {
  data: IAddressDetails
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
            id="address-textfield"
            label="Address"
            defaultValue={props.data.address}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="current-balance-textfield"
            label={`Current Balance`}
            value={formatCurrency(props.data.final_balance * currencyRate, currencyCode)}
            prefix={currencyCode}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="total-recieved-textfield"
            label={`Total Received`}
            value={formatCurrency(props.data.total_received * currencyRate, currencyCode)}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="total-spent-textfield"
            label={`Total Sent`}
            value={formatCurrency(props.data.total_sent * currencyRate, currencyCode)}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddressBalanceDetails;
