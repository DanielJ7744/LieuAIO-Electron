// @flow
import * as React from 'react';

export const SettingGroups = ({ Group, setActive, active = false, idx }) => {
  const handleSelect = () => {
    setActive(Group);
  };
  const className = active ? 'settingGroup__content ' + 'activesettingGroup' : 'settingGroup__content';

  return (
    <div className={className} onClick={handleSelect}>
      <div className="tasksGroup">
        <div className="groupHeader">
          <div className="targetLogo__header">
            <div className="targetLogo">
              <img src={Group.logo} alt="logo" />
            </div>
            <div className="__taskGroup__header">
              <span className="name">{Group.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingGroups;
