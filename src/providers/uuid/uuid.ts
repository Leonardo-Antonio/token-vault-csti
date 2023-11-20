import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UUIDProvider {
  public defaultLength: number = 16;
  generateShortUUID(length: number = this.defaultLength) {
    const fullUUID = uuidv4();
    const shortUUID = fullUUID.replace(/-/g, '').substring(0, length);
    return shortUUID;
  }
}
