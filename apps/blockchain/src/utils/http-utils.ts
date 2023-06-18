import {CurrencyCodes} from "../shared/consts/consts";

export function getResponseError(response: Response, message?:string) {
  return new Error(`${message ?? response.statusText}. Status: ${response.status}`);
}


export function formatCurrency (value:number, isoCode:CurrencyCodes = CurrencyCodes.USD){
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: isoCode,
  }).format(value);
};
