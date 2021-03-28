import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function FastlineOptionForm(props) {
    const [event, changeEvent] = useState('firstLoad');
    const cart = props.action.cart;
    let cart_point = {};
    let option_in_cart = false;
    if (cart && Object.keys(cart).length > 0 && cart.constructor === Object && cart[props.optionForm.name]) {
        cart_point = cart[props.optionForm.name];
        option_in_cart = true;
    }
    const [adults, changeAdults] = useState(!option_in_cart ? 1 : cart_point.adults);
    const [kids, changeKids] = useState(!option_in_cart ? 0 : cart_point.kids);
    const [btnClass, changeBtnClass] = useState('');
    const [sbmBtnText, changeSbmBtnText] = useState(['cart', 'Добавить в корзину']);
    
    let totalAmount = props.optionForm.price*(parseInt(adults)+parseInt(kids));
    const [bookingDetails, updateBookingDetails] = useState(
        !option_in_cart ? 
        {
        _id: props.optionForm._id,
        name: props.optionForm.name,
        currency: props.optionForm.currency,
        flight: 'Международный',
        departure: true,
        arrival: false,
        adults: 1,
        kids: 0,
        totalSum: totalAmount
    } : cart_point);

    function updateSbmBtn() {
        if (cart_point && Object.keys(cart_point).length > 0 && cart_point.constructor === Object && shallowEqual(cart_point, bookingDetails)) {
            changeBtnClass('sbm-btn-disabled');
            changeSbmBtnText(['cart_green', 'Продукт в корзине']);
        } else if (cart_point && Object.keys(cart_point).length > 0 && cart_point.constructor === Object && !shallowEqual(cart_point, bookingDetails)) {
            changeBtnClass('');
            changeSbmBtnText(['cart', 'Обновить в корзине']);
        } else if (parseInt(bookingDetails['totalSum']) === 0) {
            changeBtnClass('btn-disabled');
        } else {
            changeBtnClass('');
            changeSbmBtnText(['cart', 'Добавить в корзину']);
        }
    }
    function updateBooking(param) {
        let newBookingDetails = {...bookingDetails};
        newBookingDetails[param[0]] = param[1];
        if(param[0]==='departure') {
            newBookingDetails['totalSum']=(param[1] + bookingDetails.arrival)*(parseInt(adults)+parseInt(kids))*props.optionForm.price;
        }
        if(param[0]==='arrival') {
            newBookingDetails['totalSum']=(bookingDetails.departure + param[1])*(parseInt(adults)+parseInt(kids))*props.optionForm.price;
        }
        if(param[0]==='adults') {
            newBookingDetails['totalSum']=(bookingDetails.departure + bookingDetails.arrival)*(parseInt(param[1])+parseInt(kids))*props.optionForm.price;
        }
        if(param[0]==='kids') {
            newBookingDetails['totalSum']=(bookingDetails.departure + bookingDetails.arrival)*(parseInt(adults)+parseInt(param[1]))*props.optionForm.price;
        }
        updateBookingDetails(newBookingDetails);
        changeEvent('change');
        updateSbmBtn();
      }
    function updateCart(bookingDetails) {
        props.action.onClick(bookingDetails);
      }
      useEffect(() => { 
        if (cart && Object.keys(cart).length > 0 && cart.constructor === Object && cart[props.optionForm.name]) {
            updateBookingDetails(cart_point);
        }
        changeEvent('firstLoad');
    }, []);
    useEffect(() => { 
        updateSbmBtn();
    }, [bookingDetails, cart]);
    function showForm(value) {
        props.showForm(value);
    }
    function shallowEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        for (let key of keys1) {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
        return true;
    }

    return (
          <div className="fl_option_form">
              <Button className="btn-light d-inline font-weight-bold border-dark px-1 py-0 mr-2 mb-2" onClick={()=>showForm(false)}>&#x27F5;</Button>
              <h5 className="d-inline" >Укажите детали для {props.optionForm.name}</h5>
              <Form>
              <Form.Group className="my-md-4 pb-4">
                    <Form.Row>
                        <Form.Label column lg={4}>Укажите тип полета</Form.Label>
                        <Col>
                        <Form.Control as="select" defaultValue={option_in_cart ? cart_point.flight : bookingDetails.flight} className="sel-field" onChange={(e)=>updateBooking(['flight', e.target.value])}>
                            <option>Международный</option>
                            <option>Внутренний</option>
                            <option>Транзитный</option>
                        </Form.Control>
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column lg={4}>Когда вам нужен Fast Line</Form.Label>
                        <Col>
                         <Form.Check custom inline label="При вылете" name="departure" id="departure"  type="checkbox" defaultChecked={option_in_cart ? cart_point.departure : bookingDetails.departure} onChange={(e)=>{updateBooking(['departure', e.target.checked]);}}/>
                         <Form.Check custom inline label="При прилете" name="arrival" id="arrival" type="checkbox" defaultChecked={option_in_cart ? cart_point.arrival : bookingDetails.arrival} onChange={(e)=>{updateBooking(['arrival', e.target.checked]);}}/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group className="pb-4 pass-num">
                <Form.Label>Для какого количества людей вам нужен фастлайн</Form.Label>
                <Form.Row className="mt-4 pb-2 pass-number">
                {props.optionForm.name !== 'Fast Line Kids' ?                   
                    <Col>
                    <Form.Row>
                    <Col>
                        <Form.Label className="adults">{props.optionForm.name !== 'Fast Line Care' ? 'Количество взрослых:' : 'Количество человек:'}</Form.Label>
                        </Col>
                        <Col ><Form.Control type="number" defaultValue={option_in_cart ? cart_point.adults : bookingDetails.adults} min="1" onChange={(e)=>{changeAdults(e.target.value);updateBooking(['adults', e.target.value]);}}></Form.Control></Col>
                        </Form.Row>
                        </Col> : null }
                        {props.optionForm.name !== 'Fast Line Care' ?
                        <Col>
                    <Form.Row>
                    <Col>
                        <Form.Label className="kids">Количество детей: </Form.Label>
                        </Col>
                        <Col><Form.Control type="number" defaultValue={option_in_cart ? cart_point.kids : bookingDetails.kids} min="0" onChange={(e)=>{changeKids(e.target.value);updateBooking(['kids', e.target.value]);}}></Form.Control></Col>
                        </Form.Row>
                    </Col> : null}
                </Form.Row>
                </Form.Group>
                <div className="d-flex justify-content-end align-self-center my-4 pb-4 total_sum_line">
                <p className="d-inline font-weight-bold mb-0 mr-4 my-auto h4 form-total-sum">{props.optionForm.currency} {option_in_cart && event !== 'change' ? cart_point.totalSum : bookingDetails.totalSum}</p>
                <Button variant="dark" className={btnClass} onClick={()=>updateCart(bookingDetails)}><img className="cart_icon" src={`/images/${sbmBtnText[0]}.png`} alt="cart icon" />{sbmBtnText[1]}</Button>
                </div>
                </Form>
          </div>
    )
}