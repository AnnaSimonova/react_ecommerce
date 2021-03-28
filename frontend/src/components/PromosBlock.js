import React from 'react';
import SinglePromoBlock from './SinglePromoBlock';

export default function PromosBlock(props) {
    const list = props.blocksList;
    let blocksList = list;
    if (list.length === 3) {
        blocksList = list.filter(function(item) {
            return item.service_name !== 'Covid-19';
        });
    } else if (list.length === 1) {
        list.push(props.optionalBlock);
    }
    
    return props.blocksList.length > 0 ?
     (
        <div className="promos_block">
              <h4 className="font-weight-bold mt-5 m3-4">Дополните корзину и получите скидку</h4>
              <div className="promos_block-main">
              {blocksList.map((option) => (
                  <SinglePromoBlock key={option._id} content={option} add={props.add} loadContent={(name, id)=>props.loadContent(name, id)}></SinglePromoBlock>
              ))}
              </div>
        </div>
    ) : null;
}