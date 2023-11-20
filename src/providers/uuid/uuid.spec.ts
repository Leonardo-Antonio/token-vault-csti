import { UUIDProvider } from "./uuid";

describe('UUIDProvider', () => {
  let uuidProvider: UUIDProvider;

  beforeEach(() => {
    uuidProvider = new UUIDProvider();
  });

  describe('generateShortUUID', () => {
    it('should generate a short UUID of the specified length', () => {
      const length = 10;
      const result = uuidProvider.generateShortUUID(length);

      expect(result).toHaveLength(length);
    });

    it('should generate a short UUID with the default length if no length is provided', () => {
      const result = uuidProvider.generateShortUUID();

      expect(result).toHaveLength(uuidProvider.defaultLength);
    });

    it('should generate unique short UUIDs on each call', () => {
      const uuid1 = uuidProvider.generateShortUUID();
      const uuid2 = uuidProvider.generateShortUUID();

      expect(uuid1).not.toBe(uuid2);
    });
  });
});
