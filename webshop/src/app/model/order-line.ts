export class OrderLine {
  [key: string]: any;

  constructor(
    public id: number = 0,
    public orderID: number = 0,
    public productID: number = 0,
    public amount: number = 0,
  ) {}
}

export class OrderLineDisplay {
  [key: string]: any;

  constructor(
    public id: number = 0,
    public orderID: number = 0,
    public productID: number = 0,
    public product: string = '',
    public amount: number = 0,
    public unitPrice: number = 0,
    public price: number = 0,
  ) {}
}