### Tratamento de erros da etapa anterior
errors/AppError.ts
Alteração na server.ts 
Alteração na CreateUserUseCase.ts 

--Importação/alteração/instalação na server.ts: 
> npm install express-async-errors
import "express-async-errors";
import express, { Response, Request, NextFunction } from 'express';

### Funcionamento 
Cadastro de nome e email
Erro ao cadastrar mais de um email semelhante

### Visualizar DB
> npx prisma studio 
Abre na porta 5555

### Sobre as Rotas
server.ts
Pasta routes > index.ts / movie.routes.ts
CreateMovieController


