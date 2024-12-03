import IUserRepositoryPort from "../../src/application/ports/repositories/IUserRepository";
import { UserId } from "../../src/application/use-cases/users/interfaces/common";
import { CreateUserInput } from "../../src/application/use-cases/users/interfaces/input";
import { UserOutput } from "../../src/application/use-cases/users/interfaces/output";


export class MockUserRepository implements IUserRepositoryPort {
  private current_id: number = 0;
  private readonly users: Map<UserId, UserOutput> = new Map();

  create(user: CreateUserInput): Promise<UserId> {
    const inserted_id = (this.current_id + 1).toString();

    this.users.set(inserted_id, {
      id: inserted_id,
      age: user.age,
      name: user.name,
      lastname: user.lastname
    })

    this.current_id += 1;

    return Promise.resolve(inserted_id)
  }

  retrieve(id: UserId): Promise<UserOutput | null> {
    const retrieved_user = this.users.get(id);

    if (!retrieved_user) return Promise.resolve(null);

    return Promise.resolve(retrieved_user);
  }
}