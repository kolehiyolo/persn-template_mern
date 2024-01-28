// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
import ItemAvatarCircle from '../items/item-avatar-circle.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './section-project-info.component.scss';

export default function SectionProjectInfo(props) {
  // console.log('MOUNT SectionProjectInfo()');

  function truncateDescription(description) {
    const stringWithoutNewlines = description.replace(/\n/g, ' ');
  
    if (stringWithoutNewlines.length <= 100) {
      return stringWithoutNewlines;
    }
  
    const truncatedString = stringWithoutNewlines.substring(0, 100);
    const lastSpaceIndex = truncatedString.lastIndexOf(' ');
  
    const resultString = lastSpaceIndex === -1 ? truncatedString : truncatedString.substring(0, lastSpaceIndex);
  
    return `${resultString}...`;
  };

  // * When "More Info" is clicked
  function onMoreInfoClick() {
    console.log(`RUN SectionProjectInfo -> onMoreInfoClick()`); 
    window.location.href='/project/' + props.projectData._id;
  };

  // * When "Edit" is clicked
  function onEditClick() {
    console.log(`RUN SectionProjectInfo -> onEditClick()`); 
    window.location.href='/project/edit/' + props.projectData._id;
  };

  // * When "Delete" is clicked
  function onDeleteClick() {
    console.log(`RUN SectionProjectInfo -> onDeleteClick()`); 
  };

  // * Render
  return (
    <div 
      className="section-project-info"
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
          <p className="card-text">{truncateDescription(props.projectData.description)}</p>
        </div>
        <div className="group-3">
          <div className="right">
            <div className="members">
                {
                  props.projectData.members.map(
                    (projectMember) => {
                      return (
                        <ItemAvatarCircle
                          userID={projectMember._id}
                          key={projectMember._id}
                        />
                      )
                    }
                  )
                }
            </div>
          </div>
        </div>
        <div className="group-4">
          <div className="buttons">
            <button 
              className="more-info btn btn-primary"
              onClick={
                () => {
                  onMoreInfoClick()
                }
              }
              >
                More Info
            </button>
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
            {/* <button 
              className="delete btn btn-danger"
              onClick={
                () => {
                  onDeleteClick()
                }
              }
              >
                Delete
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}