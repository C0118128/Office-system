// kintoneのレコード操作するクラス
class KintoneRecordManager {

  // インスタンス生成時に作成/実行
  constructor() {
    this.record = null;
    this.records = [];
    this.appId = null;
    this.query = '';
    this.limit = 100;
    this.offset = 0;
  }

  // レコード関連の処理を実行
  async processRecords(method, record_id=0) {
    this.appId = kintone.app.getId();
    this.records = []; // 初期化
    if (method == 'all') await this.setAllRecords(); // API通信が全て完了するまで待つ
    else if (method == 'find') await this.setRecord(record_id);
    return this;
  }

  // =============================================================================

  // 全てのレコードを取得しインスタンス変数に代入
  async setAllRecords() {
    let params = {
      app: this.appId,
      query: `${this.query} limit ${this.limit} offset ${this.offset}`
    }
    let res = await kintone.api('/k/v1/records', 'GET', params);

    Array.prototype.push.apply(this.records, res.records); // 配列を結合
    let len = res.records.length; // 結合後の要素数を取得
    this.offset += len;
    if (len < this.limit) this.ready = true;
    else return this.setAllRecords(); // コールバック？
  }

  // レコード番号で取得しインスタンス変数に代入
  async setRecord(record_id) {
    let params = {
      app: this.appId,
      id: record_id
    }
    try {
      let res = await kintone.api('/k/v1/record', 'GET', params);
      this.record = res.record;
      this.ready = true;
      return;
    }
    catch (e) {
      console.log('error:', e);
      return;
    }
  }
}

export default KintoneRecordManager;
