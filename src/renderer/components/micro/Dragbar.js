/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';

const { ipcRenderer } = electron;

/**
 * Draggable top bar for window
 */
export default () => (
  <div className="dragbar">
    <div />
    <div className="window-buttons" id="window-buttons">
      <div onClick={() => ipcRenderer.send('minimize')} className="window-button yellow">
        <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
          <rect fill="#975500" width="8" height="2" x="2" y="5" fillRule="evenodd" />
        </svg>
      </div>
      <div onClick={() => ipcRenderer.send('quit')} className="window-button red">
        <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
          <path stroke="#4c0000" fill="none" d="M8.5,3.5 L6,6 L3.5,3.5 L6,6 L3.5,8.5 L6,6 L8.5,8.5 L6,6 L8.5,3.5 Z" />
        </svg>
      </div>
    </div>
  </div>
);
