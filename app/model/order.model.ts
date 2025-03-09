import { Client } from "./client.model";
import { OrderItem } from "./order-item.model";

export interface Order {
    id:              number;
    products:        OrderItem[];
    total:           number;
    discountedTotal: number;
    userId:          number;
    totalProducts:   number;
    totalQuantity:   number;
    client?:        Client;
}