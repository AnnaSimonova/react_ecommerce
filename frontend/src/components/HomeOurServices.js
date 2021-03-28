import React from 'react';
import { Link } from 'react-router-dom';

const styleFastline = {
  backgroundImage: 'url(images/fastline_bg.png)',
};
const styleLounge = {
  backgroundImage: 'url(images/lounge_bg.png)',
};
const styleCovid = {
  backgroundImage: 'url(images/covid_bg.png)',
};
const styleShopping = {
  backgroundImage: 'url(images/shopping_bg.png)',
};

export default function HomeOurServices() {
    return (
          <div className="services-block container">
            <div className="block_title">
                <p className="block_title-tag">Фастлайн это агрегатор сервисов для авиа-пассажиров</p>
                <h3 className="block_title-name">Нескольно слов о наших сервисах</h3>
                <p className="block_title-line"></p>
            </div>
            <div className="services-block_categories">
              <div className="services-block_category" style={styleFastline}>
                  <p className="services-block_category-name">Знакомьтесь,<br/> Фастлайн</p>
                  <p className="services-block_category-descr">Простой способ не тратить время на сложные формальности. Наши сотрудники сопроводят Вас на всех этапах прохождения контроля в аэропорту.</p>
                  <Link to="/" className="services-block_category-book btn">Забронировать</Link>
                  <Link to="/fastline" className="services-block_category-more">Узнать подробнее <span className="font-weight-bold">&#x27F6;</span></Link>

              </div>
              <div className="services-block_category" style={styleLounge}>
                  <p className="services-block_category-name">Атмосферная<br/> лаунж зона</p>
                  <p className="services-block_category-descr">Островок комфорта для роскошного отдыха. Вкуснейшие первые и вторые блюда, сочные фреши и охлаждающие напитки не оставят Вас равнодушным.</p>
                  <Link to="/" className="services-block_category-book btn">Забронировать</Link>
                  <Link to="/business-lounge" className="services-block_category-more">Узнать подробнее <span className="font-weight-bold">&#x27F6;</span></Link>
              </div>
              <div className="services-block_category" style={styleCovid}>
                  <p className="services-block_category-name">12&nbsp;часов<br/> вместо 14&nbsp;дней</p>
                  <p className="services-block_category-descr">Безопасность превыше всего. Не тратьте 14 дней на самоизоляцию - сдайте тест на Covid-19 по прилету и развейте сомнения. Результаты онлайн за 12 часов.</p>
                  <Link to="/" className="services-block_category-book btn">Забронировать</Link>
                  <Link to="/covid-test" className="services-block_category-more">Узнать подробнее <span className="font-weight-bold">&#x27F6;</span></Link>
              </div>
              <div className="services-block_category" style={styleShopping}>
                  <p className="services-block_category-name">Duty Free<br/> с доставкой</p>
                  <p className="services-block_category-descr">Экономия времени с Duty Free Online — выбирайте товары по специальной цене и получайте покупки в точке выдачи аэропорта или в самолете.</p>
                  <Link to="/" className="services-block_category-book btn">Забронировать</Link>
                  <Link to="/smart-duty-free" className="services-block_category-more">Узнать подробнее <span className="font-weight-bold">&#x27F6;</span></Link>
              </div>
            </div>
          </div>
    )
}
