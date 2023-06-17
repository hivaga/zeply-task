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
import React, {useState} from "react";
import styles from './header-menu.module.scss';

export interface HeaderMenuProps {
}

enum CurrencyCodes {
  BTC = 'BTC',
  USD = 'USD',
  EUR = 'EUR'
}


export function HeaderMenu(props: HeaderMenuProps) {

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCodes>(CurrencyCodes.BTC);

  const onCurrencyChangeHandler = (event: SelectChangeEvent) => {
    if (event.target) {
      console.log('Selected currency:', event.target.value);
      setSelectedCurrency(event.target?.value as CurrencyCodes);
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
          <Box sx={{minWidth: 120}}>
            <FormControl fullWidth variant="standard" sx={{m: 1, minWidth: 120}}>
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
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default HeaderMenu;
