import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import {selectedCartItemsCount } from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect'
import { ReactComponent as ShoppingIcon  } from '../../assets/cart.svg'

import './cart-icon.styles.scss';

const CartIcom = ({toggleCartHidden, itemCount})=>(
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <div className="item-count">{itemCount}</div>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector ({
    itemCount: selectedCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcom);