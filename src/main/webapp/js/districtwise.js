var confirmChart;
var recoveryChart;
var deathChart;
var stateName;

var confirmPieChart;
var recoveryPieChart;
var deathPieChart;
var activePieChart;


var docWidth = document.documentElement.offsetWidth;



function getColors(count, stroke, isrand, bcol){
    var backgroundColors = []
    var borderColor = []
    if (isrand){
        for(var i=0; i<count; i++){
            colorString = Math. floor(Math. random() * 256) +',' + Math. floor(Math. random() * 256) + ',' + Math. floor(Math. random() * 256);
            backgroundColors.push('rgba(' + colorString +','+ stroke+')')	
        }
    } else{
        for(var i=0; i<count; i++){
            backgroundColors.push('rgba(' + bcol +','+ stroke+')')	
        }
        	
    }   
    return backgroundColors
}

function loadStateList() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/piyush/state/list', true);
    
    var stateList = document.getElementById("stateList");
    var stateList1 = document.getElementById("stateList1");
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
			json = json.states;
            for (var i = 0; i < json.length; i++) {
                  var op = new Option();
                  var op1 = new Option();
                  op.value = op.text = op1.value = op1.text = json[i];
                  stateList1.options.add(op1);
                  stateList.options.add(op);
            }
        }
    }
    $('#selectstate').modal('show');
    console.log("bhendi");
    xhr.send();
    
}

function loadStateData(stateName){
	var state = stateName.replace(/ /g, "-")
	var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/piyush/state/one?statename='+state, true);
    if ( $('#selectstate').hasClass('show')){
        $('#selectstate').modal('hide');
        console.log("lendi");
    }
    dailyConfirmedCases = []
    dailyDeceasedCases = []
    dailyRecoveredCases = []
    recordDate = []
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                dailyConfirmedCases.push(obj.dailyConfirmedCases);
                dailyDeceasedCases.push(obj.dailyDeceasedCases);
                dailyRecoveredCases.push(obj.dailyRecoveredCases);
                total = obj.recordDate.substring(5);
                recordDate.push(total.substring(3) + "/" + total.substring(0, 2));
            }

            document.querySelector("#totalc").innerHTML = json[json.length-1].confirmedCases+"<h2>  Confirmed <br>in "+state+"</h2>";
            document.querySelector("#totalr").innerHTML = json[json.length-1].recoveredCases+"<h2>  Recovered <br>in "+state+"</h2>";
            document.querySelector("#totald").innerHTML = json[json.length-1].deceasedCases+"<h2>  Deaths <br>in "+state+"</h2>";
            window.scroll({
                top: -3500, 
                left: 0, 
                behavior: 'smooth'
              });
              console.log("-3500")

            drawConfirmChart(dailyConfirmedCases, recordDate, "Daily New Cases in " + stateName)
            drawRecoveryChart(dailyRecoveredCases, recordDate, "Daily Recovered Cases in " + stateName)
            drawDeathChart(dailyDeceasedCases, recordDate, "Daily Deaths in " + stateName)
        }
    }
    xhr.send();
}

function loadTableData(event){
	var districtTable = document.getElementById("districtTable");
	
	districtTable.style.cursor = "pointer"
	districtTable.style.display = ''
	var xhr = new XMLHttpRequest();
	stateName = event.options[event.selectedIndex].text
	var state = event.options[event.selectedIndex].text.replace(/ /g, "-")
    xhr.open('GET', 'http://localhost:8080/piyush/district/list?statename=' + state, true);
    
    
    confirmedCases = []
    deceasedCases = []
    recoveredCases = []
    activeCases = []
    labels = [] 
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
			 for (var i = 0; i < json.length; i++) {
				var obj = json[i];
				var row = districtTable.insertRow();
				var cell = row.insertCell()
				console.log(obj.confirmedCases)
				console.log(obj.activeCases)
				cell.innerHTML = obj.districtName;
				row.insertCell().innerHTML = obj.confirmedCases;
				row.insertCell().innerHTML = obj.activeCases;
				row.insertCell().innerHTML = obj.deceasedCases;
				row.insertCell().innerHTML = obj.recoveredCases;
           	    cell.addEventListener('click', loadDistrictData);
           	    
           	    labels.push(obj.districtName)
                confirmedCases.push(obj.confirmedCases)
                activeCases.push(obj.activeCases)
    			deceasedCases.push(obj.deceasedCases)
	    		recoveredCases.push(obj.recoveredCases)
           }
           
		   	confirmedCases.pop()
			deceasedCases.pop()
			recoveredCases.pop()
			activeCases.pop()
            labels.pop()
            
            document.querySelector("#totalpc").innerHTML = "<h2>Districts</h2>";
            document.querySelector("#totalpr").innerHTML = "<h2>Districts</h2>";
            document.querySelector("#totalpd").innerHTML = "<h2>Districts</h2>";
            document.querySelector("#totalpa").innerHTML = "<h2>Districts</h2>";

		    drawConfirmPieChart(confirmedCases.slice(1, confirmedCases.length), labels.slice(1, labels.length), "Confirmed cases in " + stateName)
		    drawActivePieChart(activeCases.slice(1, activeCases.length), labels.slice(1, labels.length), "Active Cases in " +  stateName)
		 	drawRecoveryPieChart(recoveredCases.slice(1, recoveredCases.length), labels.slice(1, labels.length), "Recovered Cases in " + stateName)
		 	drawDeathPieChart(deceasedCases.slice(1, activeCases.length), labels.slice(1, labels.length), "Deceased Cases in " + stateName)    
        }
    }
    xhr.send();
    loadStateData(stateName)
}

function loadDistrictData(event){
	var district = event.target.innerText.replace(/ /g, "-")
    var state = stateName.replace(/ /g, "-")
    if(district == state){
        window.scroll({
            top: -1000, 
            left: 0, 
            behavior: 'smooth'
        });
        loadStateData(state);
        return
    }
    var xhr = new XMLHttpRequest()
    console.log('http://localhost:8080/piyush/district/all/' +state + '/' + district)
    xhr.open('GET', 'http://localhost:8080/piyush/district/one?statename=' +state + '&districtname=' + district, true);
    dailyConfirmedCases = []
    dailyDeceasedCases = []
    dailyRecoveredCases = []
    recordDate = []
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                dailyConfirmedCases.push(obj.dailyConfirmedCases);
                dailyDeceasedCases.push(obj.dailyDeceasedCases);
                dailyRecoveredCases.push(obj.dailyRecoveredCases);
                total = obj.recordDate.substring(5);
                recordDate.push(total.substring(3) + "/" + total.substring(0, 2));
            }
            document.querySelector("#totalc").innerHTML = json[json.length-1].confirmedCases+"<h2>  Confirmed <br>in "+district+"</h2>";
            document.querySelector("#totalr").innerHTML = json[json.length-1].recoveredCases+"<h2>  Recovered <br>in "+district+"</h2>";
            document.querySelector("#totald").innerHTML = json[json.length-1].deceasedCases+"<h2>  Deaths <br>in "+district+"</h2>";
            window.scroll({
                top: -3500, 
                left: 0, 
                behavior: 'smooth'
              });
              console.log("-3500")

            drawConfirmChart(dailyConfirmedCases, recordDate, "Daily New Cases in " + event.target.innerText)
            drawRecoveryChart(dailyDeceasedCases, recordDate, "Daily Recovered Cases" + event.target.innerText)
            drawDeathChart(dailyDeceasedCases, recordDate, "Daily Deaths" + event.target.innerText)
        }
    }
    xhr.send();
}



function drawConfirmChart(dataset, label, graphName) {
    if (confirmChart) {
         confirmChart.destroy();
     }
     confirmChart = drawBarChart("confirmChart", dataset, label, graphName, "231, 106, 3");
 }
 
 function drawRecoveryChart(dataset, label, graphName) {
     if (recoveryChart) {
         recoveryChart.destroy();
     }
     recoveryChart = drawBarChart("recoveryChart", dataset, label, graphName, "0, 194, 0")
 }
 
 function drawDeathChart(dataset, label, graphName) {
      if (deathChart) {
         deathChart.destroy();
     }
     deathChart = drawBarChart("deathChart", dataset, label, graphName, "175, 0, 0")
 }

function drawBarChart(element, dataset, label, graphName, coloring) {
    var ctx = document.getElementById(element);
    var backgroundColors = getColors(label.length, 0.8, false, coloring)
    var borderColors = getColors(label.length,1, false, coloring) 
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: graphName,
                data: dataset,
                backgroundColor:
                    backgroundColors,
                borderColor:
                    borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            responsiveAnimationDuration: 500,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });
    return barChart;
}

function drawConfirmPieChart(dataset, label, graphName) {
    if (confirmPieChart) {
        confirmPieChart.destroy();
    }
    confirmPieChart = drawPieChart("confirmPieChart",dataset, label, graphName);
}

function drawRecoveryPieChart(dataset, label, graphName) {
    if (recoveryPieChart) {
        recoveryPieChart.destroy();
    }
    recoveryPieChart = drawPieChart("recoveryPieChart",dataset, label, graphName);
}

function drawActivePieChart(dataset, label, graphName) {
    if (activePieChart) {
        activePieChart.destroy();
    }
    activePieChart = drawPieChart("activePieChart",dataset, label, graphName);
}
function drawDeathPieChart(dataset, label, graphName) {
    if (deathPieChart) {
        deathPieChart.destroy();
    }
    deathPieChart = drawPieChart("deathPieChart", dataset, label, graphName);
}

function drawPieChart(element,dataset, label, graphName){
	var ctx = document.getElementById(element);
	var backgroundColors = getColors(dataset.length, 0.9, true, "231, 106, 3")
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: label,
            datasets: [{
                data: dataset,
                backgroundColor: backgroundColors,
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            responsiveAnimationDuration: 500,
            maintainAspectRatio: false,
             title: {
     		   display: true,
        		text: graphName,
            },
            legend:{
                position: 'bottom',
                
                labels: {
                          boxWidth: 20,
                          padding: 10,
                          
                        }
                }
        }
    });
    return pieChart;
}