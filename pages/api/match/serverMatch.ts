import * as matter from 'matter-js';

class ServerMatch {
  private static _instance: ServerMatch;

  private constructor() {
    // matter.Engine.create();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export default ServerMatch;
