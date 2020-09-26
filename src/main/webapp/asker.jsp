<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
    hi this is piyush
    <h1>
        <% out.print("this is printed by using scriptlet tag"); %>
    </h1>
    
        <input type="text" name="uname" />
        <button type="submit" onclick="loadData()">go</button>
    
    <div id="res"></div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        console.log("script");
        function loadData(){
            //var url = "http://localhost:8080/piyush/cdata";
            var url = "https://api.covid19india.org/state_district_wise.json";
            var xr = new XMLHttpRequest();
            var res = '';

            xr.onload = function(){
                if(this.status == 200){
                    var data = JSON.parse(this.responseText);
                    print(data);
                }
            }
            xr.open("GET", url, false);
            xr.send();
            function print(data){
                console.log(data);
                console.log(typeof data);
                console.log("the third member is: \t"+ data);
            }
            
            
        }   </script>

    
</body>
</html>