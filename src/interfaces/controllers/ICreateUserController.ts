import { UserOutput } from "../../application/use-cases/users/interfaces/output";

export interface CreateUserControllerOutput { data: UserOutput | null, errors: string[] }

export interface CreateUserControllerInput { Name: string, Lastname: string, Password: string, Age: number }

export interface ICreateUserController {
  handle(input: CreateUserControllerInput): Promise<CreateUserControllerOutput>
}