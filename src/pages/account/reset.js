import React, { useState } from 'react'
import { PageHeading, LoginInput, AuthFormBox } from '../../components/StyledComponents'
import { Formik, ErrorMessage, Form } from 'formik'
import { useMutation, gql } from '@apollo/client';
import { navigate } from 'gatsby';
import Flex from '../../styles/Flex'
import toast, { Toaster } from 'react-hot-toast';
import loginImg from '../../assets/loginImg.jpg'

export const customerReset = gql`
  mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
      customer {
        id
      }
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
`;

const Reset = () => {

    const [formField, setFormField] = useState({
        password: '',
        confirmPassword: '',
      });
      const [customerResetQuery] = useMutation(customerReset);

      function handleRecovery(values) {
        if (
          values.password === '' ||
          values.confirmPassword === '' ||
          values.password !== values.confirmPassword
        ) {
          toast.error('Confirmation Password is not equal to Password');
          return;
        }

        const params = new URLSearchParams(document.location.search.substring(1))
        const id = window.btoa(`gid://shopify/Customer/${params.get('id')}`)
        const token = params.get('token')
    
        customerResetQuery({
          variables: {
            id: id,
            input: {
              resetToken: token,
              password: values.password,
            },
          },
        }).then(() => {
            toast.success(`Password successfully updated.`)
            navigate('/account/login')
      }).catch(err => toast.error(err))
    }

    return (
        <Flex justifyCenter >
        <Toaster position='top-right' />
        <img src={loginImg} style={{ width: '100%', filter: 'blur(45px)' }} />
          <Flex justifyCenter style={{ position: 'absolute', width: '100%' }}>
            <Formik
              initialValues={{
                password: formField.password,
                confirmPassword: formField.confirmPassword
              }}
              // validationSchema={FormSchema}
              onSubmit={
                (actions) => {
                    handleRecovery(actions)
                }
              }>
              {props => (
                <AuthFormBox onSubmit={props.handleSubmit}>
                  <PageHeading>RESET YOUR PASSWORD</PageHeading>
                  <p style={{ fontFamily: 'CODE', marginTop: '1rem' }}>Enter a new password</p>
                  <LoginInput value={props.values.password} placeholder="New password" name="password" type="password" id="password" onChange={props.handleChange} />
                  <LoginInput value={props.values.confirmPassword} placeholder="Confirm password" name="confirmPassword" type="password" id="confirmPassword" onChange={props.handleChange} />
                  {/* <div className="control has-text-centered" role="button" tabIndex="0" onClick={() => setPasswordForgot(!passwordForgot)} onKeyDown={() => () => setPasswordForgot(!passwordForgot)}>
                    <p style={{ fontFamily: 'CODE' }}>Cancel</p>
                  </div> */}
                  <button
                    style={{ marginBottom: '1rem' }}
                    className="button"
                    type='submit'
                  >SUBMIT</button>
                </AuthFormBox>
    
              )}
            </Formik>
          </Flex>
    </Flex>
    )
}

export default Reset

