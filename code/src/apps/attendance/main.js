import KintoneRecordManager from '@/modules/recordManager';
import AttendanceMethod from './modules/AttendanceMethod';

'use strict';

const ev_index = 'app.record.index.show'; // 一覧ページ表示の際
//const ev_detail = 'app.record.detail.show'; // レコード表示の際
// const ev_create = 'app.record.create.show'; // 追加ページ表示の際
// const ev_edit = 'app.record.edit.show'; // レコード編集ページの際
// const ev_report = 'app.report.show'; // グラフ表示
const events_value_edit = ['app.record.create.show','app.record.edit.show','app.record.index.edit.show',
'app.record.edit.change.attendanceTime','app.record.create.change.attendanceTime','app.record.index.edit.change.attendanceTime',
'app.record.edit.change.leaveTime','app.record.create.change.leaveTime','app.record.index.edit.change.leaveTime']; // Editting attendanceTime or leaveTime 
const ev_all = ['app.record.index.show','app.record.detail.show','app.record.create.show','app.record.edit.show','app.record.index.edit.show'];

// ##########################################
// 一覧ページで実行
// ##########################################
kintone.events.on(events_value_edit, function(event) {
  let record = event.record;
  let attendance_method = new AttendanceMethod;

  // 時刻の取得 -------------------------------------------------------------------
  // console.log('時刻の取得');

  let attendance_time = record['attendanceTime']['value'];
  let leave_time = record['leaveTime']['value']; 

  // console.log('success');

  // 時刻をsetterに代入・計算 ------------------------------------------------------
  // console.log('時刻をsetterに代入・計算');

  attendance_method.setTime(attendance_time, leave_time);

  // console.log('success');

  // getterで時刻を取得 -----------------------------------------------------------
  // console.log('getterで時刻を取得');

  let total_working_hours = attendance_method.getTotalWorkingHours();
  let break_time = attendance_method.getBreakTime();

  // console.log('success');

  // 時刻をkintoneに表示 ----------------------------------------------------------
  // console.log('時刻をkintoneに表示');

  record['totalWorkingHours']['value'] = total_working_hours;
  record['breakTime']['value'] = break_time;

  // console.log('success');

  return event;
});

// kintone.events.on(ev_detail, function(event) {
//   let record = event.record;

//-------------------------------------------------------------------

  // // 詳細を開くとリモートに
  // var body = {
  //   'app': kintone.app.getId(),
  //   'id': kintone.app.record.getId(),
  //   'record': {
  //     'workStyle': {
  //       'value': 'リモート'
  //     }
  //   }
  // };
  
  // kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', body, function(resp) {
  //   // success
  //   console.log(resp);
  // }, function(error) {
  //   // error
  //   console.log(error);
  // });


//   return event;
// });

kintone.events.on(ev_index, function(event) {
  let record = event.record;

  let count = 0;
  while(true){
    var linkSpaceFieldButton = document.createElement('button');
    linkSpaceFieldButton.id = 'link_space_field_button';
    linkSpaceFieldButton.innerHTML = '退勤';


    var table = document.getElementsByClassName('recordlist-gaia');
    // console.log(table[0]);
    let tr_list = table[0].getElementsByClassName('recordlist-row-gaia');
    // console.log(tr_list);

    if(tr_list[count] != null){
      let num = tr_list[count].getElementsByClassName('value-5519907');
      // console.log(num);
      let now = num[0].getElementsByTagName('div');
      // console.log(now);
      let old = num[0].getElementsByTagName('span');
      // console.log(old);
      now[0].replaceChild(linkSpaceFieldButton, old[0]); 

      let a = tr_list[count].getElementsByClassName('value-5519876');
      // console.log(num);
      let b = a[0].getElementsByTagName('div');
      // console.log(now);
      let c = b[0].getElementsByTagName('span');
      // console.log(b[0]);
      let id = c[0].innerText;
      console.log("id= " + id);

      linkSpaceFieldButton.onclick = function () {
      
        // 詳細を開くとリモートに
        var body = {
          'app': kintone.app.getId(),
          'id': id,
          'record': {
            'workStyle': {
              'value': '出社'
            }
          }
        };
        
        kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', body, function(resp) {
          // success
          console.log(resp);
        }, function(error) {
          // error
          console.log(error);
        });
  
        window.location.reload();
        window.alert('退勤');
      };

      count++;
    }else{
      console.log('break');
      break;
    }

  }

  return event;
});
