import { Dispatch } from "react";
import type { MenuItem, OrderItem } from "../types";
import { OrderActions } from "../reducers/order-reducer";

type MenuItemProps = {
	item: MenuItem;
	dispatch: Dispatch<OrderActions>;
	order: OrderItem[];
};
export default function MenuItem({ item, dispatch, order }: MenuItemProps) {
	const inCart = order.some((orderItem) => orderItem.id === item.id);

	return (
		<button
			className={`border-2 border-slate-400 hover:bg-slate-300 w-full p-3 flex justify-between rounded-md ${
				inCart ? "bg-slate-200" : ""
			}`}
			onClick={() => dispatch({ type: "add-item", payload: { item } })}
		>
			<p>{item.name}</p>
			<p className="font-black">${item.price}</p>
		</button>
	);
}
