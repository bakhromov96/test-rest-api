import { Client } from "pg";

class UserRepository {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getUser(id: string) {
    const result = await this.client.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    return result.rows[0];
  }

  async deductBalance(id: string, amount: number) {
    await this.client.query(
      "UPDATE users SET balance = balance - $1 WHERE id = $2",
      [amount, id]
    );

    return this.getUser(id);
  }
}

export default UserRepository;
