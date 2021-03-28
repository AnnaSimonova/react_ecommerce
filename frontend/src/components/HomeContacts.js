import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function HomeContacts() {
    useEffect(() => {
        // Обновляем заголовок документа с помощью API браузера
        addMapsPreviewScript();
      }, []);
    
    const addMapsPreviewScript = async () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'MapsPreview.js';
        document.body.appendChild(script);
    };
    
    return (
        <div className="contacts-block container">
        <div className="block_title">
            <p className="block_title-tag">Мы на связи 24/7 и рады помочь Вам</p>
            <h3 className="block_title-name">Контакты</h3>
            <p className="block_title-line"></p>
        </div>
        <div className="contacts-block_main">
          <div className="contacts-block_left">
              <p className="contacts-block_subtitle">Онлайн, в удобных вам мессенджерах</p>
              <div className="contacts-block_sm">
                  <div>
                      <Link to="/">
                          <img src="images/telegram_icon.png" alt="telegram icon" className="contacts-block_sm-icon"/>
                          <img src="images/telegram.png" alt="telegram logo" />
                      </Link>
                  </div>
                  <div>
                  <Link to="/">
                      <img src="images/fb_icon.png" alt="facebook icon"  className="contacts-block_sm-icon"/>
                      <img src="images/facebook.png" alt="facebook logo" />
                  </Link>
                  </div>
                  <div>
                  <Link to="/">
                      <img src="images/viber_icon.png" alt="viber icon"  className="contacts-block_sm-icon"/>
                      <img src="images/viber.png" alt="viber logo" />
                  </Link>
                  </div>
              </div>
              <p className="contacts-block_subtitle mt-5">По телефону и оффлайн</p>
              <div className="contacts-block_tel">
                  <div>
                      <a href="tel:+380440000000">
                          <img src="images/phone_icon.png" alt="phone icon" className="contacts-block_tel-icon"/>
                          <span>+380440000000</span>
                      </a>
                  </div>
                  <div>
                  <a href="tel:+380440000000">
                      <img src="images/phone_icon.png" alt="phone icon" className="contacts-block_tel-icon"/>
                      <span>+380440000000</span>
                  </a>
                  </div>
                  <div>
                  <a href="mailto:mail@mail.com">
                      <img src="images/mail_icon.png" alt="mail icon" className="contacts-block_tel-icon"/>
                      <span>mail@mail.com</span>
                  </a>
                  </div>
              </div>
              <div className="mt-4 position-relative">
                  <a href="https://goo.gl/maps/UcyiNGPTZdgyFUXD8" target="_blank" rel="noreferrer">
                      <img src="images/location_icon.png" alt="location icon" className="contacts-block_tel-icon"/>
                      <span className="header-map">Київська область, Бориспільський район, Бориспіль-7, «Бориспіль» Міжнародний державний аеропорт</span>
                  </a>
                  <div className="map-header"></div>
                </div>
          </div> 
          <div className="contacts-block_right">
              <p className="contacts-block_subtitle">Можете написать нам прямо тут</p>
              <Form>
  <Row>
  <FormGroup as={Col}>
      <FormControl placeholder="Ваше имя" className="contacts-form_input" />
    </FormGroup>
    <FormGroup as={Col}>
      <FormControl type="email" placeholder="Ваша почта" className="contacts-form_input" />
    </FormGroup>
  </Row>

  <FormGroup>
    <FormControl as="textarea" rows={5} placeholder="Сообщение" className="contacts-form_input" />
  </FormGroup>
  <Button type="submit" variant="dark" className="float-right">Отправить <span className="font-weight-bold">&#x27F6;</span></Button>
</Form>
          </div>
        </div>
        </div>
    )
}