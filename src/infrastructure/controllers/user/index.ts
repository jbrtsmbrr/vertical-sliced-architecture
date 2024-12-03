import CreateUserUseCase from "../../../application/use-cases/users/CreateUser";
import { GetUserUseCase } from "../../../application/use-cases/users/GetUserUseCase";
import { CreateUserControllerInput } from "../../../interfaces/controllers/ICreateUserController";
import { GoogleEmailer } from "../../adapters/services/Emailer";
import { UserRepositoryAdapter } from "../../adapters/repositories/UserRepository";
import { CreateUserController } from "./CreateUserController";

// Sample input, this maybe from web/mobile or from api requests. 
// Consider `object_outside_system` variable as data outside the system. 
const object_outside_system: CreateUserControllerInput = { Age: 11, Name: 'John', Lastname: 'Doe', Password: 'password' }

const emailer_adapter             = new GoogleEmailer();
const repository_adapter          = new UserRepositoryAdapter();
const createUserUseCase           = new CreateUserUseCase(repository_adapter, emailer_adapter);
const getUserUseCase              = new GetUserUseCase(repository_adapter)
const controller                  = new CreateUserController(createUserUseCase, getUserUseCase);

// Sample execution
controller.handle(object_outside_system);

// Export controller so GraphQL/RestAPI can use it.
export default controller; 
