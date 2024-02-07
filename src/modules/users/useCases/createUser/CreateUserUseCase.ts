
import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateUserUseCase {
    // o "name" e "email" aqui é o que se recebe de uma requisição 
    // CreateUserDTO na linha abaixo é a configuração da tipagem
    async execute({ name, email }: CreateUserDTO ): Promise<User> 
    {
        // Verificar no DB se o user existe
        // Para isso precisa usar o "prisma client"
        // O prisma client executa as queries
        // Criei pasta/file "src/prisma/client.ts" para esta finalidade
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                // email: email ou simplesmente email
                // ou seja o email na tabela = email requisitado
                email
            }
        });
        // Acima o "user" é a tabela 

        // Criar user se não existir
        if (userAlreadyExists) {
            throw new AppError("Este usuário já existe!");
        }
        // cria novo usuário
        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        });

        return user;
    }
}