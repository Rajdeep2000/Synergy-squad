import React from 'react';
import {
  Button, Search, Tag, TagSkeleton
} from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import { useState } from 'react';
import { Camera, Categories, Microphone } from '@carbon/icons-react';
import { useEffect } from 'react';
import apiConfig from '../../config/apiConfig.json';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [list, setList] = useState();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setErrMsg] = useState();

  const getList = async () => {
    try {
      setLoading(true);
      setErrMsg();
      setSuccess(false);
      const result = await axios.get(apiConfig.list, {
        _: Date.now()
      });
      console.log(result);
      setList(result?.data);
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

  const filterResults = async (searchInput) => {
    try {
      setLoading(true);
      setErrMsg();
      setSuccess(false);
      const result = await axios.get(apiConfig.search, {
        _: Date.now()
      });
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

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div className='dashboard-container'>
        <div className='search-container'><Search size="lg" placeholder="Find your items" labelText="Search" closeButtonLabelText="Clear search input" id="search-1" onChange={(e) => { filterResults(e.target.value) }} />
          <Button hasIconOnly renderIcon={Camera}></Button>
          <Button hasIconOnly renderIcon={Microphone}></Button>
        </div>
        <div className='filter-container'>
          {!loading ? <div className='filter-inner-container'>
            {categories?.map(c => (<Tag className="some-class" type="outline" title="Clear Filter">
              {c}
            </Tag>))}
          </div> : <div className='filter-inner-container'>
            <TagSkeleton />
            <TagSkeleton />
            <TagSkeleton />
            <TagSkeleton />
          </div>}
        </div>
        <div className='product-list'>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
        {/* <div className='empty-container'>
          <div className='empty-title'>No fresh items</div>
          <br></br>
          <div className='empty-subtitle'>Your list is empty.Add products to see here</div>
        </div> */}

      </div>
      <div className='add-product'><Button onClick={e => { navigate("/form/new") }}>Add product</Button></div>
    </>
  )
}


export default Dashboard;