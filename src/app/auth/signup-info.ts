export class SignUpInfo {
  name: string;
  username: string;
  picture: string;
  role: string[];
  password: string;

  constructor(name: string, username: string, picture: string, password: string) {
    this.name = name;
    this.username = username;
    this.picture = picture;
    this.password = password;
    this.role = ['user'];
  }
}
