package piyush;

import com.mongodb.MongoClient;  
import com.mongodb.client.MongoCollection;  
import com.mongodb.client.MongoDatabase;

import javax.servlet.annotation.WebServlet;

import org.bson.Document;  


public class Sample {
	public static void main(String[] args){  
		try{  
			//---------- Connecting DataBase -------------------------//  
			MongoClient mongoClient = new MongoClient( "localhost" , 27017 );  
			//---------- Creating DataBase ---------------------------//  
			MongoDatabase db = mongoClient.getDatabase("javatpoint");  
			//---------- Creating Collection -------------------------//  
			MongoCollection<Document> table = db.getCollection("employee");  
			//---------- Creating Document ---------------------------//    
			Document doc = new Document("name", "Peter John");  
			doc.append("id",12);  
			//----------- Inserting Data ------------------------------//  
			table.insertOne(doc);  
			System.out.println("DOne");
		}catch(Exception e){  
			System.out.println(e);  
		}  
	}  
}
