import { useState, useEffect } from 'react'

// Images
import empty_cart_img from './assets/images/illustration-empty-cart.svg'

import Card from './components/Card'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [cartCount, setCartCount] = useState(0)

  function fetch_data() {
    fetch('../data.json')
      .then(received_data => received_data.json())
      .then(received_data => (
        setData(received_data)
      ))
  }

  useEffect(() => {
    fetch_data()
  }, [])

  return (
    <>
      <main>
        <h1>Desserts</h1>

        <section className='content'>
          {data.map((card, index) => (
            <Card 
              key={index}
              img={card.image['thumbnail']}
              name={card.name}
              category={card.category}
              price={card.price}
            />
          ))}
        </section>
      </main>

      <aside>
        <h2>Your Cart ({cartCount})</h2>

        <img src={empty_cart_img} alt="Empty Cart" />
        <p>Your added items will appear here</p>
      </aside>
    </>
  )
}

export default App
