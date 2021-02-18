import React from 'react'
import { Heading1 } from '../components/StyledComponents';

const ProductsByDesigner = ({name}) => {
    console.log(name, 'ProductsByDesigner')
return <Heading1>{name}</Heading1>
}

export default ProductsByDesigner