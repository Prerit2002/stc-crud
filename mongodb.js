
const {MongoClient , ObjectId} = require('mongodb')

const connectionURL = process.env.MONGO_URL
const databasename = 'stc-project'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error , client) => {
    if (error) {
        return console.log('unable to connect to database')
    }
    const db = client.db(databasename)

})