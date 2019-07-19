require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes/routes');
const config = require('config');
const winston            =require('winston');

process.on('uncaughtException',(ex)=>{
    console.log(`Ran into an error ${ex}`);
    winston.error(ex.message,ex);
});

process.on('unhandledRejection',(ex) => {
    console.log(`Ran into an error ${ex}`);
    winston.error(ex.message,ex);
});

winston.add(new winston.transports.File({filename:'logFile.log'}));

const PORT = process.env.PORT || 4000;
const app = express();

if(!config.get('db')){
    console.log('Database Credentials not defined');
    process.exit(1);
}

require('./models/database/dbContext')();

if(!config.get('jwtPrivateKey')){
    console.log('JSON Web Token Secret not defined');
    process.exit(1);
}

app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
routes(app);



const server = app.listen(PORT,() =>{
    console.log(`Now Listening on ${PORT}`);
});

module.exports = server;