function checkForm(event) {

		var error = false;
		var textRule = /^[a-zA-Z]+$/;
		var vorname = document.getElementById('vorname');
		var errvorname = document.getElementById('errvorname');
		var errvorname1 = document.getElementById('errvorname1');
		var name = document.getElementById('name');
		var errname = document.getElementById('errname');
		var errname1 = document.getElementById('errname1'); 
		var verein = document.getElementById('verein');
		var errverein = document.getElementById('errverein');
		var errverein1 = document.getElementById('errverein1'); 
		var hcoach = document.getElementById('hcoach');
		var errhcoach = document.getElementById('errhcoach');
		var errhcoach1 = document.getElementById('errhcoach1');
		var acoach = document.getElementById('acoach');
		var erracoach = document.getElementById('erracoach');
		var erracoach1 = document.getElementById('erracoach1');
		var number = document.getElementById('number');
		var errnumber = document.getElementById('errnumber');
		var errnumber1 = document.getElementById('errnumber1');
		var jahr = document.getElementById('jahr');
		var errjahr = document.getElementById('errjahr');
		var errjahr1 = document.getElementById('errjahr1');	

		if(vorname.value==""){
			errvorname1.setAttribute("style","visibility:visible");
			vorname.style.borderColor = "red";
			error = true;
		}else if (!textRule.test(vorname.value)){
			errvorname.setAttribute("style","visibility:visible");
			errvorname1.setAttribute("style","visibility:hidden");
			error = true;
		}else{
			errvorname1.setAttribute("style","visibility:hidden");
			errvorname.setAttribute("style","visibility:hidden");
			vorname.style.borderColor = "";
		}

		if(name.value==""){ 
			errname1.setAttribute("style","visibility:visible");
			name.style.borderColor = "red";
			error = true;
		}else if (!textRule.test(name.value)){
			errname.setAttribute("style","visibility:visible");
			errname1.setAttribute("style","visibility:hidden");
			error = true;
		}else{
			errname1.setAttribute("style","visibility:hidden");
			errname.setAttribute("style","visibility:hidden");
			name.style.borderColor = "";
		}

		if(verein.value==""){
			errverein1.setAttribute("style","visibility:visible");
			verein.style.borderColor = "red";
			error = true;
		}else if (!textRule.test(verein.value)){
			errverein.setAttribute("style","visibility:visible");
			errverein1.setAttribute("style","visibility:hidden");
			error = true;
		}else{
			errverein1.setAttribute("style","visibility:hidden");
			errverein.setAttribute("style","visibility:hidden");
			verein.style.borderColor = "";
		}

		if(hcoach.value==""){
			errhcoach1.setAttribute("style","visibility:visible");
			hcoach.style.borderColor = "red";
			error = true;
		}else if (!textRule.test(hcoach.value)){
			errhcoach.setAttribute("style","visibility:visible");
			errhcoach1.setAttribute("style","visibility:hidden");
			error = true;
		}else{
			errhcoach1.setAttribute("style","visibility:hidden");
			errhcoach.setAttribute("style","visibility:hidden");
			hcoach.style.borderColor = "";
		}

		if(document.getElementById('acoach').value==""){
			erracoach1.setAttribute("style","visibility:visible");
			acoach.style.borderColor = "red";
			error = true;
		}else if (!textRule.test(acoach.value)){
			erracoach.setAttribute("style","visibility:visible");
			erracoach1.setAttribute("style","visibility:hidden");
			error = true;
		}else{
			erracoach1.setAttribute("style","visibility:hidden");
			erracoach.setAttribute("style","visibility:hidden");
			acoach.style.borderColor = "";
		} 

		if(number.value==""){ 
			errnumber1.setAttribute("style","visibility:visible");
			number.style.borderColor = "red";
			error = true;
		}else if (number.value<4 || number.value>15){
			errnumber.setAttribute("style","visibility:visible");
			errnumber1.setAttribute("style","visibility:hidden");
			error = true;
		}else{
			errnumber.setAttribute("style","visibility:hidden");
			errnumber1.setAttribute("style","visibility:hidden");
			number.style.borderColor = "";
		}

		if(jahr.value==""){ 
			errjahr1.setAttribute("style","visibility:visible");
			jahr.style.borderColor = "red";
			error = true;
		}else if (jahr.value<1 || jahr.value>2015){
			errjahr.setAttribute("style","visibility:visible");
			errjahr1.setAttribute("style","visibility:hidden");
			error = true;
		}else{
			errjahr.setAttribute("style","visibility:hidden");
			errjahr1.setAttribute("style","visibility:hidden");
			jahr.style.borderColor = "";
		}

		if(!error){
			return true;
		}else{
			event.preventDefault();
			alert("Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie Ihre Eingaben!");
			return false;
		}
}

function sendForm(event) {
    var checked = checkForm(event);
	if (checked) {
		var form = document.forms.namedItem("createPlayer");
        var formData = new FormData(form);
		var xhr = new XMLHttpRequest();
		xhr.open("POST","http://139.59.134.26/api/players", true);
		xhr.onload = function(e) {
		  if (xhr.status == 200) {
            alert("OK");
			form.reset();
          } else {
			alert("Error: " + xhr.status);
		  }
		};
		xhr.send(formData);
		console.log(formData);
    }
}

	function getPlayers(favorites) {
	  var xhr = new XMLHttpRequest();
	  var extraParams = "";
	  if (favorites) {
		  extraParams = "?favorites=true";
	  }
	  xhr.open("GET", "http://139.59.134.26/api/players"+extraParams, true);
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