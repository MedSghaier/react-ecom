import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_GUKhEN4qEJ6A8xcufqKvw0o800opX4My36';

    const onToken = token => {
        console.log(token);
        alert('Payment successeded')
    }
    return (
        <StripeCheckout 
            label='Pay Now'
            name='React E-com'
            billingAddress
            shippingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`Your total is ${price}$`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;