import { currencyFormatter } from "../formatting"
const CartItem = ({name, price, quantity, onIncrement, onDecrement}) => {
  return (
    <li className="cart-item">
        <p>{name}-{quantity}x{currencyFormatter.format(price)}</p>
        <p className="cart-item-actions">
            <button onClick={onIncrement}>+</button>
            <span>{quantity}</span>
            <button onClick={onDecrement}>-</button>
        </p>
    </li>
  )
}

export default CartItem