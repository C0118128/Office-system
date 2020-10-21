// レコード一覧画面で実行
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
        //console.log("id= " + id);
  
        linkSpaceFieldButton.onclick = function () {
          let tmp = moment().format('HH:mm');
          console.log(typeof(tmp));
        
          // 詳細を開くとリモートに
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
    
          window.location.reload();
        };
  
        count++;
      }else{
        console.log('break');
        break;
      }
  
    }
  
    return event;
  });