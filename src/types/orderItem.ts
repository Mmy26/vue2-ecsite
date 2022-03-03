/**
 * オーダーアイテムクラス.
 * @remarks
 * 注文商品情報を表します。
 */
import { orderTopping } from "./orderTopping";
import { Item } from "./item";
import { Topping } from "./topping2";

export class OrderItem {
  static item: any;
  constructor(
    // id
    private _id: number,
    // 商品ID
    private _itemId: number,
    // 注文ID
    private _orderId: number,
    // 数量
    private _quantity: number,
    // サイズ
    private _size: string,
    // 商品
    private _item: Item,
    // 注文トッピングリスト
    private _orderToppingList: Array<orderTopping>
  ) {}
  /**
   * 小計を計算する.
   * @returns 小計
   */
  public get calcSubTotalPrice(): number {
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
  /**
   * サイズごとに表示する値段を変える.
   * @returns 商品1個の値段
   */
  public get orderItemPrice(): number {
    let itemPrice = 0;
    if (this.size === "M") {
      itemPrice = this.item.priceM;
    } else if (this.size === "L") {
      itemPrice = this.item.priceL;
    }
    return itemPrice;
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
