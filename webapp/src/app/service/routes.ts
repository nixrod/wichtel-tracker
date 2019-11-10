import {environment} from "../../environments/environment";

export class Routes {
  private static base = 'http://' + environment.host + ':' + environment.port + '/api';
  static users = Routes.base + '/users';
  static wishlists = Routes.base + '/wishlists';
}
