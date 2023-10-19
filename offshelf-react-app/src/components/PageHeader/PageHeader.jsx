import React, { useState } from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from '@carbon/react';
import { AddLarge, ArrowDown, FruitBowl, PiggyBank, Sustainability } from '@carbon/icons-react';
import { Settings } from '@carbon/icons-react';
import { User } from '@carbon/icons-react';
import apiConfig from '../../config/apiConfig.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PageHeader = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setErrMsg] = useState();
  
  const logout = async () =>{
    try {
      const result = await axios.get(apiConfig.logout, {
         
      },{
        headers:{
          'Authorization':`Token ${window.sessionStorage.getItem('token')}`
        }
      });
      if (result?.data) {
        setDetails(result?.data?.[0]);
      }
      navigate('/login');
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

 return( <HeaderContainer

    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header className="header-container" aria-label="Off shelf">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="/" prefix="">
          <div className='menu-icons'><Sustainability style={{ fill: '#42be65' }} /> Off Shelf</div>
        </HeaderName>
        <HeaderNavigation aria-label="Off shelf">
          <HeaderMenuItem href="/dashboard"><div className='menu-icons'><FruitBowl />Fresh items</div></HeaderMenuItem>
          <HeaderMenuItem href="/dashboard"><div className='menu-icons'><PiggyBank />Savings</div></HeaderMenuItem>
          <HeaderMenuItem href="/form/new"><div className='menu-icons'><AddLarge />Add product</div></HeaderMenuItem>
          <HeaderMenuItem href="/"><div className='menu-icons'><Settings />Settings</div></HeaderMenuItem>
          <HeaderMenuItem onClick={()=>{logout()}}><div className='menu-icons'><User />Log out</div></HeaderMenuItem>
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
        >
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem href="/repos"><div className='menu-icons'><FruitBowl />Fresh items</div></HeaderMenuItem>
              <HeaderMenuItem href="/repos"><div className='menu-icons'><PiggyBank />Savings</div></HeaderMenuItem>
              <HeaderMenuItem href="/repos"><div className='menu-icons'><AddLarge />Add product</div></HeaderMenuItem>
              <HeaderMenuItem href="/repos"><div className='menu-icons'><Settings />Settings</div></HeaderMenuItem>
              <HeaderMenuItem href="/repos"><div className='menu-icons'><User />Profile</div></HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
        <HeaderGlobalBar />
      </Header>
    )}
  />)
    };

export default PageHeader;