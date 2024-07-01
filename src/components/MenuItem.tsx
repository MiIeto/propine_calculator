import type { MenuItem, OrderItem } from "../types";

type MenuItemProps = {
	item: MenuItem;
	addItem: (item: MenuItem) => void;
	order: OrderItem[];
};
export default function MenuItem({ item, addItem, order }: MenuItemProps) {
	const inCart = order.some((orderItem) => orderItem.id === item.id);

	return (
		<button
			className={`border-2 border-slate-400 hover:bg-slate-300 w-full p-3 flex justify-between rounded-md ${
				inCart ? "bg-slate-200" : ""
			}`}
			onClick={() => addItem(item)}
		>
			<p>{item.name}</p>
			<p className="font-black">${item.price}</p>
		</button>
	);
}
