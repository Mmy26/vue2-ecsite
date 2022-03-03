/**
 * 注文時にサーバーに送るオブジェクトを表すドメインクラス.
 */
 export class OrderItemForm {
  constructor(
    //商品ID
    private _itemId: number,
    //商品の数量
    private _quantity: number,
    //商品のサイズ
    private _size: string
  ) {}

  public get itemId(): number {
    return this._itemId;
  }

  public set itemId(itemId: number) {
    this._itemId = itemId;
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
}
