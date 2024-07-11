import { Dispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";

type QuantityUpDownProps = {
	itemQuantity: number;
	dispatch: Dispatch<OrderActions>;
	itemId: number
};

export default function QuantityUpDown({
	itemQuantity,
	dispatch,
	itemId,
}: QuantityUpDownProps) {
	return (
		<>
			<div className="flex flex-row items-center border">
				<button
					className="h-6 w-3 border-r"
					onClick={() => dispatch({type: "decrease-quantity", payload: {id: itemId}})}
				>
					-
				</button>
				<p className="w-5 flex justify-center">{itemQuantity}</p>
				<button
					className="h-6 w-3 border-l"
					onClick={() => dispatch({type: "increase-quantity", payload: {id: itemId}})}
				>
					+
				</button>
			</div>{" "}
		</>
	);
}
