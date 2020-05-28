const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const url = process.env.DB_URL;

const dbName = "mystore";
const colName = "mycart";
const settings = { useUnifiedTopology: true }

const getItem= () => {
    const iou = new Promise ((resolve,reject) => {
        MongoClient.connect(url, settings, function(err, client){
            if(err){
                reject(err);
            }else{
                console.log("Connected to Cart")
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs){
                    if (err) {
                        reject(err);
                    } else { 
                        console.log("Found the Following");
                        console.log(docs);
                        resolve(docs);
                        client.close();
                    }
                });
            }
        });
    });
    return iou;
};

const createItem = (item) => {
    const iou = new Promise ((resolve,reject) => {
        MongoClient.connect(url, settings, async function (err,client){
            if(err){
                reject(err);
            } else{
                console.log("Connected successfully to POST new Item");
                const db = client.db(dbName);
                const collection = db.collection(colName)
                collection.insertMany (item, (err, result) => {
                   if(err){
                       reject(err);
                   } else {
                       resolve(result.ops); 
                       client.close();
                   }
               })


            }
        

        })
    });
    return iou;
};

const updateItem= (id, item) => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(url, settings, function (err, client){
            if(err){
                reject(err);
            }else{
                console.log("Connected to server to Update Item.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.replaceOne({_id: ObjectID(id)},
                    item,
                    {upsert:true },
                    (err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve({ updated_id:id });
                            client.close();
                        }
                    }
                );
            }
        })
    })
    return iou;
};

const deleteItem = async (id) => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(url, settings, async function (err, client) { 
            if(err){
                reject(err);
            } else {
                console.log("Connected to Server to Delete Item");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                console.log(collection)
                collection.deleteMany({_id: ObjectID(id) }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else{
                         resolve(true);
                         client.close(); 
                    }
                })
            }
        })    
    })
    return iou;
}; 

module.exports = {
    getItem,
    createItem,
    updateItem,
    deleteItem
}