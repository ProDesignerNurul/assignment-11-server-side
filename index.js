const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware 
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zwnyjff.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
  const serviceCollection = client.db('nurulRideShare').collection('rideServices');
  const allServices = client.db('nurulRideShare').collection('allServices');

  app.get('/sixservices', async (req, res) => {
    const query = {};
    const cursor = serviceCollection.find(query);
    const services = await cursor.toArray();
    res.send(services);
  })

  app.get('/services', async (req, res) => {
    const query = {};
    const cursor = serviceCollection.find(query);
    const services = await cursor.limit(3).toArray();
    res.send(services);
  })
}
run().catch(err => console.error(err))








// server site testing 
app.get('/', (req, res) => {
    res.send('server is running now');
});

app.listen(port, () => {
    console.log(`server is running now on port ${port}`);
});