// import library
import moment from 'moment';

// 計算を行うクラス
class AttendanceMethod {

    // インスタンス生成時に作成/実行 ---------------------------------------------------------
    constructor() {
        this.attendance_time = null;
        this.leave_time = null;
        this.total_working_hours = null;
        this.break_time = null;        
    }

    // 時刻のsetter・計算メソッドの実行 ------------------------------------------------------
    setTime(attendance_time, leave_time){
        this.attendance_time = attendance_time;
        this.leave_time = leave_time;
        this.total_working_hours = this.calculationTotalWorkingHours();
        this.break_time = this.calculationBreakTime();
    }

    // 総労働時間の計算 return/number ------------------------------------------------------
    calculationTotalWorkingHours(){
        let resolt = this.leave_time.diff(this.attendance_time)/1000/60/60;
        return resolt.toFixed(2);
    }

    // 休憩時間の計算 return/number --------------------------------------------------------
    calculationBreakTime(){
        let resolt = null;
        if(this.total_working_hours >= 9){
            resolt = 1;
        }else if(this.total_working_hours >= 8.5){
            resolt = 0.5;
        }else{
            resolt = 0;
        }
        return resolt;
    }

    // 休憩時間を引いた総労働時間のgetter ------------------------------------------------------------------
    getTotalWorkingHours(){
        return this.total_working_hours - this.break_time;
    }

    // 休憩時間のgetter -------------------------------------------------------------------
    getBreakTime(){
        return this.break_time;
    }
}

export default AttendanceMethod;