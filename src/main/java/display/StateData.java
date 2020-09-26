package display;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;

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
import java.util.Iterator;
import java.util.List;
import org.bson.types.ObjectId;

public class StateData extends HttpServlet{
    private static final long serialVersionUID = 1L;
    
    public StateData(){
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
            FindIterable<Document> fe = col.find(new Document("state_code", "MH"));
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
            Document d = fe.first();
//            out.println(d.getString("state_name"));
            
            System.out.println("im out");
            fe.forEach(printBlock);
            out.println(arrayObj);
            System.out.println(arrayObj);
            out.flush();
            
            
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}

