/* eslint-disable */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import * as React from 'react';
import { NavLink as Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { ipcRenderer } from 'electron';

function maximize() {
  ipcRenderer.send('maxamize');
}

function hideWindow() {
  ipcRenderer.send('minimize');
}

function closeMainWindow() {
  ipcRenderer.send('quit');
}

/**
 * Navbar/Sidebar
 */
export default () => (
  <div className="navbar">
    <div className="window-buttons" id="window-buttons">
      <div id="close" className="window-button window-button--red" onClick={closeMainWindow}></div>
      <div id="min" className="window-button window-button--yellow" onClick={hideWindow}></div>
      <div id="max" className="window-button window-button--green" onClick={maximize}></div>
    </div>
    <div className="nav-logo">
      <img src={Logo} style={{ width: 50, height: 50 }} alt="logo" />
      <div className="botTitle">LieuAIO</div>
    </div>
    <div className="highlightUser">
      <div className="userStatus">
        <div className="UserInfos">
          <div className="userIcon">D</div>
          <div className="userInfo">
            <span className="signUser">Deriv#6066</span>
            <span className="monthly__plan">Monthly Plan</span>
          </div>
        </div>

        <div className="status" />
      </div>
    </div>
    <div className="nav-items">
      <Link exact to="/" className="nav__item">
        <div className="animation__wrapper">
          <div className="sidebarTitle">Home</div>
          <div className="default">
            <div className="analytics-animation" />
          </div>
        </div>
      </Link>
      <Link exact to="/task" className="nav__item">
        <div className="animation__wrapper">
          <div className="sidebarTitle">Tasks</div>
          <div className="default">
            <div className="task-animation " />
          </div>
        </div>
      </Link>
      <Link exact to="/monitor" className="nav__item">
        <div className="animation__wrapper">
          <div className="sidebarTitle">Monitors</div>
          <div className="default">
            <div className="monitor-animation " />
          </div>
        </div>
      </Link>
      <Link exact to="/profile" className="nav__item">
        <div className="animation__wrapper">
          <div className="sidebarTitle">Profiles</div>
          <div className="default">
            <div className="profile-animation " />
          </div>
        </div>
      </Link>
      <Link exact to="/proxy" className="nav__item">
        <div className="animation__wrapper">
          <div className="sidebarTitle">Proxies</div>
          <div className="default">
            <div className="proxy-animation " />
          </div>
        </div>
      </Link>
      <Link exact to="/settings" className="nav__item">
        <div className="animation__wrapper">
          <div className="sidebarTitle">Settings</div>
          <div className="default">
            <div className="settings-animation " />
          </div>
        </div>
      </Link>
    </div>
    <div className="nav__footer" style={{ fontWeight: 'bold' }}>
      Status Operational
    </div>
  </div>
);
