import User from '../../src/users/user.entity'

class UserEnvironment {

  public CurrentUser: User

  private userCount=0

  public async SetUp() {
    this.CurrentUser=this.AddUser()
  }

  public AddUser(
    email: string=undefined,
    login: string=undefined,
    name: string=undefined,
    password: string=undefined) {
    this.userCount++
    return {
      id: this.userCount,
      email: email??'john@snow.com',
      login: login??'john89',
      name: name??'John',
      password: password??'YouDontNothing'

      //todo сделать тут еще и добавление в базу
    }
  }
}

export default new UserEnvironment
