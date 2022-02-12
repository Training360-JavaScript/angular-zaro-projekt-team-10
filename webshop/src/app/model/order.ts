export class Order {
  [key: string]: any;

  constructor(
    public id: number = 0,
    public customerID: number = 0,
    public status: 'new' | 'shipped' | 'paid' = 'new'
  ) {}
}

export class OrderStatus {
  static statuses: string[] = ['new', 'shipped', 'paid'];
}
