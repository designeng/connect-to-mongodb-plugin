## MongoDb plugin for wire.js
```
import { MongoClient } from 'mongodb';
import connectToMongodbPlugin from 'connect-to-mongodb-plugin';

export default {
    $plugins: [
        connectToMongodbPlugin
    ],

    database: {
        connectToMongodb: {
            url: 'mongodb://localhost:27017/db_name?',
            MongoClient
        }
    }
}
```
