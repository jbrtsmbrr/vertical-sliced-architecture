

//.......
// TODO : Construct an interface for `error results` that datasource can 
//......: follow if ever concrete implementation fails to produce the `UserId`.
//      :
//      : Example dependency flow: 
//      : UseCase -> IUseCase (use case interface) <- IDataSource (I.create(): UserId | InsertErrorMessage | Null) <- DataSourceAdapter
//      :
//......:
// DONE : Implemented by returning `null`. This `null` value can use by use cases to 
//......: indicate that something wrong happened when saving/retrieving data.

import { UserId } from "../../use-cases/users/interfaces/common";
import { CreateUserInput } from "../../use-cases/users/interfaces/input";
import { UserOutput } from "../../use-cases/users/interfaces/output";

interface IUserRepositoryPort {
  create(user: CreateUserInput): Promise<UserId | null>
  retrieve(id: UserId): Promise<UserOutput | null>
}

export default IUserRepositoryPort;