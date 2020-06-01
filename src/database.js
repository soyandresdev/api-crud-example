const mongoose = require('mongoose');

// mongoose
//   .connect(process.env.MONGO, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log('DB is connected'))
//   .catch((err) => console.error(err));

let mongoDB;

function initServer() {
  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('DB is connected'))
    .catch((err) => console.error(err));

  mongoDB = mongoose;
}
initServer();

module.exports = mongoDB;
