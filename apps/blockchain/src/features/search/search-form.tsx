import styles from './search-form.module.scss';
import {Button, FormControl, FormControlLabel, OutlinedInput, Radio, RadioGroup} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {addStyles} from "../../utils/styles-utils";
import {IAddressDetails, ISearchForm, SearchStore} from "./store/search.store";
import React, {useEffect, useState} from "react";
import {catchError, of, Subject, takeUntil} from "rxjs";
import ModalPreloader from "../../shared/components/modal-preloader/modal-preloader";
import AddressBalanceDetails from "../../shared/components/address-balance-details/address-balance-details";

export interface SearchHashProps {
}

const BTC_ADDRESS_REGEX = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;

const searchStore = new SearchStore();
const SearchStoreContext = React.createContext<SearchStore>(searchStore);

export function SearchForm(props: SearchHashProps) {


  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<ISearchForm>()

  const onDestroyComponent = new Subject<void>();

  const [isLoading, setIsLoading] = useState(false);
  const [loadedAddressDetails, setLoadedAddressDetails] = useState<IAddressDetails | undefined>(undefined)


  useEffect(() => {

    console.log('Component SearchForm is update!');
    // Clean subscriptions on component destruction
    return () => {
      onDestroyComponent.next();
    }
  }, []); // Empty dependenc


  const onSubmitHandler: SubmitHandler<ISearchForm> = async (data: ISearchForm) => {
    console.log('Submit clicked', data, errors);
    setIsLoading(true);
    if (data.type === 'address') {
      searchStore.addressBalance(data).pipe(catchError((errors: any) => {
        console.error('Error fetching btc address details!', data, errors);
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

  return (
    <SearchStoreContext.Provider value={searchStore}>
      <div>
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
        {loadedAddressDetails && <AddressBalanceDetails details={loadedAddressDetails}/>}
      </div>
      {isLoading && <ModalPreloader/>}

    </SearchStoreContext.Provider>
  );
}

export default SearchForm;
