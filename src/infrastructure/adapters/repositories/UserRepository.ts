import IUserRepositoryPort from "../../../application/ports/repositories/IUserRepository";
import { UserId } from "../../../application/use-cases/users/interfaces/common";
import { CreateUserInput } from "../../../application/use-cases/users/interfaces/input";
import { UserOutput } from "../../../application/use-cases/users/interfaces/output";


interface UserRawData {
  firstName: string;
  lastName: string;
  age: number;
  pass: string;
}

// MySQL
export class UserRepositoryAdapter implements IUserRepositoryPort {
  create(input: CreateUserInput): Promise<UserId | null> {
    const db_data: UserRawData = {
      firstName: input.name,
      lastName: input.lastname,
      age: input.age,
      pass: input.password
    }

    // Insert using `db_data` variable
    // mysql.query(`insert into ?...`, [db_data])

    return Promise.resolve("$re1asdfh")
  }

  retrieve(id: UserId): Promise<UserOutput | null> {
    return Promise.resolve({
      id: '12345',
      name: 'John',
      lastname: 'Doe',
      age: 23
    })
  }
}

// When using other data source
export class MongoRepositoryAdapter implements IUserRepositoryPort {

  create() {
    // Mongo way of creating...
    return Promise.resolve("$re1asdfh")
  }

  retrieve(id: UserId): Promise<UserOutput | null> {
    // Mongo way of getting user data
    return Promise.resolve({
      id: '12345',
      name: 'Mongo',
      lastname: 'DB',
      age: 21
    })
  }
}