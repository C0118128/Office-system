// import library
import KintoneRecodeEdit from './KintoneRecodeEdit';
import TableElement from './TableElement';

class ButtonFunction {
  constructor() {
  }

  // メイン関数　ボタンの生成とイベントの設置
  mainFunction() {
    let line = 0;
    let table_element = new TableElement;

    while (true) {
      // buttonの生成
      let leave_button = document.createElement('button');
      leave_button.id = 'leave_button';
      leave_button.innerHTML = '退勤';

      // 行が存在している場合
      if (table_element.isTrList(line)) {
        // 一列文字列の要素取得とbuttonとの置換
        let button_area_div = table_element.getElementDiv(line, 'value-5519907');
        let button_area_span = button_area_div[0].getElementsByTagName('span');
        button_area_div[0].replaceChild(leave_button, button_area_span[0]);

        // id取得
        let id_area_div = table_element.getElementDiv(line, 'value-5519876');
        let id_area_span = id_area_div[0].getElementsByTagName('span');
        let id = id_area_span[0].innerText;

        // btton functionの設定
        leave_button.onclick = function () {
          // レコード変更
          let kintoneRecodeEdit = new KintoneRecodeEdit(id);
          kintoneRecodeEdit.leaveEdit();

          // 時刻の自動入力
          kintoneRecodeEdit.autoTimeEdit();

          // ページのロード
          window.location.reload();
        };

        line++;
      } else {
        console.log('break');
        break;
      }

    }
  }

}

export default ButtonFunction;