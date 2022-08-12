const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017'

const dbname = 'nodeExpressServer';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Connected to server.');

    const db = client.db(dbname);

    const collection = db.collection('dishes');

    collection.insertMany([{"name": "Uthappizza", "description": "Test"}, {"name": "Poha", "desciption": "Test one"}], (err, result) => {
        assert.equal(err, null);

        console.log('After insert: \n');
        console.log(result);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);

            console.log('Found: \n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);

                client.close();
            })
        });
    });
})