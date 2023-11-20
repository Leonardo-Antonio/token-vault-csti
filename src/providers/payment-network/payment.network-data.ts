// src/payment/payment.network-data.ts
export class PaymentNetworkData {
  constructor(public regex: string, public name: string, public testCards: string[] = []) {}
}
