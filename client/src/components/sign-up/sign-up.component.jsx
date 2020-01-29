import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({signUpStart}) => {

    const [userCredentials, setUserCredentials] = useState({ displayName:'',
        email:'',
        password:'',
        comfirmPassword:''
    })

    const { displayName, email, password, comfirmPassword } = userCredentials;

    const changeHandler = (e) =>{
        setUserCredentials({
            ...userCredentials,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(password !== comfirmPassword) {
            alert('password do not much')
            return
        }

        signUpStart({ displayName, email, password })

    }
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account </h2>
                <span>Sign up with with email and password</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput 
                        type='text'
                        name='displayName'
                        value={displayName}
                        label='Name'
                        onChange={changeHandler}
                        required />
                    <FormInput 
                        type='email'
                        name='email'
                        value={email}
                        label='Email'
                        onChange={changeHandler}
                        required />
                    <FormInput 
                        type='password'
                        name='password'
                        value={password}
                        label='Password'
                        onChange={changeHandler}
                        required />
                    <FormInput 
                        type='password'
                        name='comfirmPassword'
                        value={comfirmPassword}
                        label='Confirm password'
                        onChange={changeHandler}
                        required />
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </div>
        )
}

const mapDispatchTopProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})


export default connect(null, mapDispatchTopProps)(SignUp);