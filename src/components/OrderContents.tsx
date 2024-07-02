import { formatCurrency } from "../helpers";
import { MenuItem, OrderItem } from "../types";
import QuantityUpDown from "./QuantityUpDown";

type OrderContentsProps = {
	order: OrderItem[];
	removeItem: (id: MenuItem["id"]) => void;
	increaseQuantity: (id: OrderItem["id"]) => void;
	decreaseQuantiy: (id: OrderItem["id"]) => void;
};

export default function OrderContents({
	order,
	removeItem,
	increaseQuantity,
	decreaseQuantiy,
}: OrderContentsProps) {
	return (
		<div>
			<h2 className="font-black text-4xl">Consumo</h2>
			<div className="space-y-3 mt-5">
				{order.map((item) => (
					<div
						key={item.id}
						className="flex justify-between border-t items-center border-gray-200 py-5 last-of-type:border-b"
					>
						<div>
							<p className="text-lg">
								{item.name} - {formatCurrency(item.price)}
							</p>
							<p className="font-black flex gap-2">
								Cantidad:{" "}
								<QuantityUpDown itemQuantity={item.quantity} itemId={item.id} increaseQuantity={increaseQuantity} decreaseQuantiy={decreaseQuantiy}/>
								{formatCurrency(item.price * item.quantity)}
							</p>
						</div>

						<button
							className="bg-red-700 h-8 w-8 rounded-full text-white font-black"
							onClick={() => removeItem(item.id)}
						>
							X
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
