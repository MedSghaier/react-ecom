import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';
import { signUpStart } from '../../redux/user/user.actions';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName:'',
            email:'',
            password:'',
            comfirmPassword:''
        }
    }

    changeHandler = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = async (event) =>{
        event.preventDefault();
        const { displayName, email, password, comfirmPassword } = this.state;
        const { signUpStart } = this.props;
        if(password !== comfirmPassword) {
            alert('password do not much')
            return
        }

        signUpStart({ displayName, email, password })

    }

    render() {
        const { displayName, email, password, comfirmPassword } = this.state;

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account </h2>
                <span>Sign up with with email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        type='text'
                        name='displayName'
                        value={displayName}
                        label='Name'
                        onChange={this.changeHandler}
                        required />
                    <FormInput 
                        type='email'
                        name='email'
                        value={email}
                        label='Email'
                        onChange={this.changeHandler}
                        required />
                    <FormInput 
                        type='password'
                        name='password'
                        value={password}
                        label='Password'
                        onChange={this.changeHandler}
                        required />
                    <FormInput 
                        type='password'
                        name='comfirmPassword'
                        value={comfirmPassword}
                        label='Confirm password'
                        onChange={this.changeHandler}
                        required />
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

const mapDispatchTopProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})


export default connect(null, mapDispatchTopProps)(SignUp);