export enum CurrencyCodes {
  BTC = 'BTC',
  USD = 'USD',
  EUR = 'EUR'
}

export interface ICurrencyRate {
  '15m': number
  buy: number
  last: number
  sell: number
}
