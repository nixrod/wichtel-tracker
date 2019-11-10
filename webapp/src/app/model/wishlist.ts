export class Wishlist {
  id: number;
  email: string;
  wishes: string;
  userId: number;
  partnerId: number;


  constructor(email: string, wishes: string, userId: number, partnerId: number) {
    this.email = email;
    this.wishes = wishes;
    this.userId = userId;
    this.partnerId = partnerId;
  }
}
