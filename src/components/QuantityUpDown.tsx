import { OrderItem } from "../types";

type QuantityUpDownProps = {
	itemQuantity: number;
	increaseQuantity: (id: OrderItem["id"]) => void;
	decreaseQuantiy: (id: OrderItem["id"]) => void;
	itemId: number
};

export default function QuantityUpDown({
	itemQuantity,
	increaseQuantity,
	decreaseQuantiy,
	itemId,
}: QuantityUpDownProps) {
	return (
		<>
			<div className="flex flex-row items-center border">
				<button
					className="h-6 w-3 border-r"
					onClick={() => decreaseQuantiy(itemId)}
				>
					-
				</button>
				<p className="w-5 flex justify-center">{itemQuantity}</p>
				<button
					className="h-6 w-3 border-l"
					onClick={() => increaseQuantity(itemId)}
				>
					+
				</button>
			</div>{" "}
		</>
	);
}
