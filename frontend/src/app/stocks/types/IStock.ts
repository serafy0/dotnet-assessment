export interface IStock {
  id: number;
  price: number;
  name: string;
  prices?: IPrices[];
}
export interface IPrices {
  id: number;
  value: number;
  stockID: number;
  createdAt: string;
}
