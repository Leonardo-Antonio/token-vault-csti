export interface IResponse {
  success: boolean;
  message: string;
  itemFound: boolean;
  reqId: string;
  item: any | null;
}
