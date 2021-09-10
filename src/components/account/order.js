import React from 'react';


const Order = ({ order }) => {
    console.log(order, 'order')
    return (
        <div className="columns">
            <div className="column">
                <table style={{fontFamily: 'CODE'}} className="table" style={{ margin: "auto" }}>
                    <thead>
                        <tr>
                            <th>PRODUCT</th>
                            <th>SKU</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th><p className="has-text-weight-semibold">TOTAL</p></th>
                        </tr>
                    </thead>
                    <tbody style={{fontFamily: 'CODE'}}>
                        {
                            order.node.lineItems &&
                            order.node.lineItems.edges.map(lineItem =>
                                <tr key={lineItem.node.title}>
                                    <td><p style={{width: "200px"}}>{lineItem.node.title}</p></td>
                                    <td>Soon</td>
                                    <td>{lineItem.node.totalPrice}</td>
                                    <td>{lineItem.node.quantity}</td>
                                    <td>Soon</td>
                                </tr>
                            )
                        }
                        <tr>
                            <td>Subtotal</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{order.node.subtotalPrice}</td>
                        </tr>
                        <tr>
                            <td>TOTAL</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><p className="has-text-weight-semibold">{order.node.totalPrice}</p></td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="column">
                <h3 style={{fontFamily: 'bangers'}}>Shipping Address</h3>
                <div style={{fontFamily: 'CODE !important'}} className="has-text-left">
                {order.node.shippingAddress &&
                <>
                    <p style={{fontFamily: 'CODE !important'}} >{order.node.shippingAddress.firstName} {order.node.shippingAddress.lastName}</p>
                    <p style={{fontFamily: 'CODE !important'}} >{order.node.shippingAddress.address1}</p>
                    <p style={{fontFamily: 'CODE !important'}} >{order.node.shippingAddress.zip}, {order.node.shippingAddress.city}</p>
                    <p style={{fontFamily: 'CODE !important'}} >{order.node.shippingAddress.country}</p>
                </>
                }
                </div>
            </div>
        </div>
    );
};

export default Order;