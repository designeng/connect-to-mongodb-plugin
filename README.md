## MongoDb plugin for wire.js

## Installation
`npm i connect-to-mongodb-plugin`

## Usage
bootstrap.js:
```
import connectToMongodbPlugin from 'connect-to-mongodb-plugin';

export default {
    $plugins: [
        connectToMongodbPlugin
    ],

    database: {
        connectToDatabase: {
            url: 'mongodb://localhost:27017/db_name'
        }
    }
}
```
Install wire from `git://github.com/cujojs/wire.git#0.10.11`
main.js:
```
import wire from 'wire';
import bootstrap from './bootstrap';

wire(bootstrap).then(context => {
    let { database } = context;

    /* do smth with database */

    context.destroy();
})
```
