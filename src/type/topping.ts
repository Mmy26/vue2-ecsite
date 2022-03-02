import { OrderItem } from "./orderItem";
import { Item } from "./item";
/**
 * トッピングクラス.
 * @remarks
 * トッピング一覧情報を表します。
 */
export class Topping {
  constructor(
    private _id: number,
    private _type: string,
    private _name: string,
    private _priceM: number,
    private _priceL: number
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
        toppingPrice = this.priceM;
      } else if (item.size === "L") {
        toppingPrice = this.priceL;
      }
      return toppingPrice;
    }
  

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get type(): string {
    return this._type;
  }

  public set type(type: string) {
    this._type = type;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get priceM(): number {
    return this._priceM;
  }

  public set priceM(priceM: number) {
    this._priceM = priceM;
  }

  public get priceL(): number {
    return this._priceL;
  }

  public set priceL(priceL: number) {
    this._priceL = priceL;
  }
}
