import React from 'react'
import '../styles/Product.css'

function Product({ product }) {
    const { id, title, description, price, image } = product;
    return (
        <div className='product'>
            <div>
                <img src={image} alt={title} width={230} height={200} />
                <h3 className="title">{title}</h3>
                <h5 className="desc">{description}</h5>
                <h3 className="price">{price} TL</h3>
            </div>
        </div>
    )
}

export default Product