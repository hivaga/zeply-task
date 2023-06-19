export interface SearchBtcDto {
  hash: string,
  type: 'address' | 'transaction'
}


export interface BtcAddressSubscribeDto {
  addresses: string[]
}
