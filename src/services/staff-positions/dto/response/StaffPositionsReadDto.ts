import {UserReadDto} from "@/services/users/dto/Response/UserReadDto";

export interface StaffPositionsReadDto {
    id: string,
    name: string,
    description: string,
    users: UserReadDto[]
}
