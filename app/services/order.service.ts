import axios from "axios";
import { Order } from "../model/order.model";
import { Client } from "../model/client.model";
import { getClient } from "./client.service";

export async function getOrders(page: number, limit: number): Promise<Order[]> {
    console.log("getOrders");
    const response = await axios.get(`https://dummyjson.com/carts?limit=${limit}&skip=${(page - 1) * limit}`);
    const orders: Order[] = (response.data as { carts: Order[] }).carts;
    /*
    // iterate over orders and add a new property to each order
    for (const order of orders) {
        const client: Client = await getClient(order.userId);
        console.log(client);
        order.client = { ...client };
        console.log(order);
        
    }
    */
    return orders;
}

export async function getOrdersByClientId(page: number, limit: number, clientId: number): Promise<Order[]> {
    console.log("getOrdersByClientId " + clientId);
    const response = await axios.get(`https://dummyjson.com/carts/user/${clientId}?limit=${limit}&skip=${(page - 1) * limit}`);
    const orders: Order[] = (response.data as { carts: Order[] }).carts;
    /*
    // iterate over orders and add a new property to each order
    for (const order of orders) {
        const client: Client = await getClient(order.userId);
        console.log(client);
        order.client = { ...client };
        console.log(order);
        
    }
    */
    return orders;
}


export async function getOrder(id: number): Promise<Order> {
    console.log("getOrder " + id);
    const response = await axios.get(`https://dummyjson.com/carts/${id}`);
    const order: Order = response.data as Order;
    console.log(order);

    // busco el cliente
    const client: Client = await getClient(order.userId);
    console.log(client);
    order.client = { ...client };
    console.log(order);
    return order;
}