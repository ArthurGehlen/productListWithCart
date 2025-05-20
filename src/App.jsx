import { useState, useEffect } from 'react'

// Images
import empty_cart_img from './assets/images/illustration-empty-cart.svg'

import Card from './components/Card'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([
    // { name: 'Teste', quantity: 0, default_cost: 0, total_cost: 0 },
  ])

  /*
    // CART ESTRUCTURE
    Cart: [
      {
        name: '',
        quantity: 0,
        default_cost: 0,
        total_cost: 0
      }
    ]  
  */

  function fetch_data() {
    fetch('../src/api/data.json')
      .then(received_data => received_data.json())
      .then(received_data => (
        setData(received_data)
      ))
  }

  useEffect(() => {
    fetch_data()
  }, [])

  return (
    <main>
      <section className='foods_content'>
        <h1>Desserts</h1>

        <section className='content'>
          {data.map((card, index) => (
            <Card
              key={index}
              img={card.image['desktop']}
              name={card.name}
              category={card.category}
              price={card.price}
            />
          ))}
        </section>
      </section>

      <aside>
        <h2>Your Cart ({cart.length})</h2>

        {cart.length == 0 ?
          // Cart is empty
          <div className="cart_content_empty">
            <img src={empty_cart_img} alt="Empty Cart" />
            <p>Your added items will appear here</p>
          </div>

          : 

          // Cart has items 
          <div className="cart_content">
            {cart.map((product, index) => (
              <div className="product" key={index}>
                <p>{product.name}</p>
                <p>{product.quantity}x</p>
                <p>{product.default_cost}</p>
                <p>{product.total_cost}</p>
              </div>
            ))}
          </div>
        }
      </aside>
    </main>
  )
}

export default App
