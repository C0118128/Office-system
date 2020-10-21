// import library
import moment from 'moment';

class KintoneRecodeEdit{
  constructor(){
    this.record = null;
    this.id = null;
  }

  // レコードの変更 -----------------------------------------------------------------------------
  recordEdit(id){
    // 現在時刻の生成   
    let tmp = moment().format('HH:mm');
    console.log(typeof(tmp));
  
    // レコード変更　leaveTime:valueの変更（仮）
    var body = {
      'app': kintone.app.getId(),
      'id': id,
      'record': {
        'leaveTime': {
          'value': tmp
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
  }
}

export default KintoneRecodeEdit;