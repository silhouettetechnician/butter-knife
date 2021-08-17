import React, { useState, useContext, useEffect } from 'react';
import { PageHeading, LoginInput, AuthFormBox } from '../../components/StyledComponents'
import Flex from '../../styles/Flex'
// import SEO from "../../components/seo"
import loginImg from '../../assets/loginImg.jpg'
// import gql from 'graphql-tag';
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
const LoginForm = () => {
  const { setValue } = useContext(StoreContext);
  const { customerAccessToken } = useContext(StoreContext);
  const [passwordForgot, setPasswordForgot] = useState(false);
  const [customerLogin] = useMutation(CUSTOMER_LOGIN)
  const [forgotPassword] = useMutation(CUSTOMER_PASSWORD_RESET)
  const [email, setEmail] = useState("");
  const [emailReset, setEmailReset] = useState("");

  const [messsageInfo, setMessageInfo] = useState("");


  const [password, setPassword] = useState(null);
  const handleCustomerAccessToken = (value) => {
    setValue(value)
  }

  const handleLogin = res => {
    customerLogin({
      variables: {
        "input": {
          "email": email,
          "password": password,
        }
      }
    }).then(res => {
      handleCustomerAccessToken(res.data.customerAccessTokenCreate.customerAccessToken)
    })
  }
  const handleResetPassword = res => {
    forgotPassword({
      variables: {
        "email": emailReset,
      }
    }).then(() => {
      setMessageInfo("We've sent you an email with a link to update your password.")
      setPasswordForgot(false)
    })
  }

  return (
    <Flex justifyCenter >
      <img src={loginImg} style={{ width: '100%', height: 'calc(100vh - 359px)', filter: 'blur(45px)', position: 'fixed' }} />
      {passwordForgot ?
        <Flex style={{ height: 'calc(100vh - 359px)', zIndex: '9999', position: 'absolute' }}>
          <AuthFormBox>
          <PageHeading>RESET YOUR PASSWORD</PageHeading>
          <p style={{fontFamily: 'CODE', marginTop: '1rem'}}>We will send you an email to reset your password.</p>
          <div className="field">
            <div className="control">
              <LoginInput placeholder="email" type="email" id="loginEmail" onChange={(e) => setEmailReset(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <div className="control has-text-centered">
              <button
                style={{marginBottom: '1rem'}}
                className="button"
                onClick={handleResetPassword}
              >SUBMIT</button>
            </div>
            <div className="field">
              <div className="control has-text-centered" role="button" tabIndex="0" onClick={() => setPasswordForgot(!passwordForgot)} onKeyDown={() => () => setPasswordForgot(!passwordForgot)}>
                <p style={{fontFamily: 'CODE'}}>Cancel</p>
              </div>
            </div>
          </div>
          </AuthFormBox>
        </Flex>
        :
        <Flex style={{ height: 'calc(100vh - 359px)', zIndex: '9999', position: 'absolute' }}>
          <AuthFormBox>
            {messsageInfo &&
              <div class="notification is-success">
                {messsageInfo}
              </div>
            }
            <PageHeading>Login</PageHeading>
            <>
              <div className="field">
                <div className="control">
                  <LoginInput placeholder='email' type="email" id="loginEmail" onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <LoginInput placeholder='password' type="password" id="loginPassword" onChange={(e) => (setPassword(e.target.value))} />
                </div>
              </div>
              <div className="field">
                <div className="control has-text-centered" role="button" tabIndex="0" onClick={() => setPasswordForgot(!passwordForgot)} onKeyDown={() => setPasswordForgot(!passwordForgot)}>
                  <p style={{fontFamily: 'CODE'}}>Forgot your password? </p>
                </div>
              </div>
              <div className="field">
                <div className="control has-text-centered">
                  <button
                    style={{marginBottom: '1rem'}}
                    className="button"
                    onClick={handleLogin}
                  >SIGN IN</button>
                </div>
              </div>
              <div className="field">
                <div className="control has-text-centered">
                  <a href="/../account/register">
                    <p className="has-text-white">Create account</p>
                  </a>
                </div>
              </div>
            </>
          </AuthFormBox>
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

