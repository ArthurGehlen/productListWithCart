import add_cart_icon from '/images/icon-add-to-cart.svg'
import './Card.css'

function Card({ img, name, category, price, quantity, add_to_cart, increase, decrease }) {
  return (
    <div className="card">
      <div className="img">
        <img src={img} alt="Thumbnail" />
        {quantity <= 0 ? (
          <button className='button_inactive' onClick={add_to_cart}>
            <img src={add_cart_icon} alt="Add" />
            Add to Cart
          </button>
        ) : (
          <div className='button_active'>
            <button onClick={decrease}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
                <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>

            {quantity}

            <button onClick={increase}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="info">
        <span className='category'>{category}</span>
        <p className='name'>{name}</p>
        <p className='price'>${price}</p>
      </div>
    </div>
  )
}

export default Card