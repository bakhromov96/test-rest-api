import UserRepository from "../db/user";
import { Client } from "pg";

class UserService {
  private userRepository: UserRepository;

  constructor(client: Client) {
    this.userRepository = new UserRepository(client);
  }

  async getUser(id: string) {
    return this.userRepository.getUser(id);
  }

  async deductBalance(id: string, amount: number) {
    return this.userRepository.deductBalance(id, amount);
  }
}

export default UserService;
