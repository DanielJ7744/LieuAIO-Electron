// @flow
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import product from '../assets/image 31.png';
import createTask from '../assets/actions/create.png';

export const Release = ({ item, idx, active = false, setActive }) => {
  const className = active ? 'everyProduct activeProduct' : 'everyProduct';
  const history = useHistory();
  const handleSelect = () => {
    setActive(item);
  };
  const CreateTasksPage = () => {
    history.replace('/task');
  };
  return (
    <div className={className} onClick={handleSelect}>
      <div className="every_header">
        <span className="rel_site">{item.site}</span>
        <span className="rel__products">{item.siteproduct}</span>
      </div>
      <div className="every_body">
        <div className="productTask">
          <img src={item.product} alt="product" className="relProduct" />
          <div className="rel_state" />
          <div className="rel_state_second" />
          <div className="CreateTasks" onClick={CreateTasksPage}>
            <span>Create Tasks</span>
            <img src={createTask} alt="createTasks" />
          </div>
        </div>
        <div className="rel_time_site">
          <div className="rel_time">
            <div className="Dates">{item.dates}</div>
            <div className="datesTime">{item.datestime}</div>
          </div>
          <div className="rel_sites">
            <div className="siteNma">Sitelist</div>
            <div className="siteNmas">{item.siteNma}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Release;
