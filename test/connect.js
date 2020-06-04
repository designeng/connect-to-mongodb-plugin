const wire = require('wire');
const expect = require('chai').expect;
const connectToDatabase = require('../connectToMongodbPlugin');

const spec = {
    $plugins: [
        connectToDatabase
    ],

    database: {
        connectToDatabase: {
            url: 'mongodb://localhost:27017/test'
        }
    }
}

let context;

before(async () => {
    try {
        context = await wire(spec);
    } catch (err) {
        console.log('Wiring error', err);
    }
});

describe('Connect to test database', () => {
    it('should connect', async () => {
        expect(context.database).to.be.ok;
    });
});

after(async () => {
    context.destroy();
});
