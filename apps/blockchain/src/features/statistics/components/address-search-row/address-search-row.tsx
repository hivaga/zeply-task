import {Grid, TextField} from "@mui/material";
import {ISearchForm} from "../../../../shared/model/search.types";
import styles from './address-search-row.module.scss';

export interface ISearchStatisticRow {
  count: number
  form: ISearchForm
}

export interface AddressSearchRowProps {
  data: ISearchStatisticRow
}

export function AddressSearchRow(props: AddressSearchRowProps) {

  return (
    <Grid container wrap={'wrap'} spacing={2} columns={12}>
      <Grid item xs={2}>
        <TextField
          className={styles.fullwidth}
          id="total-count-textfield"
          label={`Search count`}
          value={props.data.count}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={8} className={styles.noLeftPadding}>
        <TextField
          className={styles.fullwidth}
          id="hash-textfield"
          label="Hash"
          defaultValue={props.data.form.hash}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          className={styles.fullwidth}
          id="hash-type"
          label={`Type`}
          defaultValue={props.data.form.type}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default AddressSearchRow;
