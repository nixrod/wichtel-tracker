export class Wishlist {
  id: number;
  email: string;
  wishes: string;
  address: string;


  constructor(email: string, wishes: string, address: string) {
    this.email = email;
    this.wishes = wishes;
    this.address = address;
  }
}
