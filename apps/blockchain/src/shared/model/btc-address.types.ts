export type IAddress = string;

export interface IAddressDetails {
  address: IAddress
  final_balance: number
  hash160: string
  n_tx: number
  n_unredeemed: number
  total_received: number
  total_sent: number
}


export interface IAddressSubscription {
  address: IAddress
  balance: number
}
