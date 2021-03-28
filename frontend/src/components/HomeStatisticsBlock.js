import React from 'react';

export default function HomeStatisticsBlock() {
    return (
          <div className="stats-block-wrap">
              <div className="container stats-block">
            <div className="stats-airports">
                <span>Услуги доступны в аэропортах:</span>
                <div className="aiports-imgs">
                <img src="images/boryspil_logo.png" alt="boryspil logo" />
                <img src="images/odessa_logo.png" alt="odessa logo" />
                </div>
            </div>
            <div className="stats-numbers">
              <div>
                  <div className="stats-number">10,000</div>
                  <div className="stats-descr">Часов провели клиенты в бизнес зале</div>
              </div>
              <div>
                  <div className="stats-number">15 лет</div>
                  <div className="stats-descr">Предоставляем услуги для пассажиров</div>
              </div>
              <div>
                  <div className="stats-number">15х</div>
                  <div className="stats-descr">Проход формальностей с фастлайн в 15 раз быстрее</div>
              </div>
            </div>
            </div>
          </div>
    )
}