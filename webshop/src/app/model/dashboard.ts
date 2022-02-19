import { Bill } from "./bill";
import { Customer } from "./customer";
import { OrderDisplay } from "./order";
import { Product, ProductDisplay } from "./product";

export class ActiveCustomers {
  [key: string]: any;

  constructor(
    public count: number = 0,
    public random5: Customer[] = [],
  ) {}
}

export class ActiveProducts {
  [key: string]: any;

  constructor(
    public count: number = 0,
    public random5: ProductDisplay[] = [],
  ) {}
}

export class NewOrders {
  [key: string]: any;

  constructor(
    public count: number = 0,
    public top5: OrderDisplay[] = [],
  ) {}
}

export class ShippedOrders {
  [key: string]: any;

  constructor(
    public count: number = 0,
    public top5: OrderDisplay[] = [],
  ) {}
}

export class NotPayedBills {
  [key: string]: any;

  constructor(
    public count: number = 0,
    public amount: number = 0,
    public top5: Bill[] = [],
  ) {}
}
