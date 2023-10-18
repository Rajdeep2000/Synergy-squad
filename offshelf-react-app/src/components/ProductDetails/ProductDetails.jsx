import React from 'react';
import {
  Button, Search, Tag, ClickableTile, Tile
} from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import pImg from '../../assets/sample.jpg';
import { ArrowLeft, ArrowRight, Checkmark, Need, TrashCan, ViewOff } from '@carbon/icons-react';
const ProductDetails = () => {
  const navigate = useNavigate();
  return (
    <div className='product-container'>
      <div style={{ width: '100%', marginLeft: '-2rem' }}><div className='product-title-container'>
        <Button hasIconOnly renderIcon={ArrowLeft} kind="tertiary"></Button>
        <div className='product-title-inner-container'>
          <div className='product-title'>Tomato</div>
          <div className='product-category'>Vegetable</div>
        </div>
      </div>
      </div>
      <div className='product-image-container'>
        <img src={pImg} />
      </div>
      <div className='buttons-container'>
        <Button hasIconOnly renderIcon={Checkmark} iconDescription='Consume' kind="tertiary"></Button>
        <Button hasIconOnly renderIcon={TrashCan} kind="tertiary"></Button>
        <Button hasIconOnly renderIcon={Need} kind="tertiary"></Button>
        <Button hasIconOnly renderIcon={ViewOff} kind="tertiary"></Button>
      </div>
      <div className='product-tiles-container'>
        <Tile><div className='product-tiles-title'>Stock</div>
          <div className='product-unit' >10 units</div>
          <div className='expiry'>5 days</div></Tile>

        <Tile><div className='product-tiles-title'>Stock</div>
          <div className='product-unit'>10 units</div>
          <div className='expiry'>5 days</div></Tile>
        <Tile><div className='product-tiles-title'>Stock</div>
          <div className='product-unit'>10 units</div>
          <div className='expiry'>5 days</div></Tile>

        <Tile><div className='product-tiles-title'>Stock</div>
          <div className='product-unit'>10 units</div>
          <div className='expiry'>5 days</div></Tile>

      </div>
    </div >
  )
}


export default ProductDetails;