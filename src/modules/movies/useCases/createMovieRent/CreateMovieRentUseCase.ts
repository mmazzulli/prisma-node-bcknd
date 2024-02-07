import { CreateMovieRentDTO } from "../../dtos/CreateMovieRentDTO";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

// Quando não há return na classe, o "Promise é <void>"
export class CreateMovieRentUseCase {
 async execute({ movieId, userId }: CreateMovieRentDTO ): Promise<void> {
    // verificar se o filme existe
    // O "findUnique" só pode ser usado quando ele é declarado como unique no schema
    const movieExists = await prisma.movie.findUnique({
        where: {
            id: movieId
        }
    });

    if(!movieExists) {
        throw new AppError("Esse filme não existe!");
    }

    // verificar se o filme já não está alugado

    // O "findFirst" busca a primeira incidência
    const movieAlreadyRented = await prisma.movieRent.findFirst({
        where: {
            movieId
        }
    });

    if(movieAlreadyRented){
        throw new AppError("Filme já está alugado!")
    }

    // verificar se o usuário existe
    const userExists = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if(!userExists){
        throw new AppError("Este usuário não existe");
    }

    // criar a locação
    await prisma.movieRent.create({
        data: {
            movieId,
            userId,
        },
    });
    


 }
}