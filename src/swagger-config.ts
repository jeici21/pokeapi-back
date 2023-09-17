import { Express } from 'express-serve-static-core';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'PokeAPI',
            version: '1.0.0',
            description: 'API para gestionar Pokémon',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor de desarrollo',
            },
        ],
    },
    apis: ['./controllers/*.ts'],
};

const specs = swaggerJsDoc(options);

export default function swaggerConfig(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
