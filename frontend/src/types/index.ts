export interface IData {
  _id?: string;
  name: string;
  email: string;
  friend?: IData;
}
