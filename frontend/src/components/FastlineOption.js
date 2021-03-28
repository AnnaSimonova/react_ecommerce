import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

export default function FastlineOption(props) {
    const [collapse_btn_note, toggleNote] = useState('Что входит в этот пакет');
    const [collapse_btn_class, changeClass] = useState('fl_option_collapse-btn bg_ar_down');
    const cart = props.action.cart;
    const option = props.option;
    let optionClass = 'fl_option';
    if (props.option.name === 'Fast Line Business') {
        optionClass += ' business-style';
    }

    function toggleClpsNote() {
        collapse_btn_note === 'Что входит в этот пакет' ? toggleNote('Скрыть') : toggleNote('Что входит в этот пакет');
        collapse_btn_note === 'Что входит в этот пакет' ? changeClass('fl_option_collapse-btn bg_ar_up') : changeClass('fl_option_collapse-btn bg_ar_down');
    }
    useEffect(() => { 
           
    });

    return (
          <div className={optionClass}>
                <div className="fl_option_short">
                    <div className="fl_option_short-left">
                        <img src={option.icon_src} alt="" />
                        <div className="fl_option_short-info">
                            <h6>{option.name}</h6>
                            <p>{option.short_description}</p>
                        </div>
                    </div>
                    <div className="fl_option_short-right">
                        {
                             (cart && Object.keys(cart).length > 0 && cart.constructor === Object && cart[option.name]) ? 
                                (<Button className="btn-light fl_option_order-btn" onClick={()=>props.showForm(option._id)}><img className="cart_icon" src={'/images/cart_green.png'} alt="cart icon" />Продукт в корзине</Button>) 
                               :
                                (<Button className="btn-light fl_option_order-btn" onClick={()=>props.showForm(option._id)}>Заказать за {option.currency} {option.price} &#x27F6;</Button>)
                        }
                    </div>  
                </div>
                <Accordion.Collapse eventKey={option._id} className="fl_option_details">
                    <div className="fl_option_details-inner">
                        <ul>
                            {option.full_description.map((point, index) => (
                            <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </Accordion.Collapse>
                <Accordion.Toggle eventKey={option._id} className={collapse_btn_class} onClick={toggleClpsNote}>{collapse_btn_note}</Accordion.Toggle>
          </div>
    )
}