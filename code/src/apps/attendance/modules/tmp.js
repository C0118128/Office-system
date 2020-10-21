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