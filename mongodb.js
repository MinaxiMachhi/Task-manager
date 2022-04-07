// CRUD -create, read, update, delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const objectID = mongodb.objectID

const { MongoClient, ObjectID, ObjectId } = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

const id = ObjectID()
// console.log(id);
// console.log(id.id);
// console.log(id.id.length);

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("unable to connect to database");
    }
    console.log("connected to database");
    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: "Minaxi",
        age: 25
    }, (error, result) => {
        if (error) {
            return console.log("unable to insert");
        }
        console.log(result);

    })
    db.collection('users').insertMany([{
        name: "Minaxi",
        age: 25
    }, {
        name: "gem",
    }], (error, result) => {
        if (error) {
            return console.log("unable to insert");
        }
        console.log(result.ops);

        // })
        // db.collection('tasks').insertMany([{
        //     desc: "read",
        //     completed: true
        // }, {
        //     desc: "create",
        //     completed: true
        // },{
        //     desc: "update",
        //     completed: false
        // },
        // ], (error, result) => {
        //     if (error) {
        //         return console.log("unable to insert");
        //     }
        //     console.log(result);

        // })

        //======read operation =======
        // ---findOne will give first find value-------------
        // db.collection('users').findOne({name : "Minaxi"},(error,user)=>{
        //     if(error){
        //         console.log(error);
        //     }
        //     console.log(user);
        // })
        db.collection('users').find({ name: "Minaxi" }).toArray((error, user) => {
            if (error) {
                console.log(error);
            }
            console.log(user);
        })
        db.collection('users').find({ name: "Minaxi" }).count((error, count) => {
            console.log(count);
        })

        //Updating document
        db.collection('users').updateOne({ name: "Minaxi" }, {
            $set: {
                name: 'Min'
            }
        })

        // const updatePromise = db.collection('users').updateOne({ _id: new ObjectId('62287ed868405581b5b9bfed') }, {
        //     $set: { name: 'Minu' }
        // })
        // updatePromise.then((result) => {
        //     console.log("update=======",result);
        // }).catch((error) => {
        //     console.log(error);
        // })
        db.collection('users').updateOne({ _id: new ObjectId('62287ed868405581b5b9bfed') }, {
            $set: { name: 'Minu' }
        }).then((result) => {
            console.log("update=======", result);
        }).catch((error) => {
            console.log(error);
        })

        //$inc fn to increment value
        db.collection('users').updateOne({ _id: new ObjectId('62287ed868405581b5b9bfed') }, {
            $inc: { age: -1 }
        }).then((result) => {
            console.log("update=======", result);
        }).catch((error) => {
            console.log(error);
        })

        //updateMany
        db.collection('users').updateMany({ name: "Minaxi" }, {
            $inc: { age: -1 }
        }).then((result) => {
            console.log("update=======", result);
        }).catch((error) => {
            console.log(error);
        })

        //deleteOne
        db.collection('users').deleteOne({
            name: "Minu"
        }).then((result) => {
            console.log("delete=======", result);
        }).catch((error) => {
            console.log(error);
        })
        db.collection('users').deleteMany({
            age: 25
        }).then((result) => {
            console.log("delete=======", result);
        }).catch((error) => {
            console.log(error);
        })
    })
})