<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="org.json.JSONArray"%>
	<%@page import="org.json.JSONObject"%>
	<%@page import="org.json.*"%>
    <% String s = request.getParameter("uname");
		JSONArray arr = new JSONArray();
        if (s != null && s.equals("google")){
        	response.sendRedirect("https://www.google.com");	
        }
        String driver = config.getInitParameter("dname");  
        JSONArray arrayObj=new JSONArray();
        arrayObj.put("MCA");
        arrayObj.put("Amit Kumar");
        arrayObj.put("19-12-1986");
        arrayObj.put(24);
        arrayObj.put("Scored");
        arrayObj.put(new Double(66.67)); 
        out.println(arrayObj);
        
        
    %>