import React from 'react';
import FastlineOption from './FastlineOption';
import FastlineOptionForm from './FastlineOptionForm';
// import PromosBlock from './PromosBlock';
import BLoungeOptionForm from './BLoungeOptionForm';
import CovidOptionForm from './CovidOptionForm';
import Accordion from 'react-bootstrap/Accordion';
import data from '../data.js';

export default function BookingMainContent(props) {
    let showFlForm = props.showFlForm[0];
    const flOptions = data.fastlineOptions;
    function updateFlForm(val) {
        props.showFlForm[1](val);
    }

    const content = props.content === 'Fastline' ? (
        !props.showFlForm[0] ? (
            <>
            <h5 className="mx-auto">Какой пакет с  опциями вам подходит?</h5>
            <Accordion>
            {flOptions.map((option) => (
            <FastlineOption key={option._id} option={option} action={props} showForm={(value)=>updateFlForm(value)}></FastlineOption>
            ))}
            </Accordion> 
            </>
        ) :
        (
        <>
        <FastlineOptionForm optionForm={flOptions.find(x => x._id===showFlForm)} showForm={(value)=>updateFlForm(value)} action={props}></FastlineOptionForm>
        </>
        ))
        : 
        (props.content === 'Business Lounge') ? (
            <BLoungeOptionForm optionForm={data.businessLoungeOptions[0]} action={props}></BLoungeOptionForm>
        )
        :
        (
            <CovidOptionForm optionForm={data.covidOptions[0]} action={props}></CovidOptionForm>
        );
        
        return (
        <>
        {content}
        </>
    )
}
