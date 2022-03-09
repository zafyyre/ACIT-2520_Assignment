const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const index = require("./routes");
const evs = require("./routes/evs");

const config = require('./config');

const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Extended https://swagger.io/specification/#infoObject

swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Students API',
        description: 'Student API information',
        contact: {
            name: "Developer Jane Bond"
        },
        version: '1.0.0',
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development Server"
            }
        ]
    }
}

const swaggerOptions = {
    swaggerDefinition,
    apis: ['routes/*.js']
}

const swaggerSpec = swaggerJsDoc(swaggerOptions);


mongoose.connect(`mongodb://${config.database_server}:${config.database_port}/ev`, function (err) {
   if (err) throw err;
   console.log(`Successfully connected do database server ${config.database_server}:${config.database_port}.`);
});


// View engine
const ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine);           // support master pages
app.set("view engine", "ejs");          // ejs view engine

// Set static folder
app.use(express.static(path.join(__dirname, "client")));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", index);
app.use("/api", evs);

app.listen(config.http_port, function() {
    console.log(`Server started on port: ${config.http_port}`);
    console.log(`Using mongo database on server ${config.database_server}:${config.database_port}`);
});
