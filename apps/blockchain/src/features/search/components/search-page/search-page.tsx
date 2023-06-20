import {Button, FormControl, FormControlLabel, OutlinedInput, Radio, RadioGroup} from "@mui/material";
import React, {useContext, useEffect, useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {AppStoreContext} from "../../../../app";
import AddressBalanceDetails from "../../../../shared/components/address-balance-details/address-balance-details";
import ErrorMessage from "../../../../shared/components/error-message/error-message";
import ModalPreloader from "../../../../shared/components/modal-preloader/modal-preloader";
import TransactionDetails from "../../../../shared/components/transaction-details/transaction-details";
import {IAddressDetails} from "../../../../shared/model/btc-address.types";
import {ISearchForm} from "../../../../shared/model/search.types";
import {ITransaction} from "../../../../shared/model/transaction.types";
import {addStyles} from "../../../../utils/styles-utils";
import styles from './search-page.module.scss';

export interface SearchHashProps {
}

const BTC_ADDRESS_REGEX = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
const TRANSACTION_HASH_REGEX = /\b([A-Fa-f0-9]{64})\b/;

export function SearchPage(props: SearchHashProps) {

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<ISearchForm>()

  const onDestroyComponent = new Subject<void>();

  const appStore = useContext(AppStoreContext);
  const searchInputRef = useRef<HTMLInputElement>();

  const [currentFormData, setCurrentFormData] = useState<ISearchForm>({hash: '', type: 'address'});
  const [currentRegex, setCurrentRegex] = useState(BTC_ADDRESS_REGEX);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadedAddressDetails, setLoadedAddressDetails] = useState<IAddressDetails | undefined>(undefined);
  const [loadedTransactionDetails, setLoadedTransactionDetails] = useState<ITransaction | undefined>(undefined);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    console.log('Component SearchPage is updated!');
    // Clean subscriptions on component destruction
    return () => {
      onDestroyComponent.next();
    }
  }, []);

  useEffect(() => {
    if(loadedAddressDetails) {
      setHasSubscription(appStore.$subscriptions.value.has(loadedAddressDetails.address))
    }
  }, [loadedAddressDetails])

  const onSubmitHandler: SubmitHandler<ISearchForm> = async (data: ISearchForm) => {
    console.log('On Form Submit:', data, errors);
    setIsLoading(true);

    if (loadedTransactionDetails) setLoadedTransactionDetails(undefined);
    if (loadedAddressDetails) setLoadedAddressDetails(undefined);

    if (data.type === 'address') {
      appStore.addressBalanceRequest(data).pipe(catchError((error: Error) => {
        console.error('Error fetching btc address details!', data, errors);
        setErrorMessage(error?.message ?? 'Error while loading address');
        setHasErrorMessage(true);
        return of(undefined);
      }), takeUntil(onDestroyComponent)).subscribe(response => {
        if (response) {
          console.log('Address details received', response);
          setLoadedAddressDetails(response);
        }
        setIsLoading(false);
      })
    }

    if (data.type === 'transaction') {
      appStore.transactionSearchRequest(data).pipe(catchError((error: Error) => {
        console.error('Error fetching transaction address details!', data, errors);
        setErrorMessage(error?.message ?? 'Error while loading transaction details');
        setHasErrorMessage(true);
        return of(undefined);
      }), takeUntil(onDestroyComponent)).subscribe(response => {
        if (response) {
          console.log('Transaction details received', response);
          setLoadedTransactionDetails(response);
        }
        setIsLoading(false);
      })
    }
  }

  const onHashChangeHandler = () => {
    const formData: ISearchForm = watch();
    setCurrentFormData(formData);

    if (formData.type === 'address' && currentRegex !== BTC_ADDRESS_REGEX) {
      setCurrentRegex(BTC_ADDRESS_REGEX)
    }

    if (formData.type === 'transaction' && currentRegex !== TRANSACTION_HASH_REGEX) {
      setCurrentRegex(TRANSACTION_HASH_REGEX)
    }

    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }

    console.log('Form changed data:', watch());
  }

  const onSubscribeHandler = () => {
    const subscriptions = appStore.$subscriptions.value;
    const address = loadedAddressDetails?.address;
    if (address) {
      setIsLoading(true);
      const tempHasSubscription = subscriptions.has(address);

      if (!tempHasSubscription) {

        if (!hasSubscription) {
          setHasSubscription(true);
        }

        const newSet = new Set(appStore.$subscriptions.value);
        newSet.add(address);
        appStore.subscribeToAddressRequest(newSet).pipe(catchError((error: Error) => {
          console.error('Error subscribing address!', address, errors);
          setErrorMessage(error?.message ?? 'Error while loading address');
          setHasErrorMessage(true);
          return of(undefined);
        }), takeUntil(onDestroyComponent)).subscribe(response => {
          if (response) {
            console.log('Address details received', response);
          }
          setIsLoading(false);
        });
      }

    }
  }


  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormControl>
            <div className={styles.vcontainer}>
              <div className={styles.hcontainer}>
                <OutlinedInput placeholder={"Enter address or transaction"}
                               inputRef={searchInputRef}
                               id={'hashInput'}
                               className={`${styles.inputField}`}  {...register("hash", {
                  required: true,
                  pattern: currentRegex
                })}/>
                <Button variant='outlined' type='submit' id={'submitButton'}>Search</Button>
              </div>
              <RadioGroup defaultValue={'address'} row={true} className={styles.hcontainer}
                          onChange={onHashChangeHandler}>
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

        <div className={addStyles(styles.vcontainer, styles.errorMessage, styles.paddingTop1)} id={'error-messages'}>
          {(errors.hash && currentFormData.type === 'address') && <div>
            {errors.hash.type === 'required' && <span>BTC Address is required</span>}
            {errors.hash.type === 'pattern' && <span>Invalid BTC address</span>}
          </div>}
          {(errors.hash && currentFormData.type === 'transaction') && <div>
            {errors.hash.type === 'required' && <span>Transaction hash is required</span>}
            {errors.hash.type === 'pattern' && <span>Invalid Transaction hash</span>}
          </div>}
          <div>{errors.type && <span>This field is required</span>}</div>
        </div>
        {loadedAddressDetails &&
          <div className={styles.vcontainer} id={'address-details-container'}>
            <AddressBalanceDetails data={loadedAddressDetails}/>
            <div className={styles.hcontainer}>
              <Button variant='outlined' id={'notifyMeButton'} onClick={onSubscribeHandler}
                      disabled={hasSubscription}>Subscribe</Button>
              <Button variant='outlined' id={'notifyMeButton'}>Refresh</Button>
              <Button variant='outlined' id={'moreDetailsButton'}>More Details</Button>
            </div>
          </div>}
        {loadedTransactionDetails &&
          <div className={styles.vcontainer}>
            <TransactionDetails data={loadedTransactionDetails}/>
            <div className={styles.hcontainer}>
              <Button variant='outlined' id={'moreDetailsButton'}>More Details</Button>
            </div>
          </div>}
      </div>
      {isLoading && <ModalPreloader/>}
      {hasErrorMessage && <ErrorMessage open={hasErrorMessage} message={errorMessage} setOpen={setHasErrorMessage}/>}
    </div>
  );
}

export default SearchPage;
