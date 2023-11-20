import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

@Injectable()
export class DateProvider {
  private baseDateUTC(): Date {
    return utcToZonedTime(new Date(), 'UTC');
  }
  currentDateUTC(): string {
    return format(this.baseDateUTC(), 'yyyy-MM-dd');
  }

  currentTimestamp(): string {
    return format(this.baseDateUTC(), 'yyyy-MM-dd HH:mm');
  }

  epoch(): number {
    return this.baseDateUTC().getTime()
  }
}
