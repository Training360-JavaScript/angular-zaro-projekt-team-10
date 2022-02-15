export class Product {
  [key: string]: any;

  constructor(
    public id: number = 0,
    public name: string = '',
    public description: string = '',
    public catID: number = 0,
    public type: string = '',
    public price: number = 0,
    public featured: boolean = false,
    public active: boolean = true
  ) {}
}
