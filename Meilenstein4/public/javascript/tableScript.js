
	function getPlayers(favorites) {
	  var xhr = new XMLHttpRequest();
	  var extraParams = "";
	  if (favorites) {
		  extraParams = "?favorites=true";
	  }
	  xhr.open("GET", "http://127.0.0.1:3000/api/players"+extraParams, true);
	  xhr.setRequestHeader("Content-type","application/json");
	  xhr.onload = function(e) {
		var data = JSON.parse(this.response);
		fillTableWithPlayerData(data);
	  }
	  xhr.send();
	}

	function fillTableWithPlayerData(dataArray) {
	  var arr = dataArray;
	  var table = document.getElementById("tabelle1");
	  if (table.rows.length > 1) { 
        deleteTableData(table);
      }
	  arr.forEach(function(object) {
		var row = table.insertRow();
		row.insertCell(0).innerHTML = object.name + " " + object.vorname;
		row.insertCell(1).innerHTML = object.club;
		row.insertCell(2).innerHTML = object.coach;
		row.insertCell(3).innerHTML = object.position;
		row.insertCell(4).innerHTML = object.number;
		row.insertCell(5).innerHTML = object.year;	
	  });
	}

	function deleteTableData(table) {
	  var rowCount = table.rows.length;
	  for (var i=rowCount-1; i > 1; i--) {
		table.deleteRow(i);
	  }
	}
	
	function setTabAll(){
		 document.getElementById('tabAll').style.backgroundColor = "#fd5614";
		 document.getElementById('tabFav').style.backgroundColor = "";
	}
	
	function setTabFav(){
		 document.getElementById('tabFav').style.backgroundColor = "#fd5614";
		 document.getElementById('tabAll').style.backgroundColor = "";
	}