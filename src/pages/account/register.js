import React, { useContext, useState } from "react";
import loginImg from '../../assets/loginImg.jpg'
import { Formik, ErrorMessage, Form } from 'formik'
import { AuthFormBox, PageHeading, LoginInput } from '../../components/StyledComponents'
import { useMutation, gql } from '@apollo/client';
import Flex from '../../styles/Flex'
import StoreContext from '../../contexts/StoreContext'
import AccountAuthWrapper from '../../layouts/AccountAuthWrapper'
import { Link, navigate } from "gatsby";
import * as Yup from 'yup'

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
const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is Required'),
  password: Yup.string()
    .required('Password is Required'),
})

const RegisterForm = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { state } = useContext(StoreContext)
  const [customerRegister] = useMutation(CUSTOMER_REGISTER)

  const handleRegister = values => {
    customerRegister({
      variables: {
        "input": {
          "email": values.email,
          "password": values.password,
        }
      }
    }).then((result) => {
      console.log(result, 'result')
      navigate(`/account/login`)
    })
  }

  return (
    <Flex justifyCenter>
      <img src={loginImg} style={{ width: '100%', filter: 'blur(45px)' }} />
      <Flex style={{ height: 'calc(100vh - 359px)', position: 'absolute' }}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={FormSchema}
          onSubmit={
            (actions) => {
              handleRegister(actions)
            }
          }>
          {props => (
            <Form>
              <AuthFormBox>
                <PageHeading>Create Account</PageHeading>
                <div className="field">
                  <div className="control">
                    <LoginInput value={props.values.email} name='email' placeholder="email" type="email" id="loginEmail" onChange={props.handleChange} />
                    {props.touched.email && props.errors.email && (
                        <p
                          className='error'
                          style={{ color: 'red', fontSize: '0.75rem' }}
                        >
                          {props.errors.email}
                        </p>
                      )}
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <LoginInput value={props.values.password} name='password' placeholder="password" type="password" id="loginPassword" onChange={props.handleChange} />
                    {props.touched.password && props.errors.password && (
                        <p
                          className='error'
                          style={{ color: 'red', fontSize: '0.75rem' }}
                        >
                          {props.errors.password}
                        </p>
                      )}
                  </div>
                </div>
                <div className="field">
                  <div className="control has-text-centered">
                    <button
                      style={{ marginBottom: '1rem' }}
                      className="button"
                      type='submit'
                    >CREATE</button>
                  </div>
                </div>
                <Link to={`/account/login`}>Already registered? Login</Link>
              </AuthFormBox>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  )
}

const Register = () => 
    <AccountAuthWrapper>
      <RegisterForm />
    </AccountAuthWrapper>

export default Register;
