import React from 'react';
import {
  Button, Search, Tag, ClickableTile
} from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import pImg from '../../assets/sample.jpg';
import { ArrowRight } from '@carbon/icons-react';
const Product = () => {
  const navigate = useNavigate();
  return (
    <div className='products'>
      <ClickableTile id="tile-1">
        <div className='products-details'>
          <img src={pImg} width="100" height="60"></img>
          <div className='products-info'>
            <div className='products-name'>Carrot</div>
            <div className='products-category'>Vegtables</div>
            <div className='products-expiry-date'>7 days</div></div>
          <ArrowRight />
        </div>

      </ClickableTile>

    </div>
  )
}


export default Product;