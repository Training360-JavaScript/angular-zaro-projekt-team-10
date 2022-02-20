export class Address {
  [key: string]: any;

  constructor(
    public id: number = 0,
    public zip: number = 0,
    public country: string = '',
    public city: string = '',
    public street: string = '',
    public notes?: string,
  ) { }
}
