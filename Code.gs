var sheetName = "Sophomores";

function getDocIds() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(sheetName);
  if (sheetName = "Freshmen")
    var folder = DriveApp.getFolderById("0Bw7qCwfE791zfldGNFhTUVZIcXVyVlJVX0p1a0ZKWlZRWlBTVjhCNkN1SUVzT1ZKYVdFZDA");
  else if (sheetName = "Sophomores")
    var folder = DriveApp.getFolderById("0Bw7qCwfE791zfkthSmwyOEdqY3JvX1RGcnltVU45c09FVVVycUQ2bWd3Sm42UmV4aDgtQVU");
  var files = folder.getFiles();
  var data = [];
  while (files.hasNext()) {
    var file = files.next();
    var row = [];
    row.push(file.getOwner().getName());
    row.push(file.getOwner().getEmail());
    row.push(file.getUrl());
    row.push(file.getName());
    data.push(row);
  }
  sheet.getRange(ss.getLastRow()+1,1,data.length, data[0].length).setValues(data);
}

function getDataFromSpreadsheets() {
  var n = {
    url: 3,
    done: 3,
    items: 18
  };
  
  if (sheetName = "Freshmen")
    n.items = 12;
  
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(sheetName);
  var data = sheet.getRange(3,1,sheet.getLastRow() - 1, 4).getValues();
  for (var i = 3 - 3; i < data.length; i++) {
    try {
      var file = SpreadsheetApp.openByUrl( data[i][n.url] );
    }
    catch (e) { continue;}
    var stData = file.getSheets()[0].getRange(2,n.done,n.items,3).getValues();
    var transposed = [];
    for (var j = 0; j < stData.length; j++) {
      transposed.push(stData[j][0], stData[j][1], stData[j][2]);
    }
    sheet.getRange(3 + i, 6, 1, transposed.length).setValues([transposed]);
  }
}
