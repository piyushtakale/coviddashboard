function sendMail(){
		var email = document.getElementById("email").value;
		document.getElementById("email").value = "";
		var xhr = new XMLHttpRequest();
	    xhr.open('GET', 'http://localhost:8080/coviddashboard/mailfile/' + email, true);

	    xhr.onload = function () {
	        if (this.status == 200) {
	            var json = JSON.parse(this.responseText);
	            var message;
	            if(json.status = "success"){
					message = "Mail sent successfully on " + email;
	            }else{
	            	message = "Unable to send mail at this time. Server error occured."; 
	            }
	            document.getElementById("status").innerHTML = message;
	        }
	    }
		xhr.send();
		console.log("hellloo");
	}
	
	
	$('#getreportmail').click(function() {
			  $('#getmailmodal').modal('show');
			  console.log("yetay");
    });