import StreamrClient from 'streamr-client';

import { NonceManager } from '@ethersproject/experimental';
import { Database, getDefaultProvider } from '@tableland/sdk';
import { Wallet } from 'ethers';

enum MatchSate {
  WAITING_FOR_PLAYERS,
  IN_PROGRESS,
  FINISHED,
}

class Match {
  id: string;
  streamId: string;
  players: Map<string, string>;
  state: MatchSate;

  constructor(id: string, streamId: string) {
    this.id = id;
    this.streamId = streamId;
    this.players = new Map();
    this.state = MatchSate.WAITING_FOR_PLAYERS;
  }
}

class MatchController {
  private static _instance: MatchController;

  streamr: StreamrClient;

  tableland: Database;
  tablePrefix: string = 'brick_battles';
  tableName: string = 'brick_battles_137_77';

  private constructor() {
    this.streamr = new StreamrClient({
      logLevel: 'debug',
      auth: {
        privateKey: process.env.PRIV_KEY!,
      },
    });

    const wallet = new Wallet(process.env.PRIV_KEY!);
    const provider = getDefaultProvider(process.env.ALCH_RPC);
    const baseSigner = wallet.connect(provider);
    const signer = new NonceManager(baseSigner);
    this.tableland = new Database({ signer });

    // this.createTable();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async createTable() {
    try {
      const { meta: create } = await this.tableland
        .prepare(
          `CREATE TABLE ${this.tablePrefix} (id integer primary key, streamId text, players int, state int);`
        )
        .run();
      console.log(`created table: ${create.txn?.name}`);
      this.tableName = create.txn?.name!;
    } catch (error) {
      console.log(`creation error: ${error}`);
    }
  }

  public async getMatch(matchId: string) {
    const { results } = await this.tableland
      .prepare(`SELECT * FROM ${this.tableName} WHERE id == ${matchId}`)
      .all();

    for await (const result of results) {
      console.log(result);
    }

    return results;
  }

  public async createMatch(matchId: string) {
    const stream = await this.streamr.getOrCreateStream({
      id: `${process.env.NEXT_PUBLIC_DEV_ADDRESS}/match/${matchId}`,
    });

    const match = new Match(matchId, stream.id);

    const { meta: insert } = await this.tableland
      .prepare(`INSERT INTO ${this.tableName} (id, streamId, players, state) VALUES (?, ?, ?, ?);`)
      .bind(match.id, match.streamId, match.players.size, match.state)
      .run();

    await insert.wait;

    return stream.id;
  }

  public async getAllStreams() {
    const data: { [key: string]: any } = {};
    const streams = this.streamr.searchStreams('map', undefined);

    for await (const stream of streams) {
      data[stream.id] = stream;
    }
    return data;
  }

  public async getTableData() {
    const { results } = await this.tableland.prepare(`SELECT * FROM ${this.tableName};`).all();
    return results;
  }
}

export default MatchController;
