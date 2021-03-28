import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeMainBanner() {
   
    return (
          <div className="main-banner container">
              <div className="main-banner_left">
                  <h1>Обеспечиваем комфорт в аэропортах и экономим время</h1>
                  {/* <div className="main-banner_right-mob display-none display-lg-flex" >
                      <img src="/images/airstairs.png" alt="airstairs with heart pic"/>
                  </div> */}
                  <div className="main-banner_left-icons">
                      <Link to="/fastline">
                          <figure>
                              <img src="images/fastline_icon.png" alt="fastline icon" />
                              <figcaption>Фастлайн</figcaption>
                          </figure>
                      </Link>
                      <Link to="/business-lounge">
                          <figure>
                              <img src="images/lounge_icon.png" alt="lounge zone icon" />
                              <figcaption>Лаунж зона</figcaption>
                          </figure>
                      </Link>
                      <Link to="/covid-test">
                          <figure>
                              <img src="images/covid_icon.png" alt="covid-19 test icon" />
                              <figcaption>Covid-19 Тест</figcaption>
                          </figure>
                      </Link>
                      {/* <Link to="/smart-duty-free">
                          <figure>
                              <img src="images/shopping_icon.png" alt="shopping icon" />
                              <figcaption>Шоппинг</figcaption>
                          </figure>
                      </Link> */}
                  </div>
                  <Link to="/" className="main-banner_left-link">Войти в зону комфорта <span className="font-weight-bold">&#x27F6;</span></Link>
               </div>
             {/* <div className="main-banner_right" >
                  <img src="/images/airstairs.png" alt="airstairs with heart pic" className="main-banner_right-pic"/>
              </div> */}
          </div>
    )
}