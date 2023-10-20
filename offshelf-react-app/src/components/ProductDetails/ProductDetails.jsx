import React from 'react';
import {
  Button, Search, Tag, ClickableTile, Tile
} from '@carbon/react';
import { useNavigate, useParams } from 'react-router-dom';
import pImg from '../../assets/no-image.svg';
import { ArrowLeft, ArrowRight, Checkmark, Need, TrashCan, ViewOff } from '@carbon/icons-react';
import { useEffect } from 'react';
import { useState } from 'react';
import apiConfig from '../../config/apiConfig.json';
import axios from 'axios';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setErrMsg] = useState();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

  const getDetails = async () => {
    try {
      const result = await axios.get(apiConfig.search, {
        name: name
      });
      if (result?.data) {
        setDetails(result?.data?.[0]);
      }
      setLoading(false);
    } catch (err) {
      if (await err.response) {
        const str = await Object.values(err.response?.data).join('\n');
        setErrMsg(str);
      }
      else {
        setErrMsg("Unexpected error occurred")
      }
      setLoading(false)
    }
  }


  useEffect(() => { getDetails() }, [])

  return (
    <div className='product-container'>
      <div style={{ width: '100%', marginLeft: '-2rem' }}><div className='product-title-container'>
        <Button hasIconOnly onClick={e=>{navigate(-1)}} renderIcon={ArrowLeft} kind="tertiary"></Button>
        <div className='product-title-inner-container'>
          <div className='product-title'>{details?.name ? details.name : ''}</div>
          <div className='product-category'>{details?.type ? details.type : ''}</div>
        </div>
      </div>
      </div>
      <div className='product-image-container'>
        <img src={details?.image_file ? details.image_file:pImg} />
      </div>
      <div className='buttons-container'>
        <Button hasIconOnly renderIcon={Checkmark} iconDescription='Consume' kind="tertiary"></Button>
        <Button hasIconOnly renderIcon={TrashCan} kind="tertiary"></Button>
        <Button hasIconOnly renderIcon={Need} kind="tertiary"></Button>
        <Button hasIconOnly renderIcon={ViewOff} kind="tertiary"></Button>
      </div>
      <div className='product-tiles-container'>
        <Tile><div className='product-tiles-title'>Stock</div>
          <div className='product-unit' >{`${details?.quantity} units`}</div>
          </Tile>

        <Tile><div className='product-tiles-title'>Expires in</div>
          <div className='product-unit'></div>
          <div className='product-unit'>{`${(new Date(details?.expiry_date).toLocaleDateString(undefined, options))}`}</div>
        </Tile>
        <Tile><div className='product-tiles-title'>Tracked for</div>
          <div className='product-unit'>1 day</div>
          <div className='expiry'></div></Tile>

        <Tile><div className='product-tiles-title'>Open life</div>
          <div className='product-unit'>0 days</div>
          <div className='expiry'></div></Tile>

      </div>
    </div >
  )
}


export default ProductDetails;