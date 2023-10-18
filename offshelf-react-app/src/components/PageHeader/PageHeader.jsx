import React from 'react';
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

const PageHeader = () => (
  <HeaderContainer

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
          <HeaderMenuItem href="/repos"><div className='menu-icons'><FruitBowl />Fresh items</div></HeaderMenuItem>
          <HeaderMenuItem href="/repos"><div className='menu-icons'><PiggyBank />Savings</div></HeaderMenuItem>
          <HeaderMenuItem href="/repos"><div className='menu-icons'><AddLarge />Add product</div></HeaderMenuItem>
          <HeaderMenuItem href="/repos"><div className='menu-icons'><Settings />Settings</div></HeaderMenuItem>
          <HeaderMenuItem href="/repos"><div className='menu-icons'><User />Profile</div></HeaderMenuItem>
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
  />
);

export default PageHeader;