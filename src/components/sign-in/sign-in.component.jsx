import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.component.scss';

class SingIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        try{
           await auth.signInWithEmailAndPassword(email, password);
           this.setState({
                email:'',
                password:''
            })

        }catch (err){
            console.log(err);
            
        }
        
    }

    changeHandler = (e) => {
        const { value, name } = e.target; 
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with you email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        handleChange={this.changeHandler}  
                        type="email" 
                        name="email" 
                        value={this.state.email}
                        label="Email"
                        required
                    />
                   <FormInput 
                        handleChange={this.changeHandler}  
                        type="password"
                        name="password" 
                        value={this.state.password}
                        label="Password"
                        required
                    />
                   <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignin>Sign In with Google</CustomButton>
                   </div>
                </form>
            </div>
        )
    }
}

export default SingIn;