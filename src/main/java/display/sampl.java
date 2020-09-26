package display;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bson.Document;

import com.google.gson.Gson;
import com.mongodb.Block;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class sampl {

	@SuppressWarnings("deprecation")
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		try{
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

            FindIterable<Document> fe = col.find(new Document());
            System.out.println("{");
            Block<Document> printBlock = new Block<Document>() {
                @Override
                public void apply(final Document document) {
                	System.out.println(document.toJson()+",");
                }
            };
            
            fe.forEach(printBlock);
            System.out.println("\b }");
            
             
            
            
        }
        catch(Exception e){
            System.out.println(e);
        }

	}

}
