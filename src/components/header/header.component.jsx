import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.scss';
import CartIcom from '../cart-icon/cart-icon.component';
import CartDropdowm from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {
        currentUser ? <div className='option' onClick={()=>auth.signOut()}>Sign out</div> : <Link className='option' to='/signin'>SignIn</Link>
      }
      <CartIcom />
    </div>
    { hidden ? null : <CartDropdowm /> }
    
  </div>
);

const mapStateToProps = createStructuredSelector ({ 
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})


export default connect(mapStateToProps)(Header);