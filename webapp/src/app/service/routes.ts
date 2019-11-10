import {environment} from "../../environments/environment";

export class Routes {
  private static base = 'http://localhost:' + environment.port + '/api';
  static users = Routes.base + '/users';
  static wishlists = Routes.base + '/wishlists';
}
