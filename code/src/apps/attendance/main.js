import KintoneRecordManager from '@/modules/recordManager';
import moment from 'moment';
import ButtonFunction from './modules/ButtonFunction';

'use strict';

const ev_index = 'app.record.index.show'; // 一覧ページ表示の際
//const ev_detail = 'app.record.detail.show'; // レコード表示の際
// const ev_create = 'app.record.create.show'; // 追加ページ表示の際
// const ev_edit = 'app.record.edit.show'; // レコード編集ページの際
// const ev_report = 'app.report.show'; // グラフ表示


// ##########################################
// 書くイベント発生時に実行
// ##########################################

// レコード一覧画面で実行
kintone.events.on(ev_index, function(event) {
  let record = event.record;

  // 退勤ボタンの生成とイベントの設置
  let button = new ButtonFunction;
  button.mainFunction();

  return event;
});