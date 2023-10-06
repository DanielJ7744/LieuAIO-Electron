// @flow
import * as React from 'react';
import { useState } from 'react';
import '../../styles/Profile.scss';
import deleteIcon from '../../assets/actions/Delete.svg';
import deleteIconInActive from '../../assets/actions/Delete-inActive.svg';

export const ProfileGroup = ({ profileGroup, idx, active, setActive, deleteTaskGroup }) => {
  // eslint-disable-next-line no-useless-concat
  const className = active ? 'ProfileGroup__content ' + 'activeProfileGroup' : 'ProfileGroup__content';
  const HandleSelect = () => {
    setActive(profileGroup);
  };
  return (
    <div className={className} onClick={HandleSelect}>
      <div className="tasksGroup">
        <div className="groupHeader">
          <div className="__taskGroup__header">
            <span className="name">{profileGroup.taskArr.length} Profiles</span>
            <span className="taskNumber">
              <span>{profileGroup.name}</span>
            </span>
          </div>
        </div>
        <div className="__taskGroup__delete" onClick={(e) => deleteTaskGroup(profileGroup)}>
          {active ? <img src={deleteIcon} alt="deleteIcon" /> : <img src={deleteIconInActive} alt="deleteIcon" />}
        </div>
      </div>
    </div>
  );
};
export default ProfileGroup;
