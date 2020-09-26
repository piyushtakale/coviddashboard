function loadStateList() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/coviddashboard/state/list', true);
    
    var sourceStateList = document.getElementById("sourceStateList");
    var destinationStateList = document.getElementById("destinationStateList");
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
			json = json.states;
            for (var i = 0; i < json.length; i++) {
                  var op = new Option();
                  op.value = op.text = json[i];
                  sourceStateList.options.add(op);
            }
			for (var i = 0; i < json.length; i++) {
                var op = new Option();
                op.value = op.text = json[i];
                destinationStateList.options.add(op);
          }
        }
    }
    xhr.send();
}


function loadSourceDistrictList(event){
	var xhr = new XMLHttpRequest();
	sourceStateName = event.options[event.selectedIndex].text
	var state = event.options[event.selectedIndex].text.replace(/ /g, "-")
    xhr.open('GET', 'http://localhost:8080/coviddashboard/district/list/' + state, true);

	document.getElementById("sourceDistrictList").innerHTML = null
	var sourceDistrictList = document.getElementById("sourceDistrictList");
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
            json = json.districts;
            var op = new Option();
  		    op.value = op.text = "select";
  		    sourceDistrictList.options.add(op);
            for (var i = 0; i < json.length; i++) {
                  var op = new Option();
                  op.value = op.text = json[i];
                  sourceDistrictList.options.add(op);
        	}
    	}
    }
    xhr.send();	
}


function loadDestinationDistrictList(event){
	var xhr = new XMLHttpRequest();
	destinationStateName = event.options[event.selectedIndex].text
	var state = event.options[event.selectedIndex].text.replace(/ /g, "-")
    xhr.open('GET', 'http://localhost:8080/coviddashboard/district/list/' + state, true);
	document.getElementById("destinationDistrictList").innerHTML = null
	
	var destinationDistrictList = document.getElementById("destinationDistrictList");
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
            json = json.districts;
            var op = new Option();
            op.value = op.text = "select";
  		    destinationDistrictList.options.add(op);
            for (var i = 0; i < json.length; i++) {
                  var op = new Option();
                  op.value = op.text = json[i];
                  destinationDistrictList.options.add(op);
        	}
    	}
    }
    xhr.send();	
}
