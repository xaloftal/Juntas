const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const morgan = require('morgan');

require('./Database/databaseRNP');

const app = express();

//app.use(morgan(':method :url | Status :status | Size :res[content-length] | Time :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('short'));
app.use(cors());

app.use(require('./routes/rnpRoute'));

app.use('/www', express.static('www'))

app.get('/', (req, res) => {
    res.redirect(301, '/');
  });

app.listen('3001', (err) => {
    if(err)
        throw err;

    console.log('running on port 3001');
});
