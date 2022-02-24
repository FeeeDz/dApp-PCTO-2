var table = document.getElementById('table-data');
var table_address = document.getElementById('table-address');
var table_reason = document.getElementById('table-reason');
var table_amount = document.getElementById('table-amount');
var table_time_elapsed = document.getElementById('table-time-elapsed');


var rowCount = table.rows.length;
var row = table.insertRow(rowCount);

row.insertCell(0).innerHTML= table_address.value;
row.insertCell(1).innerHTML= table_reason.value;
row.insertCell(2).innerHTML= table_amount.value;
row.insertCell(3).innerHTML= table_amount.value;