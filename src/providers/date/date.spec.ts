import { DateProvider } from "./date";

describe('DateProvider', () => {
  let dateProvider: DateProvider;

  beforeEach(() => {
    dateProvider = new DateProvider();
  });

  describe('currentDateUTC', () => {
    it('should return the current date in UTC format', () => {
      const result = dateProvider.currentDateUTC();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('currentTimestamp', () => {
    it('should return the current timestamp in UTC format', () => {
      const result = dateProvider.currentTimestamp();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
    });
  });

  describe('epoch', () => {
    it('should return the current epoch time', () => {
      const result = dateProvider.epoch();
      expect(result).toBeGreaterThan(0); // Assuming the current time is in the future
    });
  });
});
