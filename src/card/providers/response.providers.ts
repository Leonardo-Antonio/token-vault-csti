import { Injectable } from '@nestjs/common';
import { CardEntity } from '../entity/card.entity';
import { IResponse } from './response.interface';

@Injectable()
export class ResponseProvider {
  format(reqId: string, savedCard: CardEntity, message: string): IResponse {
    const found = savedCard !== null;

    // elimina data sensible
    if (found) {
      delete savedCard.cvv;
      delete savedCard.cardId;
    }

    return {
      success: found,
      message,
      itemFound: found,
      reqId,
      item: !found
        ? null
        : {
            ...savedCard,
            card_number: `${savedCard.bin}****${savedCard.last4}`,
          },
    };
  }
}
