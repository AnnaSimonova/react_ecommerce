import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BookingCart(props) {
    let props_content_ar = Object.keys(props.content)
    .map(function(key) {
        return props.content[key];
    });
    let cartTotalAmount = props_content_ar.reduce(function(prev, cur) {
        return prev + cur.totalSum;
      }, 0);
    function removeFromCart(line) {
        props.removeFromCart(line);
    }
    function loadContent(val) {
        const name = val.name;
        const id = val._id;
        let option = (name === 'Covid-19' || name === 'Business Lounge') ? name : 'Fastline'
        props.loadContent(option, id);
    }
    function addToCart(item) {
        props.add(item);
    }
    let currency = '';
    let cartList = Object.keys(props.content).map((item, index) => {
        currency = props.content[item].currency;
        return (<li key={index}><span onClick={()=>loadContent(props.content[item])}>{props.content[item].name}</span> <div className="d-flex align-items-center"><span>{props.content[item].currency}{props.content[item].totalSum} </span>
        <img className="trash_icon" src="/images/trash.png" alt="trash icon" onClick={()=>removeFromCart(props.content[item])}/></div>
        </li>);
    });
    let notInCartList = props.notInCart.map((item, index) => {
        return (<li key={index} className="not_in_cart_line" ><span onClick={()=>loadContent(item)}>{item.name}</span><img className="plus_icon" src="/images/plus-icon.png" alt="plus icon" onClick={()=>addToCart(item)}/></li>)
    });

    return (
        <div className={props.cartActive ? 'booking-block_cart' : 'booking-block_cart hidden'}>
        <div>
        <img className="cart_icon" src="/images/cart.png" alt="cart icon"/><span className="title d-inline">Корзина: <span className="cart-total-sum">{currency}{cartTotalAmount}</span></span>
        </div>
        <ul>{cartList}</ul>
        {notInCartList ? (<ul>{notInCartList}</ul>) : null}
        <Link to="/" className="btn btn-light font-size-2 cart-checkout-link">Оформить заказ <span className="font-weight-bold">&#x27F6;</span></Link>
    </div>
    )
}
