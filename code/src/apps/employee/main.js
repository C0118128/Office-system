import KintoneRecordManager from '@/modules/recordManager';

'use strict';

const ev_index = 'app.record.index.show'; // 一覧ページ表示の際
// const ev_detail = 'app.record.detail.show'; // レコード表示の際
// const ev_create = 'app.record.create.show'; // 追加ページ表示の際
// const ev_edit = 'app.record.edit.show'; // レコード編集ページの際
// const ev_report = 'app.report.show'; // グラフ表示

// ##########################################
// 一覧ページで実行
// ##########################################
kintone.events.on(ev_index, async(event) => {
  console.log('event:', event);
  console.log('all records:', event.records);
  // let res;
  // let kt = new KintoneRecordManager;

  // res = await kt.processRecords('all');
  // console.log('kintone:', kintone);
  // console.log('res:', res);
  // console.log('all records:', res.records);
  // res = await kt.processRecords('find', 2);
  // console.log('record:', res.record);
});
