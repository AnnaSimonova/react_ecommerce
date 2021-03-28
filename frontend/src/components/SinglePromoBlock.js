import React, { useEffect } from 'react';

export default function SinglePromoBlock(props) {
    const option = props.content;
    const blBlock = {
        _id: '6',
        name: 'Business Lounge',
        people: 1,
        hours: 3,
        totalSum: 1050,
        currency: '₴'
    }
    // const onClickActions = {
    //     Business_Lounge: props.add(blBlock),
    //     Fast_Line_Premium: props.loadContent('Fast Line Premium', 2)
    // }
    // useEffect(() => { 
    //     console.log(1);
    // });
    return (
           <div className="promos_block-main-block">
                  <img src={option.img} alt="promo img" className="w-100 bg-img"/>
                  <h5 className="m-4">{option.title}</h5>
                  <p className="mx-4 promos_block-main-descr">{option.description}</p>
                  {option.additional ?
                  (<h6 className="m-3"><img src={option.icon2} alt="icon" className="mr-2 my-3"/>{option.additional}</h6>) : ''
                  }
                  <div className="d-flex">
                  <p className="btn btn-light border-dark ml-4 mr-3 d-flex align-items-center justify-content-space-around" onClick={option.service_name==='Fast Line Premium' ? ()=>props.loadContent('Fastline', '2') : ()=>props.add(blBlock)}>{option.button} <img src={option.icon} alt="icon" className="ml-1"/></p>
                  <p className="d-flex align-items-center height-auto">
                  {option.new_price ?
                      (<span className="promo_new-price mr-2">{option.currency} {option.new_price}</span>) : ''
                  }
                  {option.old_price ?
                      <span className="promo_old-price">{option.currency} {option.old_price}</span> : ''
                  }
                  </p>
                  </div>
            </div>
            )
}
