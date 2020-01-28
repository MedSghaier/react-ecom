import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

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
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email, password);
    }

    changeHandler = (e) => {
        const { value, name } = e.target; 
        this.setState({
            [name]:value
        })
    }
    render(){
        const { googleSignInStart } = this.props;
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
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignin>Sign In with Google</CustomButton>
                   </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null,mapDispatchToProps)(SingIn);