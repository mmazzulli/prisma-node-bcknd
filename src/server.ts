import "express-async-errors";
import express, { Response, Request, NextFunction } from 'express';
import { routes } from './routes';
import { AppError } from "./errors/AppError";
// O async-errors tem que estar no topo

const app = express();

// IMPORTANTÍSSIMO
// A ordem deve ser exatamente estas duas de baixo.
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction ) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server error - " + err.message
    })
  
});

app.listen('3333', () => {
    console.log('Servidor conectado na porta 3333.');
});