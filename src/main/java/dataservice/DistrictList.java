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

public class DistrictList extends HttpServlet{
    private static final long serialVersionUID = 1L;
    
    public DistrictList(){
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
            MongoCollection<Document> col = db.getCollection("districts");
            MongoCollection<Document> nat = db.getCollection("states");
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
            
            String statename = req.getParameter("statename");
            
            System.out.println(statename);
            
             
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
            FindIterable<Document> nation= nat.find(new Document("date", i).append("state_name", statename));
            JSONObject j = new JSONObject();
            j.put("districtName", statename);
            j.put("deceasedCases", nation.first().getInteger("state_deceased"));
            j.put("activeCases", nation.first().getInteger("state_active"));
            j.put("confirmedCases", nation.first().getInteger("state_confirmed"));
            j.put("recoveredCases", nation.first().getInteger("state_recovered"));
            j.put("dayliDeceasedCases", nation.first().getInteger("state_deceased_day"));
            j.put("dailyRecoveredCases", nation.first().getInteger("state_recovered_day"));
            j.put("dailyConfirmedCases", nation.first().getInteger("state_confirmed_day"));
            arrayObj.put(j);
            
            FindIterable<Document> fe = col.find(new Document("date", i).append("state_name", statename));
            System.out.println("im out");
            
            final SimpleDateFormat fmtr = new SimpleDateFormat("yyyy-MM-dd");
            Block<Document> printBlock = new Block<Document>() {
                @Override
                public void apply(final Document document) {
                	System.out.println("im in");
                	final JSONObject obj=new JSONObject();
                	obj.put("districtName", document.getString("district_name"));
                	
                	obj.put("recordDate", fmtr.format(document.getDate("date")));
                	
                	obj.put("dailyRecoveredCases", document.getInteger("district_recovered_day"));
                	obj.put("dailyDeceasedCases", document.getInteger("district_deceased_day"));
                	obj.put("dailyConfirmedCases", document.getInteger("district_confirmed_day"));
                	obj.put("deceasedCases", document.getInteger("district_deceased"));
                	obj.put("recoveredCases", document.getInteger("district_recovered"));
                	obj.put("confirmedCases", document.getInteger("district_confirmed"));
                	obj.put("activeCases", document.getInteger("district_active"));
                	
                	
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



