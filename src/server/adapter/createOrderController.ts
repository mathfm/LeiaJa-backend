import { OrderController } from "../controller/OrderController.js";
import { OrderRepository } from "../repositories/OrderRepository.js";
import { OrderService } from "../services/OrderService.js";

export function createOrderController() {
    const orderRepository = new OrderRepository();
    const orderService = new OrderService(orderRepository);
    return new OrderController(orderService);
}