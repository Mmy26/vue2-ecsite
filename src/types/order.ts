import { User } from "./user";
import { OrderItem } from "./orderItem";
/**
 *注文を表すドメインクラス.
 */
export class Order {
  constructor(
    //orderID
    private _id: number,
    //ユーザーID
    private _userId: number,
    //入金状況
    private _status: number,
    //合計金額
    private _totalPrice: number,
    //注文日
    private _orderDate: Date,
    //宛先氏名
    private _destinationName: string,
    //宛先Eメールアドレス
    private _destinationEmail: string,
    //宛先郵便番号
    private _destinationZipcode: string,
    //宛先住所
    private _destinationAddress: string,
    //宛先電話番号
    private _destinationTel: string,
    //配達日時
    private _deliveryTime: Date,
    //支払い方法
    private _paymentMethod: number,
    //ユーザー
    private _user: User,
    //注文商品リスト
    private _orderItemList: Array<OrderItem>
  ) {}
  /**
   * 注文商品の小計の合計金額を計算する.
   * @returns 注文商品の小計の合計金額
   */
  public get itemListSubTotalPrice(): number {
    //注文した商品の配列の小計の合計に0.1をかける
    let itemListTotalPrice = 0;
    for (const orderItem of this.orderItemList) {
      itemListTotalPrice += orderItem.calcSubTotalPrice;
    }
    return itemListTotalPrice;
  } 
  /**
   * 消費税を計算する.
   * @returns 消費税
   */
  public get tax(): number {
    const taxPrice = this.itemListSubTotalPrice * 0.1;
    // 小数点を切り捨てる
    return Math.floor(taxPrice);
  }
  /**
   * 合計金額を計算する.
   * @returns 合計金額
   */
  public get calcTotalPrice(): number {
    const totalPrice = this.itemListSubTotalPrice + this.tax;
    return totalPrice;
  }
  /** 注文をする際に利用するフォームリストを作成するgetter.
   * @returns オーダー表の配列
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get makeOrderFormList(): any{
    const newArray = [];
    for (const orderItem of this.orderItemList) {
      newArray.push({
        itemId: orderItem.itemId,
        quantity: orderItem.quantity,
        size: orderItem.size
      });
    }
    return newArray;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get userId(): number {
    return this._userId;
  }

  public set userId(userId: number) {
    this._userId = userId;
  }

  public get status(): number {
    return this._status;
  }

  public set status(status: number) {
    this._status = status;
  }

  public get totalPrice(): number {
    return this._totalPrice;
  }

  public set totalPrice(totalPrice: number) {
    this._totalPrice = totalPrice;
  }

  public get orderDate(): Date {
    return this._orderDate;
  }

  public set orderDate(orderDate: Date) {
    this._orderDate = orderDate;
  }

  public get destinationName(): string {
    return this._destinationName;
  }

  public set destinationName(destinationName: string) {
    this._destinationName = destinationName;
  }

  public get destinationEmail(): string {
    return this._destinationEmail;
  }

  public set destinationEmail(destinationEmail: string) {
    this._destinationEmail = destinationEmail;
  }

  public get destinationZipcode(): string {
    return this._destinationZipcode;
  }

  public set destinationZipcode(destinationZipcode: string) {
    this._destinationZipcode = destinationZipcode;
  }

  public get destinationAddress(): string {
    return this._destinationAddress;
  }

  public set destinationAddress(destinationAddress: string) {
    this._destinationAddress = destinationAddress;
  }

  public get destinationTel(): string {
    return this._destinationTel;
  }

  public set destinationTel(destinationTel: string) {
    this._destinationTel = destinationTel;
  }

  public get deliveryTime(): Date {
    return this._deliveryTime;
  }

  public set deliveryTime(deliveryTime: Date) {
    this._deliveryTime = deliveryTime;
  }

  public get paymentMethod(): number {
    return this._paymentMethod;
  }

  public set paymentMethod(paymentMethod: number) {
    this._paymentMethod = paymentMethod;
  }

  public get user(): User {
    return this._user;
  }

  public set user(user: User) {
    this._user = user;
  }

  public get orderItemList(): Array<OrderItem> {
    return this._orderItemList;
  }

  public set orderItemList(orderItemList: Array<OrderItem>) {
    this._orderItemList = orderItemList;
  }
}
