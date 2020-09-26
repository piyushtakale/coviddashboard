package dataservice;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.time.Instant;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;


import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;



public class StateList extends HttpServlet{
    private static final long serialVersionUID = 1L;
    
    public StateList(){
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
            MongoCollection<Document> col = db.getCollection("stateName");
            
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
             
            
            final JSONArray ao=new JSONArray();
            JSONObject oo = new JSONObject();
            res.setContentType("application/json");
		    res.setCharacterEncoding("UTF-8");
		    
//		    final JSONObject query=new JSONObject(); 
//          query.put("state_code", "MH");
		    
//		    BasicDBObject query = new BasicDBObject();
//		    query.put("state_code", "MH");
		    
		    
            
            
            
            FindIterable<Document> fe = col.find(new Document());
            System.out.println("im out");

            for (Document dc : fe) {
            	System.out.println("state name"+dc.getString("state_name"));
            	ao.put(dc.getString("state_name"));
            }
            oo.put("states", ao);
            out.println(oo);
            out.flush();
            
            
            
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}



