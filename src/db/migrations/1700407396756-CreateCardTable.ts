import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCardTable1700407396756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS VaultGuardDB.Cards (
        cardId INT unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID autoincremental',
        merchantId VARCHAR(100) NOT NULL COMMENT 'Id del comercio relacionado',
        reqId VARCHAR(16) NULL COMMENT 'Id autogenerado por request',
        email VARCHAR(255) NOT NULL,
        expirationYear VARCHAR(4) NOT NULL,
        expirationMonth VARCHAR(4) NOT NULL,
        cvv INT NOT NULL,
        last4 VARCHAR(4) NOT NULL COMMENT 'Ultimo 4 digitos de la cc',
        bin VARCHAR(6) NOT NULL COMMENT 'Primeros 6 digitos de la cc',
        network VARCHAR(30) NOT NULL COMMENT 'Payment network del cc: visa, mastercard, amex, etc',
        regDate DATE DEFAULT NULL COMMENT 'Fecha registro',
        regDatetime DATETIME DEFAULT NULL COMMENT 'Fecha Hora registro',
        regTimestamp BIGINT DEFAULT NULL COMMENT 'Epoch registro',
        INDEX (reqId, merchantId, last4, bin, regTimestamp),
        PRIMARY KEY (cardId)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`Drop Table VaultGuardDB.Cards`);
  }
}
