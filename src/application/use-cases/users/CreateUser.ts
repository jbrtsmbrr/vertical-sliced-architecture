import User from "../../../domain/entities/user";
import IUserRepositoryPort from "../../ports/repositories/IUserRepository";
import { IEmailerPort } from "../../ports/services/IEmailer";
import { ICreateUserUseCase } from "./interfaces/ICreateUserUseCase";
import { UseCaseResult } from "../common";
import { UserId } from "./interfaces/common";
import { CreateUserInput } from "./interfaces/input";



class CreateUserUseCase implements ICreateUserUseCase {
  private readonly repository: IUserRepositoryPort;
  private readonly emailer: IEmailerPort;
  // private user: User;

  constructor(repository: IUserRepositoryPort, emailer: IEmailerPort) {
    this.repository = repository;
    this.emailer = emailer;
  }

  public async execute(user_input: CreateUserInput): Promise<UseCaseResult<UserId | null>> {

    const user = User.create({
      name: user_input.name,
      lastname: user_input.lastname,
      password: user_input.password,
      age: user_input.age,
    });

    const is_valid = user.validate();

    if (!is_valid)
      return { result: null, errors: [{ message: "Unable to save data!" }] };

    const inserted_id = await this.repository.create({
      name: user.getName(),
      lastname: user.getLastName(),
      password: user.getLastName(),
      age: user.getAge()
    })

    this.emailer.send();

    return { result: inserted_id, errors: [] };
  }
}

export default CreateUserUseCase;