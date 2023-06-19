import {
  AppBar,
  Badge,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar
} from "@mui/material";
import {HttpStatus} from "@nestjs/common";
import React, {useContext, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {catchError, of, Subject, takeUntil} from "rxjs";
import {AppStoreContext} from "../../../../app";
import ErrorMessage from "../../../../shared/components/error-message/error-message";
import {CurrencyCodes} from "../../../../shared/model/currency.types";
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
      appStore.updateCurrencyRatesRequest(event.target.value as CurrencyCodes).pipe(catchError((error: {
        message?: string,
        status: HttpStatus
      }) => {
        console.error('Error fetching currency rates!', error);
        setErrorMessage(error?.message ?? 'Error while loading address');
        setHasErrorMessage(true);
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
            <Link to="/">
              <Button key={'Home'} sx={{color: '#fff'}}>Home</Button>
            </Link>
            <Link to="/subscriptions">
              <Button key={'Subscriptions'} sx={{color: '#fff'}}>
                <div className={styles.containerh}>
                  <span>Subscriptions</span>
                  <Badge anchorOrigin={{vertical: 'top', horizontal: 'right'}} badgeContent={'0'} color="warning"
                         className={styles.badge}></Badge>
                </div>
              </Button>
            </Link>
            <Link to="/statistics">
              <Button key={'Statistics'} sx={{color: '#fff'}}>Statistics</Button>
            </Link>
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
      {hasErrorMessage && <ErrorMessage open={hasErrorMessage} message={errorMessage} setOpen={setHasErrorMessage}/>}

    </AppBar>
  );
}

export default HeaderMenu;
