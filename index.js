const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ppdndxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
   // await client.connect();

    const craftCollection = client.db('craftDB').collection('craft');
    const listItemsCollection = client.db('craftDB').collection('listItems');
    const usersCollection = client.db('craftDB').collection('users');
    const kitchenCollection = client.db('craftDB').collection('kitchen');   
    const jutehomeCollection = client.db('craftDB').collection('jutehome'); 
    const artiesthomeCollection = client.db('craftDB').collection('artiest');
    

      // CREATE read
    app.get("/craft" , async(req , res) => {
        const cursor = craftCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
        //update 
    app.get("/craft/:id" , async(req , res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await craftCollection.findOne(query);
        res.send(result);        
    })
       //CREATE DONE
    app.post("/craft" , async(req , res) =>{
        const newCraft = req.body;
        console.log(newCraft);
        const result = await craftCollection.insertOne(newCraft);
        res.send(result);
    })
       // update  
       app.put('/craft/:id', async(req , res) =>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const options = {upsert : true};
        const updatedCraft = req.body;
        const craftItems ={
            $set: {
                item_name: updatedCraft.item_name,
                subcategory_Name: updatedCraft.subcategory_Name,
                description: updatedCraft.description,
                processing_time: updatedCraft.processing_time,
                price: updatedCraft.price,
                customization: updatedCraft.customization,
                stockStatus: updatedCraft.stockStatus,
                image: updatedCraft.image,
            }
        }
        const result = await craftCollection.updateOne(filter, craftItems, options)
        res.send(result);
    })

    app.delete('/craft/:id', async(req, res)=>{
        const id =req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await craftCollection.deleteOne(query);
        res.send(result);
    })

       // list item read
    app.get("/listItems" , async(req , res) => {
        const cursor = listItemsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    //     //update er jonno 
    app.get("/listItems/:id" , async(req , res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await listItemsCollection.findOne(query);
        res.send(result);        
    })
    
        //create list items
    app.post("/listItems" , async(req , res) =>{
        const listItems = req.body;
        console.log(listItems);
        const result = await listItemsCollection.insertOne(listItems);
        res.send(result);
    })

       
     //delete
    app.delete('/listItems/:id', async(req, res)=>{
        const id =req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await listItemsCollection.deleteOne(query);
        res.send(result);
    })
    
    //users related api s

    // read
    app.get("/users" , async(req , res) => {
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    //created
    app.post("/users" , async(req , res) =>{
        const users = req.body;
        console.log(users);
        const result = await usersCollection.insertOne(users);
        res.send(result);
    })

    //delete
    app.delete('/users/:id', async(req, res)=>{
        const id =req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.deleteOne(query);
        res.send(result);
    })

    app.get("/kitchen", async (req, res) => {     
        const result = await  kitchenCollection.find().toArray();
        res.send(result);
    });

    app.post("/kitchen", async (req, res) => {
        const kitchenItem = req.body;
        console.log(kitchenItem);
        const result = await kitchenCollection.insertOne(kitchenItem);
        res.send(result);
    });

    app.get("/kitchen/:id" , async(req , res) =>{
        const id = req.params.id;
        console.log(id);
        
        const query = {_id: new ObjectId(id)}
        const result = await kitchenCollection.findOne(query);
        res.send(result);        
    })

    app.delete('/kitchen/:id', async(req, res)=>{
        const id =req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await kitchenCollection.deleteOne(query);
        res.send(result);
    })

    app.get("/jutehome", async (req, res) => {     
        const result = await jutehomeCollection.find().toArray();
        res.send(result);
    });

    app.post("/jutehome", async (req, res) => {
        const jutehome = req.body;
        console.log(jutehome);
        const result = await jutehomeCollection.insertOne(jutehome);
        res.send(result);
    });

    app.get("/jutehome/:id" , async(req , res) =>{
        const id = req.params.id;
        console.log(id);        
        const query = {_id: new ObjectId(id)}
        const result = await jutehomeCollection.findOne(query);
        res.send(result);        
    })

    app.delete('/jutehome/:id', async(req, res)=>{
        const id =req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await jutehomeCollection.deleteOne(query);
        res.send(result);
    })

    app.get("/artiest", async (req, res) => {     
        const result = await artiesthomeCollection.find().toArray();
        res.send(result);
    });

    app.post("/artiest", async (req, res) => {
        const artiest = req.body;
        console.log(artiest);
        const result = await artiesthomeCollection.insertOne(artiest);
        res.send(result);
    });
    



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.get("/" , (req , res) => {
    res.send("Server Is Running")
})

app.listen(port , () =>{
    console.log(`Server Is Running On Port: ${port}`)
})