export class User {
  user: string;
  role: number;
  // tslint:disable-next-line:variable-name
  access_token: string;
  data: Data;
  success: boolean;
}

export class Data {
  // tslint:disable-next-line:variable-name
  access_token: string;
  email: string;
  // tslint:disable-next-line:variable-name
  confirmation_token: string;
}

export class UserInfo {
  name: string;
  password: string;
  email: string;
  mobile: string;
 }
