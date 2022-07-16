export class JwtResponse {
  token: string;
  type: string;
  nickname: string;
  picture: string;
  roles: string[];

  constructor(token: string,picture: string, type: string, nickname: string) {
    this.token = token;
    this.type = type;
    this.nickname = nickname;
    this.picture = picture;
    this.roles = ['user'];
  }
}
