function myFunction() {
	var formData = new FormData();										//Erzeugung FormData
	formData.append('vorname', document.getElementById('vorname'));
	formData.append('name', document.getElementById('name'));
	formData.append('verein', document.getElementById('verein'));
	formData.append('hcoach', document.getElementById('hcoach'));
	formData.append('acoach', document.getElementById('acoach'));
	formData.append('number', document.getElementById('number'));
	formData.append('jahr', document.getElementById('jahr'));
	formData.append('aktiv', document.getElementById('ja'));
	formData.append('favorit', document.getElementById('favorit'));
	formData.append('position', document.getElementById('position'));
	
	var xhr = new XMLHttpRequest();										//Erzeugung XMLHttpRequest-Object
	xhr.open('POST', 'http://139.59.134.26/api/players', true);
	xhr.onload = function(e) {
		if (this.status == 200) {
		console.log(this.response);
		}
	};
	
	xhr.send(formData);

}