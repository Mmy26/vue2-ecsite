import { Topping } from "./topping";
import { OrderItem } from "./orderItem";
import { Item } from "./item";

export class orderTopping {
  constructor(
    private _id: number,
    private _toppingId: number,
    private _orderItemId: number,
    private _topping: Topping
  ) {}

  /**
   * サイズごとのトッピング価格を表示する.
   * @returns サイズごとのトッピング価格
   */
  public get toppingPrice(): number {
    //orderItemオブジェクトの生成
    const item = new OrderItem(
      0,
      0,
      0,
      0,
      "",
      new Item(0, "", "", "", 0, 0, "", true, []),
      []
    );
    let toppingPrice = 0;
    if (item.size === "M") {
      toppingPrice = this.topping.priceM;
    } else if (item.size === "L") {
      toppingPrice = this.topping.priceL;
    }
    return toppingPrice;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get toppingId(): number {
    return this._toppingId;
  }

  public set toppingId(toppingId: number) {
    this._toppingId = toppingId;
  }

  public get orderItemId(): number {
    return this._orderItemId;
  }

  public set orderItemId(orderItemId: number) {
    this._orderItemId = orderItemId;
  }

  public get topping(): Topping {
    return this._topping;
  }

  public set topping(topping: Topping) {
    this._topping = topping;
  }
}
