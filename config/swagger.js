const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'COMPLET BLOG API',
        },
        servers: [
            {
                url: 'http://localhost:9000', //
            },
        ],
    },
    apis: ['./routes/swagger/swaggerDoc.js'],
};

const specs = swaggerJsdoc(options);


// Ajoutez une vérification pour vous assurer que 'app' est passé en tant qu'argument
const setupSwagger = (app) => {
    if (!app) {
        throw new Error("Express app instance is required");
    }
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};


module.exports = setupSwagger;
