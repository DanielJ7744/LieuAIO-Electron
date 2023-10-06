// @flow
import * as React from 'react';
import { ipcRenderer } from 'electron';
import plus from '../assets/actions/create.png';
import deleteIcon from '../assets/actions/Delete.svg';
import '../styles/Account.scss';
import minize from '../assets/actions/minimize.svg';
import closeIcon from '../assets/actions/Delete.svg';
import { useGlobal } from '../Context/GlobalContext';
import { MonitorGroups } from '../components/Monitor/MonitorGroups';
import { MonitorItem } from '../components/Monitor/MonitorItem';

export const Account = () => {
  const { AccountGroup, setAccountGroups, activeAccountGr, setActiveAccountGr } = useGlobal();
  return (
    <div>
      <div className="Account">
        <div className="account__header">
          <div className="AccountGroupText">
            <div className="Texts">
              <span className="Title">Accounts</span>
              <span className="subTitle">Manage accounts here</span>
            </div>
          </div>
          <div className="accountContentText">
            <div className="account__content__left">
              <span className="target">Target accounts</span>
            </div>
            <div className="account__content__right">
              <button type="button">
                <img src={plus} alt="plus" />
              </button>
              <button type="button">
                <img src={deleteIcon} alt="plus" />
              </button>
              <button type="button" onClick={() => ipcRenderer.send('minimize')} className="windowsButton">
                <img src={minize} alt="plus" />
              </button>
              <button type="button" onClick={() => ipcRenderer.send('quit')} className="windowsButton">
                <img src={closeIcon} alt="plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="Account__content">
          <div className="account__content">
            {AccountGroup &&
              AccountGroup.length > 0 &&
              AccountGroup.map((task, index) => <MonitorGroups key={task.id} Group={task} idx={index} active={task.id === activeAccountGr.id} setActive={setActiveAccountGr} />)}
          </div>
          <div className="target">
            <div className="target_content">
              <div className="target_content__header">
                <span className="header_id">Email</span>
                <span className="header__mode">Password</span>
                <span className="header__action">Actions</span>
              </div>
              <div className="target_content__body">{activeAccountGr && activeAccountGr?.accountArr.map((item, i) => <MonitorItem key={i} task={item} idx={i} />)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
