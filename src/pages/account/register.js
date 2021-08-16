import React, { useCallback, useEffect, useState } from "react";
import { Formik, ErrorMessage } from 'formik'
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components'
import PasswordInput from '../../components/PasswordInput'
import AccountAuthWrapper from '../../layouts/AccountAuthWrapper'
import * as Yup from 'yup'
import { Link, navigate } from "gatsby";

const CUSTOMER_REGISTER = gql`
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`


const RegisterForm = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    return (<>
      <section className="hero is-dark is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4 is-centered">
              <h2 className=" title has-text-centered">Create</h2>
              <Mutation mutation={CUSTOMER_REGISTER}>
                {(customerLogin) => {
                  return (
                    <>
                      <div className="field">
                        <label className="label has-text-white" htmlFor="loginEmail">Email</label>
                        <div className="control">
                          <input className="input" type="email" id="loginEmail" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label has-text-white" htmlFor="loginPassword">Password</label>
                        <div className="control">
                          <input className="input" type="password" id="loginPassword" onChange={(e) => (setPassword(e.target.value))} />
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-text-centered">
                          <button
                            className="button"
                            onClick={() => {
                              customerLogin({
                                variables: {
                                  "input": {
                                    "email": email,
                                    "password": password,
                                  }
                                }
                              }).then((result) => {
                                navigate(`/account/login`)
                              })
                            }}
                          >CREATE</button>
                        </div>
                      </div>
                    </>
                  )
                }}
              </Mutation>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Link to={`/account/login`}>Login</Link>
</>
    )
}

const Register = () => {
    return(
        <AccountAuthWrapper>
            <RegisterForm/>
        </AccountAuthWrapper>
    )
}

export default Register;

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         let requestBody = {
//             // "query": "mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) { customerAccessTokenCreate(input: $input) { customerAccessToken{ accessToken expiresAt } customerUserErrors{ code field message } } }",
//             "query":  "mutation customerCreate($input: CustomerCreateInput!) {customerCreate(input: $input) {customerUserErrors {code field message} customer {id}}}",
//             "variables": {
//                 "input": formInput
//             }
//         };
//         await fetch(`https://cors-anywhere.herokuapp.com/https://${process.env.GATSBY_SHOP_NAME}.myshopify.com/api/2021-07/graphql.json`, {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/graphql',
//                 'Content-Type': 'application/graphql',
//                 'Access-Control-Allow-Origin': '*',
//                 'X-Shopify-Storefront-Access-Token': `${process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN}`
//             },
//             body: JSON.stringify(requestBody)
//         }).then(res => console.log(res.json())).catch(err => console.log(err))
//     }

//     return(
//         <form onSubmit={e => handleSubmit(e)}>
//         <label for='email' >Email</label>
//         <input value={formInput.email} name='email' type='email' onChange={e => setFormInput({...formInput, email: e.target.value})} />
//         <label for='password' >Password</label>
//         <input value={formInput.password  } name='password' type='password' onChange={e => setFormInput({...formInput, password: e.target.value})} />
//         <button type='submit' style={{width: '100px', color: 'black', background: 'lightgrey'}} >Submit</button>
//         </form>
//     )
// }