import React, { useState } from 'react';

/* Redux dependencies */
import { connect } from 'react-redux';
// import { ipcRenderer } from 'electron';
import * as actions from '../actions';

import '../styles/Dashboard.scss';
import { Border } from '../components/border';
import { Search } from '../components/search';

import arrowRight from '../assets/arrowRight.png';
import productIcon from '../assets/image 31.png';
import profileIcon from '../assets/profileIcon.png';
import mastercard from '../assets/profiles icons/masterCard.png';
import { Release } from '../components/release';
import { useHorizontalScroll } from '../components/useSideScroll';

const Dashboard = () => {
  const data = Array(10).fill('');
  const [release, setRelease] = useState([
    {
      id: 1,
      product: productIcon,
      site: 'Nike SB Dunk Low Brazil',
      siteproduct: 'Drop',
      dates: 'Tomorrow',
      datestime: '4 PM EST',
      siteNma: 'Footsites',
    },
    {
      id: 2,
      product: productIcon,
      site: 'Nike SB Dunk Low',
      siteproduct: 'Raffle',
      dates: 'Thu 23th, Jan',
      datestime: '23 Sites',
      siteNma: '#Sitelist',
    },
    {
      id: 3,
      product: productIcon,
      site: 'Nike SB Dunk Low',
      siteproduct: 'Raffle',
      dates: 'Thu 23th, Jan',
      datestime: '23 Sites',
      siteNma: '#Sitelist',
    },
    {
      id: 4,
      product: productIcon,
      site: 'Nike SB Dunk Low',
      siteproduct: 'Raffle',
      dates: 'Thu 23th, Jan',
      datestime: '23 Sites',
      siteNma: '#Sitelist',
    },
  ]);
  const [activeRelese, setActiveRelease] = useState(release[0]);
  const scrollRef = useHorizontalScroll();

  return (
    <div style={{ height: '100%' }}>
      <div className="dashboard">
        <div className="dashHeader">
          <div className="userDash">Hey Boss-1#8087</div>
          <div className="releasePart">
            <div className="allRelease">All Releases</div>
            <div className="DayRelease">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
            <Search plchldr="Search Release" />
          </div>
        </div>
        <div className="dashBottom">
          <Border />
        </div>

        <div className="releaseProducts">
          <span>Raffles/Releases</span>
          <div className="Swipe">
            <span>Swipe for more</span>
            <img src={arrowRight} alt="swipe for more" />
          </div>
        </div>
        <div className="releaseContent" ref={scrollRef}>
          {release.map((item, index) => (
            <Release key={item.id} item={item} idx={index} active={item.id === activeRelese.id} setActive={setActiveRelease} />
          ))}
        </div>
        <Border />
        <div className="dashBody">
          <div className="Checkouts">Checkouts</div>
          <div className="releasePart">
            <div className="allRelease">All Checkouts</div>
            <div className="DayRelease">
              <span>Daily</span>
              <span>Monthly</span>
              <span>Last 90 days</span>
            </div>
            <Search plchldr="Search Checkouts" />
          </div>
        </div>
        <div className="dash_bodyContent">
          {data.map((item, i) => (
            <div className="checkoutContent" key={i}>
              <img src={productIcon} alt="product" className="productImg" />
              <span className="product__name">Nike Sb Dunk Low Brazil</span>
              <span className="site__name">Eastbay US</span>
              <span className="profile">
                <img src={profileIcon} alt="profileIcon" />
                <span className="profile__name">Profile Name 1</span>
              </span>
              <span className="masterCard">
                <img src={mastercard} alt="mastercard" />
                <span className="maserCardNumber">1234</span>
              </span>
              <span className="orderNumber">Order #7012</span>
              <span className="Date">Today</span>
              <span className="price">
                <span className="dollar">$</span>
                <span className="priceNumber">100</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * maps reducer state to react props
 *
 * @param {any} state - reducer state
 *
 */
const mapStateToProps = () => ({});

export default connect(mapStateToProps, actions)(Dashboard);
