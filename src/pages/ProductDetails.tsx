import React from 'react'
import {useParams} from 'react-router-dom'

type Props = {
}

const ProductDetails = (props:Props) => {
    const params = useParams()
    
    return (
        <div>{params.id}</div>
    )
}

export default ProductDetails
