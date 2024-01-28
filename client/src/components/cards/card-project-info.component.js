// * Dependencies
// import React, {useState, useEffect} from "react";
import React from "react";
// import axios from 'axios';

// * Importing other Components
// import CardProjectInfo from './section-project-info.component.js';
import ItemMember from '../items/item-member.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './card-project-info.component.scss';

export default function CardProjectInfo(props) {
  // console.log('MOUNT CardProjectVertical()');
  // const [doneStatus, setDoneStatus] = useState(props.projectData.done);
  
  
  // function updateDoneStatus(passedDoneStatus) {
  //   setDoneStatus(passedDoneStatus);
  // };

  // * When "Edit" is clicked
  function onEditClick() {
    console.log(`RUN CardProjectInfo -> onEditClick()`); 
    window.location.href='/project/edit/' + props.projectData._id;
  };

  // * When "Delete" is clicked
  function onDeleteClick() {
    console.log(`RUN CardProjectInfo -> onDeleteClick()`); 
  };

  // * Render
  return (
    <div 
      className='card card-project-info'
    >
      <div className="card-body">
        <div className="group-1">
          <div className="left">
            <h5 className="card-title">{props.projectData.name}</h5>
          </div>
          <div className="right">
            <div className={
              "project-priority alert alert-"
              + ((props.projectData.priority === 'Low')
              ? 'success'
              : (props.projectData.priority === 'Medium')
              ? 'warning'
              : 'danger')
            }>{props.projectData.priority}</div>
            <div className="priority-due alert alert-secondary">
              {new Date(props.projectData.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        </div>
        <div className="group-2">
          <p className="card-text">{props.projectData.description}</p>
        </div>
        <div className="group-3">
          <div className="right">
            <div className="members">
              {             
                (props.projectData.members)
                  ? props.projectData.members.map(
                      (projectMember) => {
                        return (
                          <ItemMember
                            projectMember={projectMember}
                            key={projectMember._id}
                          />
                        )
                      }
                    )
                  : ''
              }
            </div>
          </div>
        </div>
        <div className="group-4">
          <div className="buttons">
            <button 
              className="edit btn btn-secondary"
              onClick={
                () => {
                  onEditClick()
                }
              }
              >
                Edit
            </button>
            <button 
              className="delete btn btn-danger"
              onClick={
                () => {
                  onDeleteClick()
                }
              }
              >
                Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};