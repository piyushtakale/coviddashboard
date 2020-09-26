package dataservice;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.time.Instant;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONArray;
import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.Block;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import org.bson.types.ObjectId;

public class StateAll extends HttpServlet{
    private static final long serialVersionUID = 1L;
    
    public StateAll(){
        super();
    }

    protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        
    	try{
    		final PrintWriter out = res.getWriter();
            System.out.println("written 8: ");  

            MongoClient mongo = new MongoClient("localhost", 27017);
            System.out.println("got connected");
            MongoDatabase db = mongo.getDatabase("covidapi");
            System.out.println("got database");
            MongoCollection<Document> col = db.getCollection("states");
            MongoCollection<Document> nat = db.getCollection("nation");
            System.out.println("got collection");

            //Document doc = new Document("name", "faltugiti").append("author", "mast manus");
            //col.insertOne(doc);

            // FindIterable<Document> fn = col.find(new);
            // Gson gson = new Gson();
            // Iterator it = fn.iterator();
            // System.out.println("data is:");
            // System.out.println(gson.toJson(fn));
            // while(it.hasNext()){
            //     Document d = (Document) it.next();
            //     System.out.println("name: "+(d.getString("name"))+ " , author: "+(d.getString("name")));
                
            // }
             
            final JSONArray arrayObj=new JSONArray();
            res.setContentType("application/json");
		    res.setCharacterEncoding("UTF-8");
		    
//		    final JSONObject query=new JSONObject(); 
//          query.put("state_code", "MH");
		    
//		    BasicDBObject query = new BasicDBObject();
//		    query.put("state_code", "MH");
		    
		    SimpleDateFormat mat = new SimpleDateFormat("yyyy-MM-dd'T'00:00:00'Z'");
		    
		    Date d = new Date();
		    System.out.println("date:"+mat.format(d));
		    System.out.println("type:"+(mat.format(d).getClass().getName()));
		    Instant i = Instant.parse(mat.format(d));
            System.out.println(i);
            FindIterable<Document> nation= nat.find(new Document("date", i));
            JSONObject j = new JSONObject();
            j.put("stateName", "India");
            j.put("deceasedCases", nation.first().getInteger("c_deceased"));
            j.put("activeCases", nation.first().getInteger("c_active"));
            j.put("confirmedCases", nation.first().getInteger("c_confirmed"));
            j.put("recoveredCases", nation.first().getInteger("c_recovered"));
            j.put("dayliDeceasedCases", nation.first().getInteger("c_deceased_day"));
            j.put("dailyRecoveredCases", nation.first().getInteger("c_recovered_day"));
            j.put("dailyConfirmedCases", nation.first().getInteger("c_confirmed_day"));
            arrayObj.put(j);
            
            FindIterable<Document> fe = col.find(new Document("date", i));
            System.out.println("im out");
            
            final SimpleDateFormat fmtr = new SimpleDateFormat("yyyy-MM-dd");
            Block<Document> printBlock = new Block<Document>() {
                @Override
                public void apply(final Document document) {
                	System.out.println("im in");
                	final JSONObject obj=new JSONObject();
                	obj.put("stateName", document.getString("state_name"));
                	obj.put("recoveredCases", document.getInteger("state_recovered_day"));
                	obj.put("recordDate", fmtr.format(document.getDate("date")));
                	obj.put("deceasedCases", document.getInteger("state_deceased"));
                	obj.put("dailyRecoveredCases", document.getInteger("state_recoverd_day"));
                	obj.put("dailyDeceasedCases", document.getInteger("state_deceased_day"));
                	obj.put("dailyConfirmedCases", document.getInteger("state_confirmed_day"));
                	obj.put("confirmedCases", document.getInteger("state_confirmed"));
                	obj.put("activeCases", document.getInteger("state_active"));
                	
                	
                	arrayObj.put(obj);
                }
            };
            
            
            Document doc = fe.first();
//            out.println(d.getString("state_name"));
            
            System.out.println("im out");
            fe.forEach(printBlock);
            out.println(arrayObj);
            System.out.println(arrayObj);
            System.out.println(mat.format(d).getClass().getName());
            System.out.println(d);
            System.out.println(mat.parse("2020-08-20T00:00:00Z"));
            System.out.println(mat.parse("2020-08-20T00:00:00Z").getClass().getName());
            out.flush();
            
            
            
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}
/*
 # coviddashboard
this is maven project developed using springtool suite IDE
this is an web application which uses covid19 india API for main source of covid19 data
website has following funcitonalities:
  1. shows accurate number of COVID19 cases in india
  2. shows cases of each indivisual state and district in india
  3. cases are shown with a graphical format which makes user understand the numbers quickly and in friendly way

website is delveloped with following technologies:
  1. JSP / Servlet
  2. mongodb
  3. html, css
  4. vanilla javascript
 */

