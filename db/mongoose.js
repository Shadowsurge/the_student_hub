let mongoose = require('mongoose');

// tell mongoose to use the javascrpt promise
mongoose.Promise = global.Promise;

let database =
{
    localHost: 'mongodb://localhost:27017/student_hub',
    mlab: 'mongodb://admin:studenthub1234@ds157500.mlab.com:57500/student_hub'
}

mongoose.connect(process.env.PORT ? database.mlab : database.localHost);

module.exports = {mongoose};
