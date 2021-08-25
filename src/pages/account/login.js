import React, { useState, useContext, useEffect } from 'react';
import { PageHeading, LoginInput, AuthFormBox } from '../../components/StyledComponents'
import Flex from '../../styles/Flex'
import { Formik, ErrorMessage, Form } from 'formik'
import toast, { Toaster } from 'react-hot-toast';
import PasswordInput from '../../components/PasswordInput'
// import SEO from "../../components/seo"
import { parseErrors } from '../../utils/formErrors'
import loginImg from '../../assets/loginImg.jpg'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client';
import StoreContext from '../../contexts/Context'
import AccountAuthWrapper from "../../layouts/AccountAuthWrapper"

const CUSTOMER_LOGIN = gql`
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`
const CUSTOMER_PASSWORD_RESET = gql`
mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
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

const LoginForm = () => {
  const { setValue } = useContext(StoreContext);
  const { customerAccessToken } = useContext(StoreContext);
  const [passwordForgot, setPasswordForgot] = useState(false);
  const [customerLogin] = useMutation(CUSTOMER_LOGIN)
  const [forgotPassword] = useMutation(CUSTOMER_PASSWORD_RESET)
  // const [email, setEmail] = useState("");
  // const [emailReset, setEmailReset] = useState("");
  const [messsageInfo, setMessageInfo] = useState("");
  const [password, setPassword] = useState(null);
  const handleCustomerAccessToken = (value) => {
    setValue(value)
  }

  const handleLogin = values => {
    customerLogin({
      variables: {
        "input": {
          "email": values.email,
          "password": values.password,
        }
      }
    }).then(res => {
      if (res.data.customerAccessTokenCreate.customerAccessToken) {
        handleCustomerAccessToken(res.data.customerAccessTokenCreate.customerAccessToken)
      }
      else {
        toast.error(`Please enter correct email and password`)
        console.log(parseErrors(res.data.customerAccessTokenCreate.customerUserErrors), 'stringify error parse')
        // actions.setErrors(errors)
      }
    })
  }

  const handleResetPassword = values => {
    forgotPassword({
      variables: {
        "email": values.email,
      }
    }).then(() => {
      setMessageInfo("We've sent you an email with a link to update your password.")
      setPasswordForgot(false)
    })
  }

  return (
    <Flex justifyCenter >
      <Toaster position='top-right' />
      <img src={loginImg} style={{ width: '100%', filter: 'blur(45px)' }} />
      {passwordForgot ?
        <Flex style={{ height: 'calc(100vh - 359px)', position: 'absolute' }}>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={FormSchema}
          onSubmit={
            (actions) => {
              handleResetPassword(actions)
            }
          }>
          {props => (
            <Form onSubmit={props.handleSubmit}>
              <AuthFormBox>
                  <PageHeading>RESET YOUR PASSWORD</PageHeading>
                  <p style={{ fontFamily: 'CODE', marginTop: '1rem' }}>We will send you an email to reset your password.</p>
                  <LoginInput value={props.values.email} placeholder="email" name="email" type="email" id="loginEmail" onChange={props.handleChange} />
                  <button
                    style={{ marginBottom: '1rem' }}
                    className="button"
                    type='submit'
                  >SUBMIT</button>
                  <div className="control has-text-centered" role="button" tabIndex="0" onClick={() => setPasswordForgot(!passwordForgot)} onKeyDown={() => () => setPasswordForgot(!passwordForgot)}>
                    <p style={{ fontFamily: 'CODE' }}>Cancel</p>
                  </div>
              </AuthFormBox>
            </Form>
          )}
        </Formik>
          </Flex>
        :
        <Flex style={{ height: 'calc(100vh - 359px)', position: 'absolute' }}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={FormSchema}
            onSubmit={(values) => {
              handleLogin(values)
            }
            }>
            {props => (
              <Form onSubmit={props.handleSubmit}>
                <AuthFormBox >
                  {messsageInfo &&
                    <div class="notification is-success">
                      {messsageInfo}
                    </div>
                  }
                  <PageHeading>Login</PageHeading>
                  <div className="field">
                    <div className="control">
                      <LoginInput value={props.values.email} name='email' placeholder='EMAIL' type="email" id="loginEmail" onChange={props.handleChange} {...props}/>
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
                      {/* <LoginInput htmlFor='loginPassword' value={props.values.password} name='password' placeholder='PASSWORD' type="password" id="loginPassword" onChange={props.handleChange} /> */}
                      <PasswordInput id="loginPassword" placeholder='password' name="password" value={props.values.password} onChange={props.handleChange} {...props}/>
                    </div>
                  </div>
                  <div className="field">
                  </div>
                  <div className="field">
                    <div className="control has-text-centered">
                      <button
                        type='submit'
                        style={{ marginBottom: '1rem' }}
                        className="button"
                      // onClick={handleLogin}
                      >SIGN IN</button>
                    </div>
                  </div>
                    <div className="control has-text-centered" role="button" tabIndex="0" onClick={() => setPasswordForgot(!passwordForgot)} onKeyDown={() => setPasswordForgot(!passwordForgot)}>
                      <p style={{ fontFamily: 'CODE' }}>Forgot your password? </p>
                    </div>
                  <div className="field">
                    <div className="control has-text-centered">
                      <a href="/../account/register">
                        <p className="has-text-white">Create account</p>
                      </a>
                    </div>
                  </div>
                </AuthFormBox>
              </Form>
            )}
          </Formik>
        </Flex>
      }
    </Flex>
  );
};


const Login = () => {
  return (
    <>
      {/* <SEO title="Login" /> */}
      <AccountAuthWrapper log={false}>
        <LoginForm />
      </AccountAuthWrapper>
    </>
  );
};

export default Login;

