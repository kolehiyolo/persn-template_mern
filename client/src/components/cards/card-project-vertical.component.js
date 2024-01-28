// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
import CardProjectInfo from '../sections/section-project-info.component.js';
import CardProjectTasks from '../sections/section-project-tasks.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './card-project-vertical.component.scss';

export default function CardProjectVertical(props) {
  // console.log('MOUNT CardProjectVertical()');
  const [doneStatus, setDoneStatus] = useState(props.projectData.done);
  
  
  function updateDoneStatus(passedDoneStatus) {
    setDoneStatus(passedDoneStatus);
  };

  // * Render
  return (
    (props.filterMode == 'Not Done' && doneStatus)
    ? ''
    : <div 
        className='card card-project-vertical'
        id={'card-project-vertical-'+props.projectData._id}
      >
        <CardProjectInfo 
          projectData={props.projectData}
        />
        <CardProjectTasks 
          projectData={props.projectData}
          currentUser={props.currentUser}
          updateDoneStatus={updateDoneStatus}
        />
      </div>
  );
};