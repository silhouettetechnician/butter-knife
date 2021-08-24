import React, { useEffect, useState } from 'react';
import Order from './order';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const OrdersList = ({ orders, isDark }) => {
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [onClickOrder, setOnClickOrder] = useState(false);
    useEffect(() => {
        console.log(selectedOrder, 'selectedOrder')
        console.log(onClickOrder, 'selectedOrder')
    })
    return (
        <>
            <div className="column has-text-centered is-9">
                <h3 style={{ fontFamily: 'bangers' }}>ORDER HISTORY</h3>
                {
                    orders.edges.length === 0 ? (
                        <p className="has-text-grey">You haven't placed any orders yet.</p>
                    )
                        :
                        (
                            <table className="table is-bordered" style={{ margin: "auto", color: `${isDark ? 'white' : 'black'}` }}>
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Date</th>
                                        <th>Payment Status</th>
                                        <th>Fulfillment Status</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody style={{fontFamily: 'CODE'}}>
                                    {
                                        orders.edges.map(order =>
                                            <tr key={order.node.id}>
                                                <td><button style={{border: 'unset', color: `${isDark ? 'white' : 'black'}`}} className="button is-dark" onClick={() => { setSelectedOrder(order); setOnClickOrder(!onClickOrder) }}>{order.node.name}</button></td>
                                                <td>{new Date(order.node.processedAt).toLocaleDateString()}</td>
                                                <td>Soon</td>
                                                <td>Soon</td>
                                                <td>{order.node.currencyCode} {order.node.totalPrice}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        )
                }
            </div>
            <div className={onClickOrder ? "modal is-active" : "modal"}>
                <div aria-label="Background" role="button" tabIndex="0" className="modal-background" onClick={() => setOnClickOrder(!onClickOrder)} onKeyPress={() => setOnClickOrder(!onClickOrder)}>BUTTON</div>
                <div className="modal-content" style={{ width: "auto", padding: "10px" }}>
                    <section className="modal-card-body">
                        {/* { selectedOrder != null && */}
                        <Modal classNames={{
                            overlay: 'customOverlay',
                            modal: 'customModal',
                        }} open={onClickOrder} onClose={() => setOnClickOrder(!onClickOrder)}><Order order={selectedOrder} /></Modal>
                        {/* } */}
                    </section>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setOnClickOrder(!onClickOrder)}>close button</button>
            </div>
        </>
    );
};

export default OrdersList;