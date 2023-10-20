import React, { useState, useEffect } from 'react';
import {
  Button, ClickableTile, Loading, Tile, ToastNotification
} from '@carbon/react';
import VoiceInput from '../VoiceInput/VoiceInput';
import { Link, useNavigate } from 'react-router-dom';

const VoiceInputContainer = () => { 
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [quantity, setQuantity] = useState();
  const [expiry, setExpiry] = useState();  

  useEffect(() => { if(name && type && quantity ){
      navigate(`/form/output/${name}/${type}/${quantity}`)
  }}, [name, type, quantity])

  return (
    <div className='voice-input-container'>
       {!name && !type && !quantity && !expiry ?  <div className='label'>
        <div>Name of the product</div>
       <VoiceInput name={name} setName={setName}/></div> :<></>}
       {name && !type && !quantity && !expiry ?  <div className='label'>
        <div>Type of the product</div>
       <VoiceInput name={type} setName={setType}/></div> :<></>}
       {name && type && !quantity && !expiry ?  <div className='label'>
        <div>Quantity of the product</div>
       <VoiceInput type="quantity" name={quantity} setName={setQuantity}/></div> :<></>}
       {/* {name && type && quantity && !expiry ?  <div className='label'>
        <div>Expiry date of the product in the format MM/DD/YYYY</div>
       <VoiceInput type="expiry"  name={expiry} setName={setExpiry}/></div> :<></>} */}
    </div>
  );
}

export default VoiceInputContainer;