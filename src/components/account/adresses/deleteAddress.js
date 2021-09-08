import React, { useContext } from 'react';
import StoreContext from '../../../contexts/Context'
import { Mutation } from '@apollo/react-components'
import gql from 'graphql-tag'
import styled from '@emotion/styled'

const CUSTOMER_DELETE_ADDRESS = gql`
mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
    customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`
const DeleteButton = styled.button`
    background: #FC6E51;
    color: white;
    transition: background-color .6s ease;
    overflow: hidden;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    position: relative;
    &:after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        top: var(--mouse-y);
        left: var(--mouse-x);
        transform-style: flat;
        transform: translate3d(-50%,-50%,0);
        background: rgba(white,.1);
        border-radius: 100%;
        transition: width .3s ease, height .3s ease;
      }
    &:hover{
        background: darken(#FC6E51,7%);
    }
`

const DeleteAddress = ({ id }) => {
    const { customerAccessToken } = useContext(StoreContext);

    return (
        <Mutation mutation={CUSTOMER_DELETE_ADDRESS}>
            {(customerAddressDelete) => {
                return (
                    <button
                        className="btn btn-danger"
                        style={{margin: '2%'}}
                        onClick={() => {
                            customerAddressDelete({
                                variables: {
                                    "id": id,
                                    "customerAccessToken": customerAccessToken.accessToken
                                }
                            }).then((result) => {
                                typeof window !== 'undefined' &&
                                    window.location.reload(); 
                            })
                        }}
                    >
                        Delete
                    </button>
                )
            }}
        </Mutation>
    );
};

export default DeleteAddress;