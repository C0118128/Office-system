// import library

class TableElement {
    constructor() {
    }

    // 行の存在判定 -----------------------------------------------------------------------------
    isTrList(line) {
        // table情報取得
        let table = document.getElementsByClassName('recordlist-gaia');
        let tr_list = table[0].getElementsByClassName('recordlist-row-gaia');

        if (tr_list[line] != null) {
            return true;
        } else {
            return false;
        }
    }

    // 指定された行の指定された列のdiv要素を返す -----------------------------------------------------------------------------
    getElementDiv(line, value) {
        // table情報取得
        let table = document.getElementsByClassName('recordlist-gaia');
        let tr_list = table[0].getElementsByClassName('recordlist-row-gaia');

        // divを返す
        let button_area = tr_list[line].getElementsByClassName(value);
        let button_area_div = button_area[0].getElementsByTagName('div');
        return button_area_div;
    }
}

export default TableElement;