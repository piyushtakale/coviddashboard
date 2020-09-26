package display;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class cdata extends HttpServlet{
    private static final long serialVersionUID = 1L;
    
    public cdata(){
        super();
    }

    protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        
    	try{
    		final PrintWriter out = res.getWriter();
            System.out.println("written 8: ");  

            MongoClient mongo = new MongoClient("localhost", 27017);
            System.out.println("got connected");
            MongoDatabase db = mongo.getDatabase("mylib");
            System.out.println("got database");
            MongoCollection<Document> col = db.getCollection("boox");
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
            FindIterable<Document> fe = col.find(new Document());
           
            Block<Document> printBlock = new Block<Document>() {
                @Override
                public void apply(final Document document) {
                	final JSONObject obj=new JSONObject(); 
                	obj.put("name", document.getString("name"));
                	obj.put("author", document.getString("author"));
                	arrayObj.put(obj);
                }
            };
            
            fe.forEach(printBlock);
            out.println(arrayObj);
            
            out.flush();
            
            
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}
