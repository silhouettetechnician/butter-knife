import React, { useContext, useState } from "react";
import gql from 'graphql-tag';
import loginImg from '../../assets/loginImg.jpg'
import { AuthFormBox, PageHeading, LoginInput } from '../../components/StyledComponents'
import { Mutation } from '@apollo/client/react/components'
import PasswordInput from '../../components/PasswordInput'
import Flex from '../../styles/Flex'
import StoreContext from '../../contexts/StoreContext'
import AccountAuthWrapper from '../../layouts/AccountAuthWrapper'
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
  const {state} = useContext(StoreContext)
  return (
    <Flex justifyCenter >
    <img src={loginImg} style={{ width: '100%', height: 'calc(100vh - 359px)', filter: 'blur(45px)', position: 'fixed' }} />
    <Flex style={{ height: 'calc(100vh - 359px)', zIndex: '9999', position: 'absolute' }}>
    <AuthFormBox>
      <PageHeading>Create Account</PageHeading>
      <Mutation mutation={CUSTOMER_REGISTER}>
        {(customerLogin) => {
          return (
            <>
              <div className="field">
                <div className="control">
                  <LoginInput placeholder="email" type="email" id="loginEmail" onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="field">
                
                <div className="control">
                  <LoginInput placeholder="password" type="password" id="loginPassword" onChange={(e) => (setPassword(e.target.value))} />
                </div>
              </div>
              <div className="field">
                <div className="control has-text-centered">
                  <button
                    style={{marginBottom: '1rem'}}
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
      <Link to={`/account/login`}>Login</Link>
    </AuthFormBox>
    </Flex>
    </Flex>
  )
}

const Register = () => {
  return (
    <AccountAuthWrapper>
      <RegisterForm />
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