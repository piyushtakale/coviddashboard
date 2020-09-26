package display;

import java.io.IOException;

import org.bson.BasicBSONObject;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONArray;
import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class GiveDataSample{
    
    public static void main(String args) {
        
    	try{
    	
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
            
		    
            BasicDBObject query = new BasicDBObject();
		    query.put("state_code", "MH");
//            final JSONObject query=new JSONObject(); 
//            query.put("state_code", "MH");
            FindIterable<Document> fe = col.find( (Bson) query);
           
            Block<Document> printBlock = new Block<Document>() {
                @Override
                public void apply(final Document document) {
                	final JSONObject obj=new JSONObject(); 
                	obj.put("code", document.getString("state_code"));
                	obj.put("mele", document.getString("state_deceased"));
                	arrayObj.put(obj);
                }
            };
            
            fe.forEach(printBlock);
            
            System.out.println(arrayObj);
            
            
            
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}


