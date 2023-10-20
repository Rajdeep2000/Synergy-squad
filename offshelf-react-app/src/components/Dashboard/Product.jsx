import React from 'react';
import {
  Button, Search, Tag, ClickableTile
} from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import pImg from '../../assets/no-image.svg';
import { ArrowRight } from '@carbon/icons-react';
const Product = ({ details }) => {
  const navigate = useNavigate();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className='products'>
      <ClickableTile id={`tile-${details.name}`} onClick={e => { navigate(`/product-details/${details.name}`) }}>
        <div className='products-details'>
          <div className='product-img-container'>
            <img alt="no-image" src={details?.image_file ? `${details.image_file}` : pImg} width="100" height="60"></img>
            </div>
          <div className='products-info'>
            <div className='products-name'>{details.name}</div>
            <div className='products-category'>{details.type}</div>
            <div className='products-expiry-date'>{`Use by: ${(new Date(details.expiry_date).toLocaleDateString(undefined, options))}`}</div></div>
          <ArrowRight />
        </div>

      </ClickableTile>

    </div>
  )
}


export default Product;