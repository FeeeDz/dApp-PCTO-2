let t_address;
let t_reason;
let t_amount;
let t_time_elapsed;
let dataTable = {};

async function fetchData(){
    await fetch('http://localhost:3000/api/v1/getdatafortable')
    .then((res) => res.json())
    .then((data) => {
        dataTable = data;
        console.log("data qui per sicuerzza1 "+ JSON.stringify(dataTable));
    });     
}

async function addRow(){

    
    console.log("data qui per sicuerzza2 "+ JSON.stringify(dataTable));
    var table = document.getElementById('table-data');
    // var table_address = document.getElementById('table-address');
    // var table_reason = document.getElementById('table-reason');
    // var table_amount = document.getElementById('table-amount');
    // var table_time_elapsed = document.getElementById('table-time-elapsed');

    // var rowCount = table.rows.length;
    // var row = table.insertRow(rowCount);


    var cols = [];
    for (var i = 0; i < dataTable.length; i++) {
        for (var k in data[i]) {
            if (cols.indexOf(k) === -1) {
                 
                // Push all keys to the array
                cols.push(k);
            }
        }
    }
     
    // Create table row tr element of a table
    var tr = table.insertRow(-1);
     
    for (var i = 0; i < cols.length; i++) {
         
        // Create the table header th element
        var theader = document.createElement("th");
        theader.innerHTML = cols[i];
         
        // Append columnName to the table row
        tr.appendChild(theader);
    }

     
    // Adding the data to the table
    for (var i = 0; i < dataTable.length; i++) {
         
        // Create a new row
        trow = table.insertRow(-1);
        for (var j = 0; j < cols.length; j++) {
            var cell = trow.insertCell(-1);
             
            // Inserting the cell at particular place
            cell.innerHTML = dataTable[i][cols[j]];
        }
    }
     
    // Add the newly created table containing json data
    var addElements = document.getElementById("table-data");
    addElements.innerHTML = "";
    addElements.appendChild(table);
}   

addRow();