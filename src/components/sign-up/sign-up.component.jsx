import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

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

        if(password !== comfirmPassword) {
            alert('password do not much')
            return
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName:'',
                email:'',
                password:'',
                comfirmPassword:''
            })

        }catch(err){
            console.log(err);
        }
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


export default SignUp;