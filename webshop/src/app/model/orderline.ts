export class Orderline {
  [key: string]: any;

  constructor(
    public id: number = 0,
    public orderID: number = 0,
    public productID: number = 0,
    public amount: number = 0
  ) {}
}
