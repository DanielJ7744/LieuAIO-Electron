// @flow
import * as React from 'react';

import { useState } from 'react';
import editIcon from '../../assets/profiles icons/edit.png';
import deleteIcon from '../../assets/profiles icons/delete.png';
import profileIcon from '../../assets/profiles icons/user.png';
import masterCard from '../../assets/profiles icons/masterCard.png';
import masterActiveCard from '../../assets/profiles icons/img.png';
import { Border } from '../border';
import { ipcRenderer } from 'electron';

// eslint-disable-next-line import/prefer-default-export
export const ProfileItem = ({ profile, activeProfile, setProfile, idx }) => {
  const header = 'ItemHeader';
  const [active, setActive] = useState(false);
  const profileItem = active ? 'profileItem activeProfileItem' : 'profileItem';
  const HandleSelect = (data) => {
    // if (activeProfile.id === idx) {
    //   setActive(true);
    // }
    // setProfile(profile);
    console.log(data);
    console.log(activeProfile);
  };
  const DeleteItem = (data) => {
    const DeleteSingleTask = profile.filter((t) => t.id !== data.id);
    setProfile(DeleteSingleTask);
    ipcRenderer.send('delete-group-profile', idx, DeleteSingleTask);
  };
  return (
    <div className="target_content__body">
      {profile &&
        profile.length > 0 &&
        profile.map((item, i) => (
          <div className={profileItem} onClick={(e) => HandleSelect(item.id)} key={i}>
            <div className={header}>
              <div className="profileItem__header">
                <img src={profileIcon} alt="profileIcon" />
                <span className="name">{item.name}</span>
              </div>
              <Border />
              <div className="ItemContent">
                <div className="profileName">{item.fullName}</div>
                <div className="address">{item.name}</div>
              </div>
              <Border />
            </div>
            <div className="Item__Footer">
              <div className="cardNumber">
                {/* {active ? <img src={masterActiveCard} alt="masteCard" /> : <img src={masterCard} alt="masteCard" />} */}
                <span>{item.key}</span>
              </div>
              <div className="actionBtns">
                <img src={editIcon} alt="editIcon" />
                <img src={deleteIcon} alt="deleteIcon" onClick={() => DeleteItem(item)} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
