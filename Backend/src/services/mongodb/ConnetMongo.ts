import mongoose from 'mongoose';
// import debug from 'debug';
 
class MongooseService {
  private count = 0
  private mongooseOpcion = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSeletionTimeoutMS: 5000,
    useFindAndModify: false
  }
  constructor() {
    this.connectWithRetry()
  }

  getMongoose() {
    return mongoose
  }

  connectWithRetry = () => {
    // log('Attempting MongoDB connection (will retry if needed)') /debugin
    // const DB_URI = `mongodb://mongo:27017/node-db`
    const DB_URI = `mongodb://localhost:27017/myproject`

    mongoose
      .connect(DB_URI, this.mongooseOpcion)
      .then(() => {
          console.log('MongoDB is connected')
      })   
      .catch((err) => {
        const retrySeconds = 5;
        console.log(
          `MongoDB connection unsuccessful (will retry #${++this
              .count} after ${retrySeconds} seconds):`,
              err
        )
        setTimeout(this.connectWithRetry, retrySeconds * 1000)
      })
  }
}
export default new MongooseService()