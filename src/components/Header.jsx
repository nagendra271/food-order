import { useContext } from 'react'
import logoImage from '../assets/logo.jpg'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'
import { Button } from './UI/Button'

const Header = () => {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext)

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
    return totalNumberOfItems + item.quantity;
  },0)

  function handleShowCart (){
    userProgressCtx.showCart()
  }

  return (
    <header id='main-header'>
        <div id='title'>
            <img src={logoImage} alt="the header logo" />
            <h1>Delisious food</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
        </nav>
    </header>
  )
}

export default Header