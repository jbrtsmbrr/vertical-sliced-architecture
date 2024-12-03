import { UserId } from "./common";
import { UseCaseResult } from "../../../use-cases/common";
import { CreateUserInput } from "./input";

export interface ICreateUserUseCase {
  execute(input: CreateUserInput): Promise<UseCaseResult<UserId | null>>;
}