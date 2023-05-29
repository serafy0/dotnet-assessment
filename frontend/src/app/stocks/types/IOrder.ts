import { IStock } from './IStock';

export interface IOrder {
  id: number;
  stockName: string;
  price: number;
  quantity: number;
  buyer: string;
  stock: IStock;
}
