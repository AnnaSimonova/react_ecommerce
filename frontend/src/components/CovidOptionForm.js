import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function CovidOptionForm(props) {
    const [event, changeEvent] = useState('firstLoad');
    const cart = props.action.cart;
    let option_in_cart = false;
    let cart_point = {};
    if (cart && Object.keys(cart).length > 0 && cart.constructor === Object && cart[props.optionForm.name]) {
        cart_point = {...cart[props.optionForm.name]};
        option_in_cart = true;
    }
    const [people, changePeople] = useState(!option_in_cart ? 1 : cart_point.people);
    const [btnClass, changeBtnClass] = useState('');
    const [sbmBtnText, changeSbmBtnText] = useState(['cart', 'Добавить в корзину']);

    let totalAmount = props.optionForm.pcrPrice*parseInt(people);
    const [bookingDetails, updateBookingDetails] = useState(
        !option_in_cart ? 
        {
        _id: props.optionForm._id,
        name: props.optionForm.name,
        currency: props.optionForm.currency,
        airport: 'Аэропорт “Борисполь” (KBP)',
        departure: true,
        arrival: false,
        people: 1,
        pcrMethod: true,
        antigenMethod: false,
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
            newBookingDetails['totalSum']=(param[1] ? (parseInt(bookingDetails.people)*((bookingDetails.pcrMethod ? props.optionForm.pcrPrice : 0)+(bookingDetails.antigenMethod ? props.optionForm.antigenPrice : 0))) : 0) +
            (bookingDetails.arrival ? (parseInt(bookingDetails.people)*((bookingDetails.pcrMethod ? props.optionForm.pcrPrice : 0)+(bookingDetails.antigenMethod ? props.optionForm.antigenPrice : 0))) : 0);
        }
        if(param[0]==='arrival') {
            newBookingDetails['totalSum']=(param[1] ? (parseInt(bookingDetails.people)*((bookingDetails.pcrMethod ? props.optionForm.pcrPrice : 0)+(bookingDetails.antigenMethod ? props.optionForm.antigenPrice : 0))) : 0) +
            (bookingDetails.departure ? (parseInt(bookingDetails.people)*((bookingDetails.pcrMethod ? props.optionForm.pcrPrice : 0)+(bookingDetails.antigenMethod ? props.optionForm.antigenPrice : 0))) : 0);
        }
        if(param[0]==='people') {
            newBookingDetails['totalSum']=(bookingDetails.departure ? (param[1]*((bookingDetails.pcrMethod ? props.optionForm.pcrPrice : 0)+(bookingDetails.antigenMethod ? props.optionForm.antigenPrice : 0))) : 0) +
            (bookingDetails.arrival ? (param[1]*((bookingDetails.pcrMethod ? props.optionForm.pcrPrice : 0)+(bookingDetails.antigenMethod ? props.optionForm.antigenPrice : 0))) : 0);
        }
        if(param[0]==='pcrMethod') {
            newBookingDetails['totalSum']=(bookingDetails.departure ? (parseInt(bookingDetails.people)*((param[1] ? props.optionForm.pcrPrice : 0)+(bookingDetails.antigenMethod ? props.optionForm.antigenPrice : 0))) : 0) +
            (bookingDetails.arrival ? (parseInt(bookingDetails.people)*((param[1] ? props.optionForm.pcrPrice : 0)+(bookingDetails.antigenMethod ? props.optionForm.antigenPrice : 0))) : 0);
        }
        if(param[0]==='antigenMethod') {
            newBookingDetails['totalSum']=(bookingDetails.departure ? (parseInt(bookingDetails.people)*((bookingDetails.pcrMethod ? props.optionForm.pcrPrice : 0)+(param[1] ? props.optionForm.antigenPrice : 0))) : 0) +
            (bookingDetails.arrival ? (parseInt(bookingDetails.people)*((bookingDetails.pcrMethod ? props.optionForm.pcrPrice : 0)+(param[1] ? props.optionForm.antigenPrice : 0))) : 0);
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
        <h5 className="d-inline" >Укажите детали для тестирования на {props.optionForm.name}</h5>
        <Form>
        <Form.Group className="my-md-4 pb-5">
              <Form.Row>
                  <Form.Label column lg={5}>Выберите аэропорт</Form.Label>
                  <Col>
                  <Form.Control as="select" className="sel-field" onChange={(e)=>updateBooking(['airport', e.target.value])}>
                      <option>Аэропорт “Борисполь” (KBP)</option>
                      <option>Аэропорт Одесса (ODS)</option>
                  </Form.Control>
                  </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Label column lg={5}>Когда вам нужно тестирование:</Form.Label>
                    <Col>
                        <Form.Check custom inline label="При вылете" name="departure" id="departure"  type="checkbox" defaultChecked={option_in_cart ? cart_point.departure : bookingDetails.departure} onChange={(e)=>{updateBooking(['departure', e.target.checked]);}}/>
                        <Form.Check custom inline label="При прилете" name="arrival" id="arrival" type="checkbox" defaultChecked={option_in_cart ? cart_point.arrival : bookingDetails.arrival} onChange={(e)=>{updateBooking(['arrival', e.target.checked]);}}/>
                    </Col>
            </Form.Row>
        </Form.Group>
        <Form.Group className="pb-5 pass-num">
         <Form.Row className="mt-4 pb-2 pass-number">
         <Col lg={7}>
          <Form.Label className="monserrat" >Сколько людей будут проходить тестирование:</Form.Label>
        </Col>
        <Col>
          <Form.Label className="monserrat">Выберите метод тестирования:</Form.Label>
        </Col>
         </Form.Row>
         <Form.Row className="mt-2 pb-2pass-number">                   
              <Col lg={7}>
              <Form.Row>
              <Col lg={5}>
                  <Form.Label className="people w-unset">Количество людей: </Form.Label>
                  </Col>
                  <Col lg={5}><Form.Control type="number" defaultValue={option_in_cart ? cart_point.people : bookingDetails.people} min="1" onChange={(e)=>{changePeople(e.target.value);updateBooking(['people', e.target.value]);}}></Form.Control></Col>
                  </Form.Row>
                  </Col>
                  <Col>
              <Form.Row>
              <Col>
                  <Form.Check custom inline label="Метод ПЦР" name="pcrMethod" id="pcrMethod"  type="checkbox" defaultChecked={option_in_cart ? cart_point.pcrMethod : bookingDetails.pcrMethod} onChange={(e)=>{updateBooking(['pcrMethod', e.target.checked]);}}/>
                  <Form.Check custom inline label="Метод Антиген" name="antigenMethod" id="antigenMethod" type="checkbox" defaultChecked={option_in_cart ? cart_point.antigenMethod : bookingDetails.antigenMethod} onChange={(e)=>{updateBooking(['antigenMethod', e.target.checked]);}}/>
              </Col>
                </Form.Row>
                </Col>
         </Form.Row>
        </Form.Group>
          <div className="d-flex justify-content-end align-self-center mb-5 pb-4 pt-2 total_sum_line">
          <p className="d-inline font-weight-bold mb-0 mr-4 my-auto h4 form-total-sum">{props.optionForm.currency} {option_in_cart  && event !== 'change' ? cart_point.totalSum : bookingDetails.totalSum}</p>
          <Button variant="dark" className={btnClass} onClick={()=>updateCart(bookingDetails)}><img className="cart_icon" src={`/images/${sbmBtnText[0]}.png`} alt="cart icon" />{sbmBtnText[1]}</Button>
          </div>
          </Form>
    </div>
    )
}