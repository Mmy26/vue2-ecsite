import { orderTopping } from "./OrderTopping";
import { Item } from "./Item";

export class OrderItem {
  constructor(
    private _id: number,
    private _orderId: number,
    private _quantity: number,
    private _size: string,
    private _item: Item,
    private _orderToppingList: Array<orderTopping>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get orderId(): number {
    return this._orderId;
  }

  public set orderId(orderId: number) {
    this._orderId = orderId;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(quantity: number) {
    this._quantity = quantity;
  }

  public get size(): string {
    return this._size;
  }

  public set size(size: string) {
    this._size = size;
  }

  public get item(): Item {
    return this._item;
  }

  public set item(item: Item) {
    this._item = item;
  }

  public get orderToppingList(): Array<orderTopping> {
    return this._orderToppingList;
  }

  public set orderToppingList(orderToppingList: Array<orderTopping>) {
    this._orderToppingList = orderToppingList;
  }
}
