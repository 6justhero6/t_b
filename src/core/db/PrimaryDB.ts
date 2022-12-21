import { PrismaClient } from '@prisma/client';

export class PrimaryDB {
  private static _client: PrismaClient;

  static get client() {
    if (!this._client) {
      this._client = new PrismaClient();
    }
    return this._client;
  }

  static close() {
    if (!this._client) {
      return;
    }
    this._client.$disconnect();
    this._client = null;
  }
}
