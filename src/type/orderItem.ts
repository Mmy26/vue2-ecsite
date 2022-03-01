import { orderTopping } from "./orderTopping";
import { Item } from "./item";
import { Topping } from "./topping";

export class OrderItem {
  constructor(
    private _id: number,
    private _itemId: number,
    private _orderId: number,
    private _quantity: number,
    private _size: string,
    private _item: Item,
    private _orderToppingList: Array<orderTopping>
  ) {}
  /**
   * 小計を計算する.
   * @returns 小計
   */
  public getCalcSubTotalPrice(): number {
    let subTotalPrice = 0;
    //トッピングオブジェクトを生成
    const topping = new Topping(0, "", "", 0, 0);
    if (this.size === "M") {
      //トッピングの合計金額
      const toppingSubTotalM = this.orderToppingList.length * topping.priceM;
      //Mサイズの場合の小計
      subTotalPrice = (this.item.priceM + toppingSubTotalM) * this.quantity;
    } else if (this.size === "L") {
      //トッピングの合計金額
      const toppingSubTotalL = this.orderToppingList.length * topping.priceL;
      //Lサイズの場合の小計
      subTotalPrice = (this.item.priceL + toppingSubTotalL) * this.quantity;
    }
    return subTotalPrice;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get itemId(): number {
    return this._itemId;
  }

  public set itemId(itemId: number) {
    this._itemId = itemId;
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
