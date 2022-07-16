import {Users} from "./Users";
import {Service} from "./Service";
import {State} from "./State";
import {Machinery} from "./Machinery";

export interface Order {
  orderId: number;
  order_place: string;
  order_date: Date;
  users: Users;
  service: Service;
  state: State;
  machinery: Machinery;
}
