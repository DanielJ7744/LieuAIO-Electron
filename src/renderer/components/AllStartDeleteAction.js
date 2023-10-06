// @flow
import * as React from 'react';
import startIcon from '../assets/actions/start.svg';
import deleteIcon from '../assets/actions/Delete.svg';

export const AllStartDeleteAction = ({ deleteTaskHandler, task }) => (
  <span className="content__action">
    <img src={startIcon} alt="start" className="startIcon" />
    <img src={deleteIcon} alt="delete" onClick={() => deleteTaskHandler(task)} className="deleteIcon" />
  </span>
);

export default AllStartDeleteAction;
