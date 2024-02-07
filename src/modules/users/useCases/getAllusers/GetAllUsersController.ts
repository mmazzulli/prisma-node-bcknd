
// Controller para receber as info das rotas e passar para o useCase

import { Request, Response } from "express";
import { GetAllUsersUsecase } from "./GetAllUsersUseCase";


export class GetAllUserController {
    async handle(req: Request, res: Response) {

        const getAllUsersUsecase = new GetAllUsersUsecase();
        const result = await getAllUsersUsecase.execute();

        return res.status(201).json(result);

    }

    
}