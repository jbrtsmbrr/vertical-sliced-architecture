import IUserRepositoryPort from "../../ports/repositories/IUserRepository";
import { UserId } from "./interfaces/common";
import { IGetUserUseCase } from "./interfaces/IGetUserUseCase";
import { UserOutput } from "./interfaces/output";


export class GetUserUseCase implements IGetUserUseCase {
  constructor(private readonly repository: IUserRepositoryPort) {}

  public async execute(id: UserId): Promise<UserOutput | null> {
      const user = await this.repository.retrieve(id)
      return user;
  }
}