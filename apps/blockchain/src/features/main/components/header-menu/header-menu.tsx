import {
  Alert,
  AppBar,
  Badge,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent, Snackbar,
  Toolbar
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {catchError, of, Subject, takeUntil} from "rxjs";
import ErrorMessage from "../../../../shared/components/error-message/error-message";
import {CurrencyCodes} from "../../../../shared/consts/consts";
import {AppStoreContext} from "../main-page/main-page";
import styles from './header-menu.module.scss';

export interface HeaderMenuProps {
}


export function HeaderMenu(props: HeaderMenuProps) {

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCodes>(CurrencyCodes.BTC);
  const appStore = useContext(AppStoreContext);
  const onDestroyComponent = new Subject<void>();
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('Component Header menu is update!');
    // Clean subscriptions on component destruction
    return () => {
      onDestroyComponent.next();
    }
  }, []);

  const onCurrencyChangeHandler = (event: SelectChangeEvent) => {
    if (event.target && event.target?.value) {
      console.log('Selected currency:', event.target.value);
      setSelectedCurrency(event.target.value as CurrencyCodes);
      appStore.updateCurrencyRatesRequest(event.target.value as CurrencyCodes).pipe(catchError((error: Error) => {
        console.error('Error fetching currency rates!', error);
        setErrorMessage(error?.message ?? 'Error while loading address');
        setHasErrorMessage(true);
        setTimeout(() => {
          setHasErrorMessage(false)
        }, 5000);
        return of(undefined);
      }), takeUntil(onDestroyComponent)).subscribe((response) => {
        if (response) {
          console.log('New currency rates received!', response);
        }
      });
    }
  }

  return (
    <AppBar>
      <Toolbar>
        <Box className={styles.container}>
          <h1 className={styles.header}>Blockchain Application</h1>
          <div className={styles.spacer50px}></div>
          <div>
            <Button key={'Home'} sx={{color: '#fff'}}>Home</Button>
            <Button key={'Subscriptions'} sx={{color: '#fff'}}>
              <div>
                <span>Subscriptions</span>
                <Badge anchorOrigin={{vertical: 'top', horizontal: 'right'}} badgeContent={'0'} color="warning"></Badge>
              </div>
            </Button>
          </div>
          <div className={styles.flexGrow1}></div>
          <FormControl fullWidth variant="standard" sx={{m: 1, maxWidth: 150}}>
            <InputLabel>Currency</InputLabel>
            <Select
              sx={{color: '#fff'}}
              className={styles.selectCurrency}
              id="select-currency"
              value={selectedCurrency}
              label="Currency"
              onChange={onCurrencyChangeHandler}>
              <MenuItem value={CurrencyCodes.BTC}>BTC</MenuItem>
              <MenuItem value={CurrencyCodes.USD}>USD</MenuItem>
              <MenuItem value={CurrencyCodes.EUR}>EUR</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
      {hasErrorMessage && <ErrorMessage open={hasErrorMessage} message={errorMessage}/>}

    </AppBar>
  );
}

export default HeaderMenu;
