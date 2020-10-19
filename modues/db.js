//mongod --port 27017 --dbpath /var/lib/mongodb --auth
//mongo 127.0.0.1:27017/test -u test -p 123
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test',{
    user: 'test',
    pass: '123',
    poolSize: 10
});

const db = mongoose.connection;
db.on('err',err => {
    console.error(err);
});

db.on('open', () => {
    console.log('connected to mongoose');
});

module.exports = mongoose;
