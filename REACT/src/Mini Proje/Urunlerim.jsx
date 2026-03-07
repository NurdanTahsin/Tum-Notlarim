import React from 'react'
import Header from './components/Header'
import { products } from './components/Data'
import Product from './components/Product'

function Urunlerim() {

    return (
        <div>
            <Header />
            <div className='product-main'>
                {
                    products?.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </div>

        </div>
    )
}

export default Urunlerim