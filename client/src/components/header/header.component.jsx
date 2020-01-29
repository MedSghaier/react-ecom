import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';


import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.scss';
import CartIcom from '../cart-icon/cart-icon.component';
import CartDropdowm from '../cart-dropdown/cart-dropdown.component';

import { HeaderContainer, LogoContainer, OptionsContainer ,OptionLink, } from './header.styles';

import { signOutStart } from '../../redux/user/user.actions';

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink to='/shop'>
        CONTACT
      </OptionLink>
      {
        currentUser ? <OptionLink as='div' to='' className='option' onClick={signOutStart}>Sign out</OptionLink> : <OptionLink className='option' to='/signin'>SignIn</OptionLink>
      }
      <CartIcom />
    </OptionsContainer>
    { hidden ? null : <CartDropdowm /> }
    </HeaderContainer>
);

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

const mapStateToProps = createStructuredSelector ({ 
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);