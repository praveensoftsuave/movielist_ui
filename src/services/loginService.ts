import { BaseService } from ".";

type loginPaylaod = {
  email: string
  password: string
}

export class AuthService extends BaseService {

  public async login(payload: loginPaylaod): Promise<any> {
    try {
      const { data } = await this.httpClient.post("/login", payload);
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}
