import React, { useCallback, useEffect, useState } from "react";
import { Formik, ErrorMessage } from 'formik'
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components'
import PasswordInput from '../../components/PasswordInput'
import GuestLayout from '../../layouts/GuestLayout'
import * as Yup from 'yup'
import { Link, navigate } from "gatsby";



const test = () => {
    const CUSTOMER_CREATE = gql`
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
    const FormSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is Required'),
        password: Yup.string()
            .required('Password is Required'),
    })

    return (<>
    <h1>Sign Up</h1>
    <Mutation mutation={CUSTOMER_CREATE}
        onError={errors => {
            console.log(errors)
            // errors.forEach(error => {
            //     console.log(error)
            // })
        }}
    >
        {(customerCreate, { data, loading, errors }) => {
            if (errors) {
                console.log(errors)
                // errors.forEach(error => {
                //     formErrors.push(error.message);
                // })
            }

            return (
                <Formik
                    initialValues={{
                        form: '',
                        email: '',
                        password: '',
                    }}
                    validationSchema={FormSchema}
                    onSubmit={
                        (values, actions) => {
                            customerCreate({
                                variables: {
                                    input: {
                                        "email": values.email,
                                        "password": values.password,
                                    }
                                }
                            }).then((res) => {
                                if (res.data.customerCreate.customer) {
                                    // TODO: Push new Toaster Notification SUCCESS Registration
                                    navigate(`/account/login`)
                                } else {
                                    const errors = parseErrors(res.data.customerCreate.customerUserErrors)
                                    actions.setErrors(errors)
                                }
                            })
                        }
                    }
                    render={({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        values,
                        errors,
                        touched
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <ErrorMessage name="form" />
                            <ul>
                                <li>
                                    <label htmlFor="loginEmail">Email</label>
                                    <input id="loginEmail" type="email" name="email" value={values.email} onChange={handleChange} placeholder="email@gmail.com" required="" /*ref={this.firstInput} *//>
                                    <ErrorMessage component="div" name="email" />
                                </li>
                                <li>
                                    <label htmlFor="loginPassword">Password</label>
                                    <PasswordInput id="loginPassword" name="password" value={values.password} onChange={handleChange} required="" />
                                    <ErrorMessage component="div" name="password" />
                                </li>
                            </ul>
                            {
                                (loading)
                                ? <button disabled="disabled">Creating Account...</button>
                                : <button disabled={
                                    isSubmitting ||
                                    !!(errors.email && touched.email) ||
                                    !!(errors.password && touched.password)
                                    }>Sign Up</button>
                            }
                        </form>
                    )}
                />
            )
        }}
    </Mutation>
    <Link to={`/account/login`}>Login</Link>
</>
    )
}

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

export default test