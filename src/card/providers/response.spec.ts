import { CardEntity } from '../entity/card.entity';
import { ResponseProvider } from './response.providers';

describe('ResponseProvider', () => {
  let responseProvider: ResponseProvider;

  beforeEach(() => {
    responseProvider = new ResponseProvider();
  });

  it('should format the response correctly when card is found', () => {
    const reqId = '123';
    const savedCard = new CardEntity();
    savedCard.bin='456785'
    savedCard.last4='1232'
    savedCard.cvv='123'
    savedCard.network='visa'
    savedCard.email='leo@gmail.com'
    savedCard.expirationMonth='11'
    savedCard.expirationYear='2026'
    const message = 'Card found';
    const result = responseProvider.format(reqId, savedCard, message);

    // Write your assertions here
    expect(result.success).toBe(true);
    expect(result.message).toBe(message);
    expect(result.itemFound).toBe(true);
    expect(result.reqId).toBe(reqId);
  });

  it('should format the response correctly when card is not found', () => {
    const reqId = '456';
    const savedCard = null;
    const message = 'Card not found';

    const result = responseProvider.format(reqId, savedCard, message);

    // Write your assertions here
    expect(result.success).toBe(false);
    expect(result.message).toBe(message);
    expect(result.itemFound).toBe(false);
    expect(result.reqId).toBe(reqId);
    expect(result.item).toBeNull(); // Add more specific assertions based on your logic
  });
});
