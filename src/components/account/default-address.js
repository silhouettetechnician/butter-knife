import React from 'react';
import { Link } from "gatsby"

const DefaultAddress = ({ defaultAddress, addressesSize, isDark }) => {
    return (
        <div style={{margin: '25px 0'}}className="column has-text-centered">
            <h3 style={{ fontFamily: 'bangers' }}>Address DETAILS</h3>
            {
                defaultAddress != null && (
                    <div style={{ fontFamily: 'CODE' }} className="has-text-left">
                        <p className="has-text-grey">{defaultAddress.firstName} {defaultAddress.lastName}</p>
                        <p className="has-text-grey">{defaultAddress.address1}</p>
                        <p className="has-text-grey">{defaultAddress.zip}, {defaultAddress.city}</p>
                        <p className="has-text-grey">{defaultAddress.country}</p>
                    </div>
                )
            }
            <br />
            <Link to="/account/addresses">
                <h3
                    style={{ border: 'unset', fontFamily: 'bangers', color: `${isDark ? 'white' : 'black'}` }}
                >
                    View Addresses ({addressesSize})
                </h3>
            </Link>
        </div>
    );
};

export default DefaultAddress;