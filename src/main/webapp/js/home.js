var confirmChart;
var recoveryChart;
var deathChart;

var confirmPieChart;
var recoveryPieChart;
var deathPieChart;
var activePieChart;

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

function isUserLoggedIn(){
	var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/coviddashboard/isuserloggedin', true);
    
    var login = document.getElementById("login");
    var logout = document.getElementById("logout");
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
            if(json.status == "success"){
            	login.style.display = "none"
            	logout.style.display = ''
            }else{
            	login.style.display = ''
            	logout.style.display = "none"
            }
        }
    }
    xhr.send();
}
console.log("asdfsdf");
function loadTableData() {
	isUserLoggedIn()
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/piyush/state/all', false);
    console.log("ala");
    var table = document.getElementById("stateTable");
    table.style.cursor = "pointer"
    table.style.display = ''
    confirmedCases = []
    deceasedCases = []
    recoveredCases = []
    activeCases = []
    labels = [] 
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
            console.log("table");
            console.log(json);
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var row = table.insertRow();
                var cell = row.insertCell()
                
                cell.innerHTML = obj.stateName;
                row.insertCell().innerHTML = obj.confirmedCases;
                row.insertCell().innerHTML = obj.recoveredCases;               
                row.insertCell().innerHTML = obj.deceasedCases;
                row.insertCell().innerHTML = obj.activeCases;
                
                cell.addEventListener('click', loadStateData);
                
                labels.push(obj.stateName)
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
            
            document.querySelector("#totalpc").innerHTML = "<h2>States</h2>";
            document.querySelector("#totalpr").innerHTML = "<h2>States</h2>";
            document.querySelector("#totalpd").innerHTML = "<h2>States</h2>";
            document.querySelector("#totalpa").innerHTML = "<h2>States</h2>";

            drawConfirmPieChart(confirmedCases.slice(1, confirmedCases.length), labels, "Confirmed cases in India")
            drawActivePieChart(activeCases.slice(1, activeCases.length), labels, "Active Cases in India")
         	drawRecoveryPieChart(recoveredCases.slice(1, recoveredCases.length), labels, "Recovered Cases in India")
         	drawDeathPieChart(deceasedCases.slice(1, activeCases.length), labels, "Deceased Cases in India")   
        }
    }

    xhr.send();
    loadNationData()
}

function loadNationData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/piyush/nation', true);

    dailyConfirmedCases = []
    dailyDeceasedCases = []
    dailyRecoveredCases = []
    recordDate = []
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
            console.log("nation");
            console.log(json);
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                dailyConfirmedCases.push(obj.dailyConfirmedCases);
                dailyDeceasedCases.push(obj.dailyDeceasedCases);
                dailyRecoveredCases.push(obj.dailyRecoveredCases);
                total = obj.recordDate.substring(5);
                recordDate.push(total.substring(3) + "/" + total.substring(0, 2));
            }
            
            //document.querySelector("#totalc").innerHTML = dailyConfirmedCases.reduce(function(a, b){return a + b;}, 0)+"<br><h2>Confirmed Cases in India</h2>";
            document.querySelector("#totalc").innerHTML = json[json.length-1].confirmedCases+"<br><h2>Confirmed Cases in India</h2>";
            document.querySelector("#totalr").innerHTML = json[json.length-1].recoveredCases+"<br><h2>Recovered Cases in India</h2>";
            document.querySelector("#totald").innerHTML = json[json.length-1].deceasedCases+"<br><h2>Deaths in India</h2>";
            drawConfirmChart(dailyConfirmedCases, recordDate, "Daily New Cases in " + "India")
            drawRecoveryChart(dailyDeceasedCases, recordDate, "Daily Recovered Cases in " + "India")
            drawDeathChart(dailyDeceasedCases, recordDate, "Daily Deaths in " + "India")
            
        }
    }
    xhr.send();
}


function loadStateData(e) {
    var state = e.target.innerText.replace(/ /g, "-")
    
    if(state === 'India'){
        window.scroll({
            top: -2000, 
            left: 0, 
            behavior: 'smooth'
          });
		loadNationData()
		return
	}
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://localhost:8080/piyush/state/one?statename=' + state, true);
    dailyConfirmedCases = []
    dailyDeceasedCases = []
    dailyRecoveredCases = []
    recordDate = []
    xhr.onload = function () {
        if (this.status == 200) {
            var json = JSON.parse(this.responseText);
            console.log("state");
            console.log(json);
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
            
            console.log("got to top");
            drawConfirmChart(dailyConfirmedCases, recordDate, "Daily New Cases in " + e.target.innerText)
            drawRecoveryChart(dailyDeceasedCases, recordDate, "Daily Recovered Cases" + e.target.innerText)
            drawDeathChart(dailyDeceasedCases, recordDate, "Daily Deaths" + e.target.innerText)
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
        type: 'doughnut',
        data: {
            labels: label,
            datasets: [{
                data: dataset,
                backgroundColor: backgroundColors,
                borderWidth: 2,
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