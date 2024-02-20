import React from 'react'

const Header = ({cartItems}) => {
  const getCartItemsCount = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header>
      <h1>UNI Resto Cafe</h1>
      <div>
        <p>My Orders</p>
        <p className="cart-count">{getCartItemsCount()}</p>
      </div>
    </header>
  )
}

export default Header
