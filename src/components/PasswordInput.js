
import React, { useState } from 'react'
import { LoginInput } from './StyledComponents'
//import zxcvbn from 'zxcvbn'; // TODO: implement password strength, see dropbox login

const PasswordInput = (props) => {
    const [ isPasswordMasked, setIsPasswordMasked ] = useState(true)
    return (
        <div>
            <LoginInput
                type={isPasswordMasked ? 'password' : 'text'}
                {...props}
            />
            {props.touched.password && props.errors.password && (
                <p
                    className='error'
                    style={{ color: 'red', fontSize: '0.75rem' }}
                >
                    {props.errors.password}
                </p>
            )}
            <button style={{marginBottom: '1rem', border: 'unset', /*padding: 'unset'*/}} type="button" onClick={() => props.touched.password && setIsPasswordMasked(!isPasswordMasked)}>{isPasswordMasked ? 'show' : 'hide'}</button>
        </div>
    )
}

export default PasswordInput