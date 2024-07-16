import { useContext } from "react";
import { currencyFormatter } from "../formatting";
import useHttp from "../hooks/useHttp";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Error from "./Error";
import { Button } from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    console.log("form is submitted");
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); //ex: {email: test@gmail.com}

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
    // the below code is used before created the useHttp hook.
    // fetch("http://localhost:3000/orders",{
    //   method:'POST',
    //   headers:{
    //     'Content-Type':'application/json'
    //   },
    //   body:JSON.stringify({
    //     order:{
    //       items:cartCtx.items,
    //       customer:customerData
    //     }
    //   })
    // })
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if(isSending){
    actions = <p>sending order data...</p>
  }

  if(data && !error){
    return <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleFinish}
    >
      <h2>Successful</h2>
      <p>Placed your order Successfully</p>
      <p>we will get back to you with more details by contacting in email.</p>
      <Button onClick={handleFinish}>Okay</Button>
    </Modal>
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>total Amount : {currencyFormatter.format(cartTotal)}</p>
        <Input
          label="Full Name"
          type="text"
          id="name"
          placeholder="Enter your name"
        />
        <Input
          label="E-Mail"
          type="email"
          id="email"
          placeholder="Enter your mail"
        />
        <Input
          label="Street"
          type="text"
          id="street"
          placeholder="Enter your street"
        />
        <div className="control-row">
          <Input
            label="Postel Code"
            type="text"
            id="postal-code"
            placeholder="Enter your postel no"
          />
          <Input
            label="City"
            type="text"
            id="city"
            placeholder="Enter your city"
          />
        </div>
        {error && <Error title="order not submitted" message="failed to chekout your orders"/>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
