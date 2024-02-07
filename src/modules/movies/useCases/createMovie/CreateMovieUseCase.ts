
import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateMovieUseCase {
    // o "title","duration" etc aqui é o que se recebe de uma requisição 
    // CreateUserDTO na linha abaixo é a configuração da tipagem
    async execute({ 
        title, 
        duration, 
        release_date 
    }: CreateMovieDTO ): Promise<Movie> 
    {
        // Verificar no DB se o filme existe
        // Para isso precisa usar o "prisma client"
        // O prisma client executa as queries. Tem acesso as Tables do schema
        // Criei pasta/file "src/prisma/client.ts" para esta finalidade
        const movieAlreadyExists = await prisma.movie.findUnique({
            where: {
                // email: email ou simplesmente email
                // ou seja o email na tabela = email requisitado
                title,
            }
        });
        // Acima o "user" é a tabela 

        // Criar user se não existir
        if (movieAlreadyExists) {
            throw new AppError("Este filme já existe!");
        }
        // cria novo filme
        const movie = await prisma.movie.create({
            data: {
                title, 
                duration, 
                release_date,
            }
        });

        return movie;
    }
}