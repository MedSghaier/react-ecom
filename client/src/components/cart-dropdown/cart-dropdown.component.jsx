import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { selectedCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';

const CartDropdowm = ({cartItems, history, dispatch}) =>(
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? 
                cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                )) 
                :
                <span className='empty-message'>No item in cart</span>
            }
        </div>
        <CustomButton onClick={()=> {
            history.push('/checkout');
             dispatch(toggleCartHidden())}
        }>Go to checkout</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems : selectedCartItems
})
export default withRouter(connect(mapStateToProps)(CartDropdowm));