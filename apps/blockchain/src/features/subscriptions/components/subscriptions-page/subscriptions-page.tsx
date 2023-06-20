import {Grid, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {Subject} from "rxjs";
import {AppStoreContext} from "../../../../app";
import styles from './subscriptions-page.module.scss';

export interface SubscriptionsPageProps {
}

export function SubscriptionsPage(props: SubscriptionsPageProps) {

  const appStore = useContext(AppStoreContext);
  const onDestroyComponent = new Subject<void>();
  const [subscriptions] = useState(Array.from(appStore.$subscriptions.value.values()));

  useEffect(() => {
    console.log('Component SubscriptionsPage is update!');
    // Clean subscriptions on component destruction
    return () => {
      console.log('Component SubscriptionsPage is destroyed');
      onDestroyComponent.next();
    }
  }, []);

  return (
    <div className={styles['container']}>
      <h3>Subscriptions</h3>
      <Grid container wrap={'wrap'} spacing={2} columns={12}>
        {subscriptions.map((item, index) => (
          <Grid item xs={12}>
            <TextField
              className={styles.fullwidth}
              label={`Address`}
              value={item}
              InputProps={{
                readOnly: true
              }}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SubscriptionsPage;
