import {Alert, Button, FormControl, FormControlLabel, OutlinedInput, Radio, RadioGroup, Snackbar} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {catchError, of, Subject, takeUntil} from "rxjs";
import AddressBalanceDetails from "../../../../shared/components/address-balance-details/address-balance-details";
import ErrorMessage from "../../../../shared/components/error-message/error-message";
import ModalPreloader from "../../../../shared/components/modal-preloader/modal-preloader";
import {addStyles} from "../../../../utils/styles-utils";
import {AppStoreContext} from "../../../main/components/main-page/main-page";
import {IAddressDetails, ISearchForm} from "../../store/search.store";
import styles from './search-page.module.scss';

export interface SearchHashProps {
}

const BTC_ADDRESS_REGEX = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;

export function SearchPage(props: SearchHashProps) {


  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<ISearchForm>()

  const onDestroyComponent = new Subject<void>();

  const appStore = useContext(AppStoreContext);

  const [isLoading, setIsLoading] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadedAddressDetails, setLoadedAddressDetails] = useState<IAddressDetails | undefined>(undefined)

  useEffect(() => {
    console.log('Component SearchPage is updated!');
    // Clean subscriptions on component destruction
    return () => {
      onDestroyComponent.next();
    }
  }, []);

  const onSubmitHandler: SubmitHandler<ISearchForm> = async (data: ISearchForm) => {
    console.log('Submit clicked', data, errors);
    setIsLoading(true);
    if (data.type === 'address') {
      appStore.addressBalanceRequest(data).pipe(catchError((error: Error) => {
        console.error('Error fetching btc address details!', data, errors);
        setErrorMessage(error?.message ?? 'Error while loading address');
        setHasErrorMessage(true);
        setTimeout(() => {
          setHasErrorMessage(false)
        }, 5000);
        return of(undefined);
      }), takeUntil(onDestroyComponent)).subscribe(response => {
        if (response) {
          console.log('Address details received', response);
          setLoadedAddressDetails(response);
        }
        setIsLoading(false);
      })
    }
  }

  const onCloseErrorMessageHandler = () => {
    setHasErrorMessage(false);
  }

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormControl>
            <div className={styles.vcontainer}>
              <div className={styles.hcontainer}>
                <OutlinedInput placeholder={"Enter address or transaction"}
                               id={'hashInput'}
                               className={`${styles.inputField}`}  {...register("hash", {
                  required: true,
                  pattern: BTC_ADDRESS_REGEX
                })}/>
                <Button variant='outlined' type='submit' id={'submitButton'}>Search</Button>
              </div>
              <RadioGroup defaultValue={'address'} row={true} className={styles.hcontainer}>
                <FormControlLabel value="address" control={<Radio/>}
                                  id={'addressButton'}
                                  label="Address"  {...register("type", {required: true})}  />
                <FormControlLabel value="transaction" control={<Radio/>}
                                  id={'transactionButton'}
                                  label="Transaction"  {...register("type", {required: true})}/>
              </RadioGroup>
            </div>
          </FormControl>
        </form>

        <div className={addStyles(styles.vcontainer, styles.errorMessage, styles.paddingTop1)}>
          {errors.hash && <div>
            {errors.hash.type === 'required' && <span>Address or transaction hash are required</span>}
            {errors.hash.type === 'pattern' && <span>Invalid BTC address</span>}
          </div>}
          <div>{errors.type && <span>This field is required</span>}</div>
        </div>
        {loadedAddressDetails &&
          <div className={styles.vcontainer}>
            <AddressBalanceDetails details={loadedAddressDetails}/>
            <div className={styles.hcontainer}>
              <Button variant='outlined' id={'notifyMeButton'}>Notify Me</Button>
              <Button variant='outlined' id={'moreDetailsButton'}>More Details</Button>
            </div>
          </div>}
      </div>
      {isLoading && <ModalPreloader/>}
      {hasErrorMessage && <ErrorMessage open={hasErrorMessage} message={errorMessage}/>}
    </div>
  );
}

export default SearchPage;
