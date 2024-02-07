import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetAllUsersUsecase {
    async execute(): Promise<User[]> {
        // Retorna todos os users
        const users = await prisma.user.findMany({
            include: {
                movie_rent: {
                    select: {
                        movie: {
                            select: {
                                title: true,
                            }
                        }
                    }
                } 
            }
        });

        return users;
    }
}
