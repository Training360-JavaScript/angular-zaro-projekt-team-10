export class Bill {
  [key: string]: any;

  constructor(
    public id: number = 0,
    public orderID: number = 0,
    public amount: number = 0,
    public status: 'new' | 'paid' = 'new',
  ) {}
}

export class BillStatus {
  static statuses: string[] = ['new', 'paid'];
}
