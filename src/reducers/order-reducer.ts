import { MenuItem, OrderItem } from "../types";

export type OrderActions =
	| { type: "add-item"; payload: { item: MenuItem } }
	| { type: "remove-item"; payload: { id: MenuItem["id"] } }
	| { type: "place-order" }
	| { type: "add-tip"; payload: { value: number } }
	| { type: "increase-quantity"; payload: { id: MenuItem["id"] } }
	| { type: "decrease-quantity"; payload: { id: MenuItem["id"] } };

export type OrderState = {
	order: OrderItem[];
	tip: number;
};
export const initialState: OrderState = {
	order: [],
	tip: 0,
};

const MAX_ITEMS = 10;
const MIN_ITEMS = 1;

export const orderReducer = (
	state: OrderState = initialState,
	action: OrderActions
) => {
	switch (action.type) {
		case "add-item": {
			const itemExists = state.order.find(
				(orderItem) => orderItem.id === action.payload.item.id
			);
			let updatedOrder: OrderItem[] = [];
			if (itemExists) {
				updatedOrder = state.order.map((orderItem) =>
					orderItem.id === action.payload.item.id &&
					orderItem.quantity < MAX_ITEMS
						? { ...orderItem, quantity: orderItem.quantity + 1 }
						: orderItem
				);
			} else {
				const newItem: OrderItem = {
					...action.payload.item,
					quantity: 1,
				};
				updatedOrder = [...state.order, newItem];
			}
			return {
				...state,
				order: updatedOrder,
			};
		}

		case "remove-item": {
			const order = state.order.filter(
				(item) => item.id !== action.payload.id
			);
			if (order.length === 0) {
				state.tip = 0;
			}
			return {
				...state,
				order: order,
				tip: state.tip,
			};
		}

		case "place-order":
			return {
				...state,
				order: [],
				tip: 0,
			};
		case "add-tip": {
			const tip = action.payload.value;
			return {
				...state,
				tip,
			};
		}

		case "increase-quantity": {
			const updatedOrder = state.order.map((item) => {
				if (
					item.id === action.payload.id &&
					item.quantity < MAX_ITEMS
				) {
					return {
						...item,
						quantity: item.quantity + 1,
					};
				}
				return item;
			});

			return {
				...state,
				order: updatedOrder,
			};
		}

		case "decrease-quantity": {
			const updatedOrder = state.order
				.map((orderItem) => {
					if (
						orderItem.id === action.payload.id &&
						orderItem.quantity > MIN_ITEMS
					) {
						return {
							...orderItem,
							quantity: orderItem.quantity - 1,
						};
					}
					return orderItem;
				})
				.filter((orderItem) => orderItem.quantity !== 0);
			return {
				...state,
				order: updatedOrder,
			};
		}

		default:
			return state;
	}
};
