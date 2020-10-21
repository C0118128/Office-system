// import library
import moment from 'moment';
import AttendanceMethod from './AttendanceMethod';

class KintoneRecodeEdit{
  constructor(id){
    this.record = null;
    this.id = id;
  }

  // レコードの変更 -----------------------------------------------------------------------------
  async leaveEdit(){
    // 現在時刻の生成   
    let tmp = moment().format('HH:mm');
  
    // レコード変更　leaveTime:valueの変更（仮）
    let body = {
      'app': kintone.app.getId(),
      'id': this.id,
      'record': {
        'leaveTime': {
          'value': tmp
        }
      }
    };
  
    let resp = await kintone.api('/k/v1/record', 'PUT', body);
    console.log(resp);
  }

  // 自動編集 -----------------------------------------------------------------------------
  async autoTimeEdit(){
    // 現在時刻・変数の生成   
    let tmp = moment().format('HH:mm');
    let attendance_time = null;
    let leave_time = null;
    let total_working_hours = null;
    let break_time = null; 

    // レコードの確認
    let body = {
      'app': kintone.app.getId(),
      'id': this.id
    };
    
    let resp = await kintone.api('/k/v1/record', 'GET', body);

    // 変数に代入
    tmp = resp.record.attendanceTime.value;
    attendance_time = moment(tmp, 'HH:mm');
    tmp = resp.record.leaveTime.value;
    leave_time = moment(tmp, 'HH:mm'); 

    // 時刻の計算
    let attendance_method = new AttendanceMethod;
    attendance_method.setTime(attendance_time, leave_time);

    total_working_hours = attendance_method.getTotalWorkingHours();
    break_time = attendance_method.getBreakTime();
  
    // レコード変更　leaveTime:valueの変更（仮）
    console.log('try');
    let body2 = {
      'app': kintone.app.getId(),
      'id': this.id,
      'record': {
        'totalWorkingHours': {
          'value': total_working_hours
        },
        'breakTime': {
          'value': break_time
        }
      }
    };
  
    let resp2 = await kintone.api('/k/v1/record', 'PUT', body2);
    // console.log(resp2);

  }
}

export default KintoneRecodeEdit;