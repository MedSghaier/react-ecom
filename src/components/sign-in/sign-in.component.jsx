import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.component.scss';

const  SingIn = ({ emailSignInStart, googleSignInStart  }) => {
    const [userCredentials, setCredentials] = useState({email: '', password:''})

    const { email, password } = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();
        emailSignInStart(email, password);
    }

    const changeHandler = (e) => {
        const { value, name } = e.target; 
        setCredentials({
            ...userCredentials,
            [name]:value
        })
    }
    return(
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with you email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    handleChange={changeHandler}  
                    type="email" 
                    name="email" 
                    value={email}
                    label="Email"
                    required
                />
                <FormInput 
                    handleChange={changeHandler}  
                    type="password"
                    name="password" 
                    value={password}
                    label="Password"
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignin>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null,mapDispatchToProps)(SingIn);