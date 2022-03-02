import { Item } from "./item";
/**
 * 注文履歴を表示させるための情報を格納するドメインクラス.
 */
export class orderHistoryInfo {
  constructor(
    //ログインしているユーザーのID
    private _userId: number,
    //注文日
    private _orderDate: Date,
    //お届け先住所
    private _destinationAddress: string,
    //配達日時
    private _deliveryTime: Date,
    //注文した商品
    private _orderItemList: Array<Item>
  ) {}
  public get userId(): number {
    return this._userId;
  }

  public set userId(userId: number) {
    this._userId = userId;
  }

  public get orderDate(): Date {
    return this._orderDate;
  }

  public set orderDate(orderDate: Date) {
    this._orderDate = orderDate;
  }

  public get destinationAddress(): string {
    return this._destinationAddress;
  }

  public set destinationAddress(destinationAddress: string) {
    this._destinationAddress = destinationAddress;
  }

  public get deliveryTime(): Date {
    return this._deliveryTime;
  }

  public set deliveryTime(deliveryTime: Date) {
    this._deliveryTime = deliveryTime;
  }

  public get orderItemList(): Array<Item> {
    return this._orderItemList;
  }

  public set orderItemList(orderItemList: Array<Item>) {
    this._orderItemList = orderItemList;
  }
}
