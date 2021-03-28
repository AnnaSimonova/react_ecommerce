import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function BLoungeOptionForm(props) {
    const [event, changeEvent] = useState('firstLoad');
    const cart = props.action.cart;
    let option_in_cart = false;
    let cart_point = {};
    if (cart && Object.keys(cart).length > 0 && cart.constructor === Object && cart[props.optionForm.name]) {
        cart_point = {...cart[props.optionForm.name]};
        option_in_cart = true;
    }
    const [people, changePeople] = useState(!option_in_cart ? 1 : cart_point.hours);
    const [hours, changeHours] = useState(!option_in_cart ? 3 : cart_point.hours);
    const [btnClass, changeBtnClass] = useState('');
    const [sbmBtnText, changeSbmBtnText] = useState(['cart', 'Добавить в корзину']);
    
    let totalAmount = parseInt(hours) <= 3 ? (props.optionForm.minPrice*parseInt(people)) : (props.optionForm.minPrice*parseInt(people)+props.optionForm.price*(parseInt(people)*(parseInt(hours)-3)));
    const [bookingDetails, updateBookingDetails] = useState(
    !option_in_cart ? 
    {
    _id: props.optionForm._id,
    name: props.optionForm.name,
    currency: props.optionForm.currency,
    people: 1,
    hours: 3,
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
        if(param[0]==='people') {
            newBookingDetails['totalSum']= parseInt(newBookingDetails.hours) <= 3 ? (props.optionForm.minPrice*parseInt(param[1])) : (props.optionForm.minPrice*parseInt(param[1])+props.optionForm.price*(parseInt(param[1])*(parseInt(newBookingDetails.hours)-3)));
        }
        if(param[0]==='hours') {
            newBookingDetails['totalSum']= parseInt(param[1]) <= 3 ? (props.optionForm.minPrice*parseInt(newBookingDetails.people)) : (props.optionForm.minPrice*parseInt(newBookingDetails.people)+props.optionForm.price*(parseInt(newBookingDetails.people)*(parseInt(param[1])-3)));
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
        <h5 className="d-inline" >Укажите детали для {props.optionForm.name}</h5>
        <Form>
          <Form.Group className="pb-5 pt-1 my-md-4 pass-num">
          <Form.Label className="mt-3">Для какого количества людей вам нужен Bussiness Lounge</Form.Label>
          <Form.Row className="mt-4 pb-2 pass-number">                   
              <Col>
              <Form.Row>
              <Col>
                  <Form.Label className="people">Количество людей: </Form.Label>
                  </Col>
                  <Col ><Form.Control type="number" defaultValue={option_in_cart ? cart_point.people : bookingDetails.people} min="1" onChange={(e)=>{changePeople(parseInt(e.target.value));updateBooking(['people', parseInt(e.target.value)]);}}></Form.Control></Col>
                  </Form.Row>
                  </Col>
                  <Col>
              <Form.Row>
              <Col>
                  <Form.Label className="hours">Сколько часов: </Form.Label>
                  </Col>
                  <Col><Form.Control type="number" defaultValue={option_in_cart ? cart_point.hours : bookingDetails.hours} min="1" onChange={(e)=>{changeHours(parseInt(e.target.value));updateBooking(['hours', parseInt(e.target.value)]);}}></Form.Control></Col>
                  </Form.Row>
                  </Col>
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
