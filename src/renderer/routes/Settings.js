/* eslint-disable max-len */
import React, { useState } from 'react';

/* Redux dependencies */
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import Switch from 'react-switch';
import * as actions from '../actions';
import logout from '../assets/logout.png';

import keyIcon from '../assets/key.png';
import saveKey from '../assets/save.png';
import webhook from '../assets/webhook.png';
import Discord from '../assets/discord.png';
import download from '../assets/Download.png';
import wavingHand from '../assets/Waving Hand.png';
import '../styles/Setting.scss';
import { Border } from '../components/border';
// eslint-disable-next-line react/prefer-stateless-function
const Settings = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <div>
      <div className="Setting">
        <div className="SettingTitle">Settings</div>
        <Border />
        <div className="setting__header">
          <div className="UserSettingGroup">
            <div className="userSetting">User Settings</div>
            <div className="useSettingContent">
              <div className="leftPart">
                <div className="avarta">D</div>
                <div className="user__info__logout">
                  <div className="monthlyUser">Monthly User</div>
                  <div className="discordUser">Boss-1#8087</div>
                  <div className="logout">
                    <span>Log Out</span>
                    <img src={logout} alt="logout" />
                  </div>
                </div>
              </div>
              <div className="rightPart">
                <img src={wavingHand} alt="wavingHand" />
              </div>
            </div>
          </div>
          <div className="LicenseGroup">
            <div className="licensePart">
              <div className="License">License Key</div>
              <div className="LicenseKey">
                <input type="text" placeholder="A6B5J-K3T7C-A6B5J-K3T7C-K3T7C" />
              </div>
            </div>
            <div className="newPart">
              <div className="NextRenew">Next Renew</div>
              <div className="RemainGroup">
                <span className="remainDay">17 Days</span>
                <span className="progress">
                  <span />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="Setting__content">
          <div className="generalContent">
            <div className="keyHeader">
              <div className="Part">
                <img src={keyIcon} alt="keys" />
                <span>API Keys</span>
              </div>
              <div className="save">
                <span>Save</span>
                <img src={saveKey} alt="saveKey" />
              </div>
            </div>
            <Border />
            <div className="inputBox">
              <div className="general">
                <input type="text" placeholder="Capmonster API Key" />
              </div>
              <div className="general">
                <input type="text" placeholder="2captcha API Key" />
              </div>
              <div className="general">
                <input type="text" placeholder="Anticaptcha API Key" />
              </div>
              <div className="general">
                <input type="text" placeholder="AYCD API Key" />
              </div>
            </div>
          </div>

          <div className="discordContent">
            <div className="keyHeader">
              <div className="Part">
                <img src={Discord} alt="keys" />
                <span>Discord Webhooks</span>
              </div>
              <div className="tesWebhook">
                <span>Test Webhooks</span>
                <img src={webhook} alt="webhook" />
              </div>
            </div>
            <Border />
            <div className="inputBox">
              <div className="general">
                <input type="text" placeholder="Success Webhook" />
              </div>
              <div className="general">
                <input type="text" placeholder="Declines Webhook" />
              </div>
              <div className="general">
                <input type="text" placeholder="Notifications Webhook" />
              </div>
              <div className="general">
                <input type="text" placeholder="Show Username in Public Success" />
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  offColor="#121215"
                  onColor="#929292"
                  offHandleColor="#000"
                  onHandleColor="#FFF"
                  width={44}
                  height={20}
                  className="switch"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="setting__footer">
          <div className="updatePart">
            <div className="updates">
              <img src={download} alt="update" />
              <span>Updates</span>
            </div>
            <div className="borderVertical" />
            <div className="current">
              <span className="current__version">Current Version</span>
              <span className="beta">Beta-1.12</span>
            </div>
          </div>
          <div className="newVersion">
            <div className="new">
              <span className="new__version">New Version available !</span>
              <span className="beta">Beta-1.12</span>
            </div>
            <div className="borderVertical" />
            <div className="Downlaod">
              <span>Download</span>
              <img src={download} alt="update" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * mapStateToProps
 * maps reducer state to react props
 *
 * @param {any} state - reducer state
 *
 */
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, actions)(Settings);
