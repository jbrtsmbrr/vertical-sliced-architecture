interface InitialUserParams {
  id?: string;
  name: string;
  lastname: string
  password?: string;
  age: number;
}

class User {
  private readonly id?: string;
  private readonly name: string;
  private readonly lastname: string;
  private readonly password?: string;
  private readonly age: number;

  private constructor(args: InitialUserParams) {
    this.id = args.id;
    this.name = args.name;
    this.lastname = args.lastname;
    this.password = args.password;
    this.age = args.age;
  }

  public static create(params: InitialUserParams) {

    return new User(params);
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getLastName() {
    return this.lastname;
  }

  public getPassword() {
    return this.password;
  }

  public getAge() {
    return this.age;
  }

  public validate() {
    // Let say we don't allow user under 18
    if (this.age < 18)
      return false;

    if (this.name.length <= 1)
      return false;

    return true;
  }
}


export default User