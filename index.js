const { template } = require("babel-core");

// Your code here
function createEmployeeRecord(employee) {
    return {
        firstName:employee[0],
        familyName:employee[1],
        title:employee[2],
        payPerHour:employee[3],
        timeInEvents:[],
        timeOutEvents:[],

    }
}

function createEmployeeRecords (arr) {
    return arr.map (record => createEmployeeRecord(record))
}

function createTimeInEvent(empRecord, date) {
    const newTimeIn= {
        type: "TimeIn",
        date: date.slice(0,10),
        hour: parseInt(date.slice(-4))
    }
    empRecord.timeInEvents.push(newTimeIn);
    return empRecord;
}

function createTimeOutEvent (empRecord, date) {
    const newTimeOut= {
        type: "TimeOut",
        date: date.slice(0,10),
        hour: parseInt(date.slice(-4))
    }
    empRecord.timeOutEvents.push(newTimeOut);
    return empRecord;
}

function hoursWorkedOnDate (empRecord, date) {
    let timeIn=empRecord.timeInEvents.find(event => event.date === date);
    let timeOut=empRecord.timeOutEvents.find(event => event.date === date);
return (timeOut.hour-timeIn.hour)/100;
}


function wagesEarnedOnDate(empRecord, date) {
    return hoursWorkedOnDate(empRecord, date)*empRecord.payPerHour
}

function allWagesFor (empRecord) {
    let allWages = empRecord.timeInEvents.map(event => wagesEarnedOnDate(empRecord, event.date));
    return allWages.reduce((total,wage) => total + wage);
}

function findEmployeeByFirstName (src, name) {
    return src.find(record => record.firstName === name);
}

function calculatePayroll (empRecord) {
    let total=empRecord.map(record => allWagesFor(record));
    return total.reduce((total, empTotal) => total + empTotal);
}