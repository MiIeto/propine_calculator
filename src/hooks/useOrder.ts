import { useState } from "react";
import type { MenuItem, OrderItem } from "../types";

export default function useOrder() {
	const [order, setOrder] = useState<OrderItem[]>([]);
	const [tip, setTip] = useState(0);

	const MAX_ITEMS = 10;
	const MIN_ITEMS = 1;

	const addItem = (item: MenuItem) => {
		const itemExists = order.find((orderItem) => orderItem.id === item.id);
		if (itemExists) {
			const updatedOrder = order.map((orderItem) =>
				orderItem.id === item.id && orderItem.quantity < MAX_ITEMS
					? { ...orderItem, quantity: orderItem.quantity + 1 }
					: orderItem
			);
			setOrder(updatedOrder);
		} else {
			const newItem = { ...item, quantity: 1 };
			setOrder([...order, newItem]);
		}
	};
	const removeItem = (id: MenuItem["id"]) => {
		const newOrder = order.filter((item) => item.id !== id);
		if (newOrder.length === 0) {
			setTip(0);
		}
		setOrder(order.filter((item) => item.id !== id));
	};
	const placeOrder = () => {
		setOrder([]);
		setTip(0);
	};

	function increaseQuantity(id: OrderItem["id"]) {
		const updatedOrder = order.map((item) => {
			if (item.id === id && item.quantity < MAX_ITEMS) {
				return {
					...item,
					quantity: item.quantity + 1,
				};
			}
			return item;
		});
		setOrder(updatedOrder);
	}

	const decreaseQuantiy = (id: OrderItem["id"]) => {
		const updatedOrder = order.map((orderItem) => {
			if(orderItem.id === id && orderItem.quantity > MIN_ITEMS){
				return {
					...orderItem,
					quantity: orderItem.quantity - 1,
				}
			}
			return orderItem;
		}).filter((orderItem) => orderItem.quantity !== 0);
		setOrder(updatedOrder);
	};
	return {
		order,
		tip,
		setTip,
		addItem,
		removeItem,
		placeOrder,
		increaseQuantity,
		decreaseQuantiy
	};
}
