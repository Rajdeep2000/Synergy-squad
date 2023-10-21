import React from 'react';
import {
  Button, Loading, Search, Tag, TagSkeleton
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
  const [error, setErrMsg] = useState();
  const [originalList, setOriginalList] = useState();
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState();

  const getList = async () => {
    try {
      setLoading(true);
      setErrMsg();
      const result = await axios.get(apiConfig.list, {
        _: Date.now()
      });
      if (result?.data) {
        let categ = [];
        result.data.forEach(r => {
          if(!categ.includes(r.type))
          categ.push(r.type);
        })
        setCategories(categ);
        setList(result?.data);
        setOriginalList(result?.data);
      }
      else {
        setList();
        setOriginalList();
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

  useEffect(() => {
    getList();
  }, []);

   useEffect(() => {
    if (filter) {
      let tempList = [...originalList].filter(l => l.type === filter);
      setList(tempList);
    }
    else {
      setList(originalList)
    }
  }, [filter])

  useEffect(() => {
    if (search) {
      let tempList = [...originalList].filter(l => l.name.toLowerCase().includes(search.toLowerCase()));
      setList(tempList);
    }
    else {
      setList(originalList)
    }
  }, [search]) 

  return (
    <>
      <div className='dashboard-container'>
        <div className='search-container'>
          <Search size="lg" placeholder="Find your items" labelText="Search" closeButtonLabelText="Clear search input" id="search-1" onChange={(e) => { setSearch(e.target.value) }} />
          <Button hasIconOnly tooltipPosition="bottom" iconDescription='Scan to search' renderIcon={Camera}></Button>
          <Button hasIconOnly tooltipPosition="bottom" iconDescription='Search via voice input' renderIcon={Microphone}></Button>
        </div>
        <div className='filter-container'>
          {!loading ? <div className='filter-inner-container'>
            {categories?.map((c) => (<Tag className="some-class" onClick={() => { if (c !== filter) setFilter(c); else setFilter(); }} type={filter===c ? "high-contrast":"outline"}>
              {c}
            </Tag>))}
          </div> : <div className='filter-inner-container'>
            <TagSkeleton />
            <TagSkeleton />
            <TagSkeleton />
            <TagSkeleton />
          </div>}
        </div>

        {loading ? <Loading/> : list?.length > 0 ?
         <div className='product-list'> {list.map(l => <Product details={l} />)}</div>
          : <div className='empty-container'>
            <div className='empty-title'>No fresh items</div>
            <br></br>
            <div className='empty-subtitle'>Your list is empty. Add products to see here</div>
          </div>
        }

      </div>
      <div className='add-product'><Button onClick={e => { navigate("/form/new") }}>Add product</Button></div>
    </>
  )
}


export default Dashboard;