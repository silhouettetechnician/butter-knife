
import React, { useState } from 'react'
// import PropTypes from 'prop-types';
//import zxcvbn from 'zxcvbn'; // TODO: implement password strength, see dropbox login

const PasswordInput = (props) => {
    const [isPasswordMasked, setIsPasswordMasked ] = useState(true)

    const handlePasswordToggle = () => {
        setIsPasswordMasked(prevState => ({
            isPasswordMasked: !prevState.isPasswordMasked,
        }))
    }
        return (
            <div>
                <input
                    type={isPasswordMasked ? 'password' : 'text'}
                    {...props }
                />
                <button type="button" onClick={handlePasswordToggle}>{isPasswordMasked ? 'show' : 'hide'}</button>
            </div>
        )
}

// PasswordInput.propTypes = {
//     classes: PropTypes.object,
//     onChange: PropTypes.func.isRequired,
// }

export default PasswordInput