import add_cart_icon from '../assets/images/icon-add-to-cart.svg'

function Card({ img, name, category, price }) {
    return (
        <div className="card">
            <div className="img">
                <img src={img} alt="Thumbnail" />
                <button>
                    <img src={add_cart_icon} alt="Add" />
                    Add to Cart
                </button>
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