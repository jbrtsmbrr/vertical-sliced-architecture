import { UserId } from "./common";
import { UserOutput } from "./output";

export interface IGetUserUseCase {
  execute(id: UserId): Promise<UserOutput | null>
}