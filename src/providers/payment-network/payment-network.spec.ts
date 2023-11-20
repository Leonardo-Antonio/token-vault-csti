import { PaymentNetworkProvider } from "./payment-network";

describe('PaymentNetworkProvider', () => {
  let paymentNetworkProvider: PaymentNetworkProvider;

  beforeEach(() => {
    paymentNetworkProvider = new PaymentNetworkProvider();
  });

  describe('resolvePaymentNetwork', () => {
    it('should resolve Amex network correctly', () => {
      const cardNumber = '372031658297754';
      const result = paymentNetworkProvider.resolvePaymentNetwork(cardNumber);
      expect(result).toBe('amex');
    });

    it('should resolve Diners network correctly', () => {
      const cardNumber = '30517544341198';
      const result = paymentNetworkProvider.resolvePaymentNetwork(cardNumber);
      expect(result).toBe('diners');
    });

    it('should resolve UnionPay network correctly', () => {
      const cardNumber = '6226987661192701';
      const result = paymentNetworkProvider.resolvePaymentNetwork(cardNumber);
      expect(result).toBe('unionpay');
    });

    it('should resolve Discover network correctly', () => {
      const cardNumber = '6011097933399958';
      const result = paymentNetworkProvider.resolvePaymentNetwork(cardNumber);
      expect(result).toBe('discover');
    });

    it('should resolve Mastercard network correctly', () => {
      const cardNumber = '5103901404433835';
      const result = paymentNetworkProvider.resolvePaymentNetwork(cardNumber);
      expect(result).toBe('mastercard');
    });

    it('should resolve Visa network correctly', () => {
      const cardNumber = '4916003605972925';
      const result = paymentNetworkProvider.resolvePaymentNetwork(cardNumber);
      expect(result).toBe('visa');
    });

    it('should resolve other network correctly', () => {
      const cardNumber = '1234567890123456'; // A random card number not matching any network
      const result = paymentNetworkProvider.resolvePaymentNetwork(cardNumber);
      expect(result).toBe('other');
    });
  });
});
