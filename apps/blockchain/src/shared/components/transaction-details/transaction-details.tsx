import {Grid, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {combineLatest, Subject} from "rxjs";
import {AppStoreContext} from "../../../main";

import {formatCurrency} from "../../../utils/http-utils";
import {CurrencyCodes, ICurrencyRate} from "../../model/currency.types";
import {ITransaction} from "../../model/transaction.types";
import styles from './transaction-details.module.scss';

export interface TransactionDetailsProps {
  data: ITransaction
}

export function TransactionDetails(props: TransactionDetailsProps) {

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

  const totalInputBTC = props.data.inputs.reduce((total, input) => total + input.prev_out.value, 0);
  const totalOutputBTC = props.data.out.reduce((total, output) => total + output.value, 0);
  const confirmations = props.data.block_height > -1 ? props.data.block_height + 1 : 0;
  const receivedTime = new Date(props.data.time * 1000);

  const formattedDate = receivedTime.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = receivedTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDateTime = `${formattedDate} ${formattedTime}`;



  return (
    <div className={styles['container']}>
      <h3>Transaction Details</h3>
      <Grid container wrap={'wrap'} spacing={2} columns={12}>
        <Grid item xs={10} className={styles.noLeftPadding}>
          <TextField
            className={styles.fullwidth}
            label="Transaction hash"
            id={'transaction-hash-textfield'}
            defaultValue={props.data.hash}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            className={styles.fullwidth}
            label={`Status`}
            value={'-'}
            id={'transaction-recieved-time-textfield'}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            label={`Received Time`}
            value={formattedDateTime}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="outlined-required"
            label={`Size (bytes)`}
            value={props.data.size}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="outlined-required"
            label={`Confirmations`}
            value={props.data.size}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="outlined-required"
            label={`Total Input`}
            value={formatCurrency(totalInputBTC * currencyRate, currencyCode)}
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
            label={`Total output`}
            value={formatCurrency(totalOutputBTC * currencyRate, currencyCode)}
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
            label={`Confirmations`}
            value={confirmations}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.fullwidth}
            id="outlined-required"
            label={`Fee`}
            value={formatCurrency(props.data.fee * currencyRate, currencyCode)}
            prefix={currencyCode}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default TransactionDetails;
