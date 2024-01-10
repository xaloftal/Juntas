const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

require('./Database/databaseJMAI');
require('./Database/databaseRNU');

const app = express();

//app.use(morgan(':method :url | Status :status | Size :res[content-length] | Time :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('short'));

app.use(require('./routes/registoRoute'));
app.use(require('./routes/rnuRoute'));
app.use(require('./routes/loginRoute'));
app.use(require('./routes/medicosRoute'));

app.use('/www', express.static('www'))

app.get('/', (req, res) => {
    res.redirect(301, '/www/Login.html');
  });

app.listen('3050', (err) => {
    if(err)
        throw err;

    console.log('running on port 3050');
});
