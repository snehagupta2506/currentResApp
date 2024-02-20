import React, {useState, useEffect} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [cartItems, setCartItems] = useState([])

  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
        quantity: 0, // Add quantity property initialized to 0
      })),
    }))

  useEffect(() => {
    const fetchRestaurantApi = async () => {
      try {
        const api =
          'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
        const apiResponse = await fetch(api)
        const data = await apiResponse.json()
        const updatedData = getUpdatedData(data[0].table_menu_list)
        setResponse(updatedData)
        setActiveCategoryId(updatedData[0].menuCategoryId)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching restaurant data:', error)
      }
    }

    fetchRestaurantApi()
  }, [])

  const addItemToCart = dishId => {
    const existingCartItemIndex = cartItems.findIndex(
      item => item.dishId === dishId,
    )
    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems]
      updatedCartItems[existingCartItemIndex].quantity++
      setCartItems(updatedCartItems)
    } else {
      setCartItems(prev => [...prev, {dishId, quantity: 1}])
    }
  }

  const removeItemFromCart = dishId => {
    const existingCartItemIndex = cartItems.findIndex(
      item => item.dishId === dishId,
    )
    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems]
      updatedCartItems[existingCartItemIndex].quantity--
      if (updatedCartItems[existingCartItemIndex].quantity === 0) {
        updatedCartItems.splice(existingCartItemIndex, 1)
      }
      setCartItems(updatedCartItems)
    }
  }

  const getTotalCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const renderTabs = () => {
    return response.map(category => (
      <li
        key={category.menuCategoryId}
        className={`each-tab-item ${
          category.menuCategoryId === activeCategoryId ? 'active-tab-item' : ''
        }`}
        onClick={() => setActiveCategoryId(category.menuCategoryId)}
      >
        <button type="button">{category.menuCategory}</button>
      </li>
    ))
  }

  return (
    <div className="home-background">
      <Header cartItems={cartItems} totalCartCount={getTotalCartCount()} />
      <ul className="m-8 ps-0 d-flex tab-container">{renderTabs()}</ul>
      <ul className="m-0 d-flex flex-column dishes-list-container">
        {response
          .find(category => category.menuCategoryId === activeCategoryId)
          ?.categoryDishes.map(dish => (
            <DishItem
              key={dish.dishId}
              dishDetails={dish}
              cartItems={cartItems}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart}
            />
          ))}
      </ul>
    </div>
  )
}

export default Home
