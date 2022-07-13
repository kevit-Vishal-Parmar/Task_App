//CRUD operation
const { ObjectID } = require('bson');
const { MongoClient, ObjectId } = require('mongodb');

//Get New Id Using ObjectID.

// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable To Connect Database", error);
    }
    const db = client.db(databaseName)

    //* Insert One Document In Database.
    /*
        db.collection('users').insertOne({
            name: "Dhruv",
            city: "Morbi"
        },async (error, result) => {
            if (error) {
                return console.log('Data Not Inserted!!');
            }
            await console.log(result.insertedId);
        })
    */

    //* Insert Multipal Document In Database.

   /* db.collection('tasks').insertMany([{
        description: "Complete Assignment",
        complete: false
    }, {
        description: "Submit Assignemt",
        complete: true
    }], (error, result) => {
        console.log(result.insertedIds);
    }) */

    //* Find a One  Document.
    /*db.collection("users").findOne({
        name : "Vishal"
    },(error,result)=>{
        console.log(result);
    })*/

    //* Find
    //db.collection("users").find({ name : "Abc"  }).toArray((error,data)=>console.log(data));

    //*Count
    // db.collection("users").find({ name : "Abc"  }).count((error,data)=>console.log(data));


    //* Update Date Using UpdateOne
    /*db.collection("users").updateOne({
        _id: new ObjectId("62ce4fb700aee9ed393d3f6d")
    }, {
        $set: {
            name: "ABC"
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })*/

    //* Update Data Using UpdateMany
    /* db.collection("tasks").updateMany(
        {
                complete : false
        }
    ,{
        $set:{
            complete : true
        }
    }).then((res)=>{
        console.log(res);
    }).catch((error)=>{
        console.log(error);
    })*/
    //*Delete a Data Using DeleteOne

    /* db.collection("users").deleteOne({
        name: "Abc"
    }).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    })*/

    //*Delete a Data Using DeleteMany

    /*db.collection("users").deleteMany({
        name : "Abc"
    }).then((res)=>{
        console.log(res);
    }).catch((error)=>{
        console.log(error);
    })*/


    // console.log("Success");
})