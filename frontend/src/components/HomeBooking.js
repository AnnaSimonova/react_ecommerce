import React, { useEffect, useState } from 'react';
import BookingMainContent from './BookingMainContent';
import BookingCart from './BookingCart';
import data from '../data.js';
import PromosBlock from './PromosBlock';

export default function HomeBooking() {
    const [showFlForm, updateFlForm] = useState(false);
    const [currentContent, setCurrentContent] = useState('Fastline');
    const [cart, updateCart] = useState({});
    const [menuActive, updateMenu] = useState('Fastline');
    const [cartActive, showCart] = useState(false);
    const flOptions = [];
    let covBlOptions = [];
    let allOptions = data.fastlineOptions.concat(data.businessLoungeOptions.concat(data.covidOptions));
    data.covidOptions.concat(data.businessLoungeOptions).map((item, index) => {
        covBlOptions.push(item.name)
    });
    data.fastlineOptions.map((item, index) => flOptions.push(item.name));

    let notInCartListFl = (!Object.keys(cart).some(x => flOptions.indexOf(x) >= 0)) ? 'Fast Line Premium' : '';
    let notInCartListCovLoun = [];
     covBlOptions.map((item, index) => {
        if (!Object.keys(cart).find(x =>x===item))  {
            notInCartListCovLoun.push(item);
        }
    });
    if (notInCartListFl) {
        notInCartListCovLoun.unshift(notInCartListFl);
    }
    let notInCartList = notInCartListCovLoun.map((item) => {
        return allOptions.filter(obj => { return obj.name === item});
    });
    let notInCartListFinal = [].concat.apply([], notInCartList);
    let promosBlockListFinal = [];
    let promosBlockList = notInCartListCovLoun.map((item) => {
        promosBlockListFinal.push(data.promosOptions.find(x => x.service_name===item));
    });
    let sdfPromoBlock = data.addPromoOption[0];

    // local storage block
    let localCart = localStorage.getItem("cart");
      useEffect(() => {
          console.log(localStorage);
          localCart = JSON.parse(localCart);
        
        if (localCart && Object.keys(localCart).length > 0 && localCart.constructor === Object) {
            
            updateCart(localCart);
            showCart(true);
        }
      }, []);

    function addToCart(details) {
        let newCart = {...cart};
        newCart[details.name] = details;
        updateCart(newCart);
        showCart(true);

        let cartString = JSON.stringify(newCart);
        localStorage.setItem('cart', cartString);
      }

    function removeFromCart(line) {
        let newCart = {...cart};
        delete newCart[line.name];
        updateCart(newCart);
        let cartString = JSON.stringify(newCart);
        localStorage.setItem('cart', cartString);

        if (newCart && Object.keys(newCart).length > 0 && newCart.constructor === Object) {
            showCart(true);
        }  else {
            localStorage.removeItem('cart');
            showCart(false);
        }
    }

    function loadContent(value) {
        setCurrentContent(value);
        updateMenu(value);
    }

    function loadContentFromCart(name, id) {
        loadContent(name);
        if (id) {
            updateFlForm(id);
        }
    }
    
    return (
        <div className="booking-block-wrap">
        <div className="booking-block container px-4" id="booking-block">
        <div className="block_title">
            <p className="block_title-tag">Создайте собственную зону комфорта в аэропорту</p>
            <h3 className="block_title-name">Забронируйте Fastline онлайн</h3>
        </div>
        <div className="booking-block_main">
            <div className="booking-block_aside">
            <div className="booking-block_menu">
                <span>Выберите услугу</span>
                <ul>
                    <li onClick={()=>{loadContent('Fastline');updateFlForm(false);}} className={menuActive==="Fastline" ? "active" : null}>Fastline</li>
                    <li onClick={()=>{loadContent('Covid-19');updateFlForm(false);}} className={menuActive==="Covid-19" ? "active" : null}>Covid-19</li>
                    <li onClick={()=>{loadContent('Business Lounge');updateFlForm(false);}} className={menuActive==="Business Lounge" ? "active" : null}>Business Lounge</li>
                </ul>
            </div>
            <BookingCart content={cart} notInCart={notInCartListFinal} cartActive={cartActive} removeFromCart={removeFromCart} loadContent={(name, id)=>loadContentFromCart(name, id)} add={addToCart}></BookingCart>
            <div className="sdf_link">
                <img src="./images/sdf_img.png" alt="smart duty free" className="w-100"/>
                <h6><a href="https://www.smartdutyfree.com/" target="_blank" rel="noreferrer">Відвідай Smartdutyfree.com</a></h6>
                <p>Обирай Duty Free товари онлайн та отримуй доставку прямо в літак.</p>
                <a href="https://www.smartdutyfree.com/" target="_blank" rel="noreferrer" className="sdf_url">Перейти &#x27F6;</a>
            </div>
            </div>
            <div className="booking-block_content mx-auto">
                <BookingMainContent content={currentContent} showFlForm={[showFlForm, (val)=>updateFlForm(val)]} cart={cart} onClick={addToCart}></BookingMainContent>
                <PromosBlock blocksList={promosBlockListFinal} optionalBlock={sdfPromoBlock} add={addToCart} loadContent={(name, id)=>loadContentFromCart(name, id)}></PromosBlock>
            </div>
        </div>
        </div>
        </div>
    )

}
