import React, {useState} from 'react'

const DishItem = ({dishDetails, addItemToCart, removeItemFromCart}) => {
  const {
    dishId,
    dishName,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const [quantity, setQuantity] = useState(0)

  const onIncreaseQuantity = () => {
    setQuantity(quantity + 1)
    addItemToCart(dishId)
  }

  const onDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
      removeItemFromCart(dishId)
    }
  }

  return (
    <li className="dish-item">
      <div className="dish-details">
        <h2>{dishName}</h2>
        <p>{dishDescription}</p>
        <p>
          {dishCurrency} {dishPrice}
        </p>
        <p>{dishCalories}</p>
        {dishAvailability && (
          <div className="quantity-controller">
            <button onClick={onDecreaseQuantity}>-</button>
            <p>{quantity}</p>
            <button onClick={onIncreaseQuantity}>+</button>
          </div>
        )}
        {!dishAvailability && <p className="not-available">Not available</p>}
        {addonCat.length !== 0 && (
          <p className="customizations">Customizations available</p>
        )}
      </div>
      <div className="dish-image">
        <img src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}

export default DishItem
