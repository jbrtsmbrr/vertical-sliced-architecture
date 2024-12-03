import CreateUserUseCase from "../../../src/application/use-cases/users/CreateUser";
import { GetUserUseCase } from "../../../src/application/use-cases/users/GetUserUseCase";
import { CreateUserController } from "../../../src/infrastructure/controllers/user/CreateUserController";
import { CreateUserControllerInput } from "../../../src/interfaces/controllers/ICreateUserController";
import { MockEmailer } from "../../mocks/emailer.mock";
import { MockUserRepository } from "../../mocks/user_repository.mock";

// Services, Repositories
const repository = new MockUserRepository();
const emailer = new MockEmailer();
// Use cases
const useCase = new CreateUserUseCase(repository, emailer);
const getUserUseCase = new GetUserUseCase(repository);
// Controllers
const controller = new CreateUserController(useCase, getUserUseCase);

describe('💡Testing Controller: Create User', () => {
  test('should return correct response', async () => {
    const toInsertUser: CreateUserControllerInput = {
      Name: 'Alex',
      Lastname: 'Malana',
      Age: 18,
      Password: 'password'
    }

    const response = await controller.handle(toInsertUser);

    expect(response.data).toEqual({
      id: "1",
      name: toInsertUser.Name,
      lastname: toInsertUser.Lastname,
      age: toInsertUser.Age
    });
  })

  test('should not insert invalid data', async () => {
    const toInsertUser: CreateUserControllerInput = {
      Name: 'John',
      Lastname: 'Invalid',
      Age: 11,
      Password: 'password'
    }

    const { errors } = await controller.handle(toInsertUser);
    const is_error = errors.length > 0;

    expect(is_error).toEqual(true);
  })
})