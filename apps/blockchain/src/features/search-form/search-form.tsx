import styles from './search-form.module.scss';
import {Button, FormControl, FormControlLabel, OutlinedInput, Radio, RadioGroup} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {addStyles} from "../../utils/styles-utils";

export interface SearchHashProps {
}

export interface ISearchForm {
  hash: string,
  type: 'address' | 'transaction'
}

const BTC_ADDRESS_REGEX = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;

export function SearchForm(props: SearchHashProps) {

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<ISearchForm>()


  const onSubmitHandler: SubmitHandler<ISearchForm> = (data: ISearchForm) => {
    console.log('Submit clicked', data, errors);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl>
          <div className={styles.vcontainer}>
            <div className={styles.hcontainer}>
              <OutlinedInput placeholder={"Enter address or transaction"}
                             className={`${styles.inputField}`}  {...register("hash", {
                required: true,
                pattern: BTC_ADDRESS_REGEX
              })}/>
              <Button variant='outlined' type='submit'>Search</Button>
            </div>
            <RadioGroup defaultValue={'address'} row={true} className={styles.hcontainer}>
              <FormControlLabel value="address" control={<Radio/>}
                                label="Address"  {...register("type", {required: true})}  />
              <FormControlLabel value="transaction" control={<Radio/>}
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
    </div>
  );
}

export default SearchForm;
