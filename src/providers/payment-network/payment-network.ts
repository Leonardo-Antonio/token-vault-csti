// src/payment/payment.service.ts
import { Injectable } from '@nestjs/common';
import { PaymentNetworkData } from './payment.network-data';

@Injectable()
export class PaymentNetworkProvider {
  private paymentNetworks: PaymentNetworkData[] = [
    new PaymentNetworkData('^3[47]', 'amex', [
      '372031658297754' /* ... otras tarjetas de prueba */,
    ]),
    new PaymentNetworkData('^3(?:0[0-5]|[68][0-9])', 'diners', [
      '30517544341198',
    ]),
    new PaymentNetworkData('^(62|88)', 'unionpay', ['6226987661192701']),
    new PaymentNetworkData('^(6011|65|64[4-9]|622)', 'discover', [
      '6011097933399958',
    ]),
    new PaymentNetworkData('^5[1-5]', 'mastercard', ['5103901404433835']),
    new PaymentNetworkData('^4', 'visa', ['4916003605972925']),
  ];

  resolvePaymentNetwork(cardIn: string): string {
    for (const network of this.paymentNetworks) {
      const regex = new RegExp(network.regex);
      if (regex.test(cardIn)) {
        return network.name;
      }
    }
    return 'other';
  }
}
