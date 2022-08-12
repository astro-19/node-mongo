const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017'

const dbname = 'nodeExpressServer';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Connected to server.');

    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, 'dishes', (result) => {
        console.log('Insert document: \n', result);

        dboper.findDocument(db, 'dishes', (docs) => {
            console.log("Found documents: \n", docs);

            dboper.updateDocument(db, { name: "Vadonut"} , { description: "Updated test" }, 'dishes', (result) => {
                console.log("Updated document: \n", result);

                dboper.findDocument(db, 'dishes', (docs) => {
                    console.log("Found documents: \n", docs);

                    db.dropCollection('dishes', (result) => {
                        console.log("Dropped collection: \n", result);

                        client.close();
                    })
                });
            });
        });
    });

});




// const collection = db.collection('dishes');

    // collection.insertMany([{"name": "Uthappizza", "description": "Test"}, {"name": "Poha", "desciption": "Test one"}], (err, result) => {
    //     assert.equal(err, null);

    //     console.log('After insert: \n');
    //     console.log(result);

    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err, null);

    //         console.log('Found: \n');
    //         console.log(docs);

    //         db.dropCollection('dishes', (err, result) => {
    //             assert.equal(err, null);

    //             client.close();
    //         })
    //     });
    // });