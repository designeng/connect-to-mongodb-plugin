const MongoClient = require('mongodb').MongoClient;

function connectToMongodbPlugin() {
    var activeDatabases = {};

    const closeOpenedConnections = () => {
        var keys = Object.keys(activeDatabases);
        return Promise.all(keys.map(key => {
            return activeDatabases[key].close();
        }))
    }

    function connectToDatabase({ resolve, reject }, compDef, wire) {
        wire(compDef.options).then(async ({
            url,
            dbName,
            user,
            password,
            options = {},
            logger
        }) => {

            var additionalOptions = {
                useUnifiedTopology: true
            };

            var active = activeDatabases[url];

            if(active) {
                resolve(active);
            } else {
                const client = new MongoClient(url, Object.assign(options, additionalOptions));

                client.on('close', () => {
                    if(logger && ('info' in logger)) {
                        logger.info(`CLOSED MONGODB CONNECTION: ${url.replace(/\/\/([^:]+):(.*)@/,"//$1:***@")}`)
                    }
                });

                client.connect(function(error) {
                    if(!error) {
                        const db = client.db(dbName);
                        activeDatabases[url] = client;
                        resolve(db);
                    } else {
                        reject(error);
                    }
                });
            }
        });
    }

    return {
        factories: {
            connectToDatabase
        },
        context: {
            shutdown: (resolver, wire) => {
                resolver.resolve(closeOpenedConnections());
            },
            error: (resolver, wire, err) => {
                resolver.resolve(closeOpenedConnections());
            }
        }
    }
}

module.exports = connectToMongodbPlugin;
