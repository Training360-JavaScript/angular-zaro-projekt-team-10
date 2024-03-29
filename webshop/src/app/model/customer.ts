export class Customer {
  [key: string]: any;

  constructor(
    public id: number = 0,
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public addressID: number = 0,
    public active: boolean = false,
  ) {}
}

export class CustomerDisplay {
  [key: string]: any;

  constructor(
    public id: number = 0,
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public addressID: number = 0,
    public address: string = '',
    public active: boolean = false,
  ) {}
}
