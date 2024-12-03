import CreateUserUseCase from "../../src/application/use-cases/users/CreateUser"
import { GetUserUseCase } from "../../src/application/use-cases/users/GetUserUseCase";
import { CreateUserController } from "../../src/infrastructure/controllers/user/CreateUserController";
import { MockEmailer } from "../mocks/emailer.mock";
import { MockUserRepository } from "../mocks/user_repository.mock";

// Services, Repositories
const repository = new MockUserRepository();
const emailer = new MockEmailer();
// Use cases
const useCase = new CreateUserUseCase(repository, emailer);
const getUserUseCase = new GetUserUseCase(repository);
// Controllers
const controller = new CreateUserController(useCase, getUserUseCase);

// Test cases
describe('💡Testing UseCase:  Create User', () => {
  test('first time creating user', async () => {
    const { result: inserted_id } = await useCase.execute({
      age: 21,
      name: "John",
      lastname: "Doe",
      password: "password"
    });

    expect(inserted_id).toBe("1")
  })

  test('second time creating user', async () => {

    const { result: inserted_id } = await useCase.execute({
      age: 22,
      name: "John",
      lastname: "Doe",
      password: "password"
    });

    expect(inserted_id).toBe("2")
  })

  test('get inserted user after insertion', async () => {
    const { result: inserted_id } = await useCase.execute({
      age: 23,
      name: "John 3",
      lastname: "Doe 3",
      password: "password"
    });


    const retrieved_user = await getUserUseCase.execute(inserted_id ?? "0")

    expect(retrieved_user?.name).toBe("John 3")
    expect(retrieved_user?.lastname).toBe("Doe 3")
  })

});

