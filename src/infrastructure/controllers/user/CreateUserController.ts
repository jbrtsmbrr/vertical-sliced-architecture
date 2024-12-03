
//
// Approach #1: Simple
//

import CreateUserUseCase from "../../../application/use-cases/users/CreateUser";
import { GetUserUseCase } from "../../../application/use-cases/users/GetUserUseCase";
import { ICreateUserUseCase } from "../../../application/use-cases/users/interfaces/ICreateUserUseCase";
import { IGetUserUseCase } from "../../../application/use-cases/users/interfaces/IGetUserUseCase";
import { CreateUserControllerInput, CreateUserControllerOutput, ICreateUserController } from "../../../interfaces/controllers/ICreateUserController";
import { UserRepositoryAdapter } from "../../adapters/repositories/UserRepository";
import { GoogleEmailer } from "../../adapters/services/Emailer";



export async function onCreateUserController(): Promise<CreateUserControllerOutput> {

  const repository = new UserRepositoryAdapter();
  // const mongo_user_repo = new MongoRepository();
  const emailer = new GoogleEmailer();

  const createUserUseCase = new CreateUserUseCase(repository, emailer)
  const getUserUseCase = new GetUserUseCase(repository);

  const { errors, result: inserted_id } = await createUserUseCase.execute({ age: 11, name: 'John', lastname: 'Doe', password: 'password' });

  if (!inserted_id)
    return {
      data: null,
      errors: errors.map(e => e.message)
    }


  const user = await getUserUseCase.execute(inserted_id)

  return {
    data: user,
    errors: errors.map(e => e.message)
  }
}



// Approach #2: Much better approach, 
// especially if you want to test your controller

export class CreateUserController implements ICreateUserController {
  private readonly usecase: ICreateUserUseCase;
  private readonly getUserUseCase: IGetUserUseCase

  constructor(usecase: ICreateUserUseCase, getUserUseCase: IGetUserUseCase) {
    this.usecase = usecase;
    this.getUserUseCase = getUserUseCase;
  }

  public async handle(user_input: CreateUserControllerInput): Promise<CreateUserControllerOutput> {
    const { result: inserted_id, errors } = await this.usecase.execute({
      name: user_input.Name,
      lastname: user_input.Lastname,
      password: user_input.Password,
      age: user_input.Age
    });

    if (!inserted_id)
      return {
        data: null,
        errors: errors.map(e => e.message)
      }

    const user = await this.getUserUseCase.execute(inserted_id)

    return {
      data: user,
      errors: errors.map(e => e.message)
    }
  }
}