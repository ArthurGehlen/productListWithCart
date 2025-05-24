import { useState, useEffect } from 'react'
import Card from './components/Card'
import './App.css'
import empty_cart_img from '/images/illustration-empty-cart.svg'
import carbon_neutral from '/images/icon-carbon-neutral.svg'

function App() {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])
  const [orderTotal, setOrderTotal] = useState(0)

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

  function increase_quantity(product_name) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.name === product_name
          ? {
            ...item,
            quantity: item.quantity + 1,
            total_cost: (item.quantity + 1) * item.default_cost
          }
          : item
      )
    )
  }

  function decrease_quantity(product_name) {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.name === product_name
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

  function get_quantity(product_name) {
    const item = cart.find(p => p.name === product_name)
    return item ? item.quantity : 0
  }

  function format_float_numbers(number) {
    return number % 1 === 0 ? `${number}.00` : `${number}0`
  }

  function remove_product(product) {

  }

  function get_total_cost() {

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
              img={card.image.desktop}
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
                <div className="info">
                  <p className='name'>{product.name}</p>

                  <div className="specifies">
                    <p className='quantity'>{product.quantity}x</p>
                    <p className='default_cost'>
                      <span>@</span>
                      ${format_float_numbers(product.default_cost)}
                    </p>
                    <p className='total_cost'>${format_float_numbers(product.total_cost)}</p>
                  </div>
                </div>

                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                </button>
              </div>
            ))}
            <div className="order_total">
              <span>Order Total</span>
              <h1>${orderTotal}</h1>
            </div>
            <div className="carbon_neutral">
              <img src={carbon_neutral} alt="Carbon Neutral" />
              <p>
                This is a <span>carbon-neutral</span> delivery
              </p>
            </div>
            <button>
              Confirm Order
            </button>
          </div>
        )}
      </aside>
    </main>
  )
}

export default App