import { useState, useEffect } from 'react'
import Card from './components/Card'
import empty_cart_img from './assets/images/illustration-empty-cart.svg'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])

  function fetch_data() {
    fetch('/data.json')
      .then(received_data => received_data.json())
      .then(received_data => setData(received_data))
  }

  useEffect(() => {
    fetch_data()
  }, [])

  function add_item(product) {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.name === product.name)

      if (existing) {
        return prevCart.map(item => 
          item.name === product.name
            ? { 
                ...item, 
                quantity: item.quantity + 1,
                total_cost: (item.quantity + 1) * item.default_cost
              }
            : item
        )
      } else {
        return [...prevCart, {
          name: product.name,
          quantity: 1,
          default_cost: product.price,
          total_cost: product.price
        }]
      }
    })
  }

  function increase_quantity(productName) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.name === productName
          ? { 
              ...item, 
              quantity: item.quantity + 1,
              total_cost: (item.quantity + 1) * item.default_cost 
            }
          : item
      )
    )
  }

  function decrease_quantity(productName) {
    setCart(prevCart => 
      prevCart
        .map(item => 
          item.name === productName
            ? { 
                ...item, 
                quantity: item.quantity - 1,
                total_cost: (item.quantity - 1) * item.default_cost 
              }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  function get_quantity(productName) {
    const item = cart.find(p => p.name === productName)
    return item ? item.quantity : 0
  }

  return (
    <main>
      <section className='foods_content'>
        <h1>Desserts</h1>
        <section className='content'>
          {data.map((card, index) => (
            <Card
              key={index}
              name={card.name}
              category={card.category}
              img={card.image['desktop']}
              price={card.price}
              quantity={get_quantity(card.name)}
              add_to_cart={() => add_item(card)}
              increase={() => increase_quantity(card.name)}
              decrease={() => decrease_quantity(card.name)}
            />
          ))}
        </section>
      </section>

      <aside>
        <h2>Your Cart ({cart.length})</h2>
        {cart.length === 0 ? (
          <div className="cart_content_empty">
            <img src={empty_cart_img} alt="Empty Cart" />
            <p>Your added items will appear here</p>
          </div>
        ) : (
          <div className="cart_content">
            {cart.map((product, index) => (
              <div className="product" key={index}>
                <p>{product.name}</p>
                <p>{product.quantity}x</p>
                <p>${product.default_cost}</p>
                <p>${product.total_cost}</p>
              </div>
            ))}
          </div>
        )}
      </aside>
    </main>
  )
}

export default App