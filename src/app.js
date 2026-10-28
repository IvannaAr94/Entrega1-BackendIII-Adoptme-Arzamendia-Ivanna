import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { environment } from './utils/index.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.use((error, req, res, next) => {
    console.error('Error interno:', error.message);
    if (res.headersSent) return next(error);
    return res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
});

async function startServer() {
    if (!environment.MONGO_URI) {
        throw new Error('Falta configurar MONGO_URI en el archivo .env');
    }

    await mongoose.connect(environment.MONGO_URI);
    app.listen(environment.PORT || 8080, () => {
        console.log(`Servidor disponible en http://localhost:${environment.PORT || 8080}`);
    });
}

startServer().catch((error) => {
    console.error('No se pudo iniciar Adoptme:', error.message);
    process.exitCode = 1;
});
