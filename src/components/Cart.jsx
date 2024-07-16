import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../formatting";
import { Button } from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  //   console.log(cartTotal);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleOpenCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart"? handleCloseCart:null}
    >
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrement={() => cartCtx.addItem(item)}
            onDecrement={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {cartCtx.items.length !== 0 && (
          <Button onClick={handleOpenCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
