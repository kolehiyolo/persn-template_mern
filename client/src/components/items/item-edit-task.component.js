// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';

// * Importing other Components
import ItemAvatarCircle from './item-avatar-circle.component.js';
import PopupEditTask from '../popup/popup-edit-task.component.js';

// * Importing images/SVG
import { ReactComponent as SVGPencil } from '../../svg/pencil.svg';
import { ReactComponent as SVGTrash } from '../../svg/trash.svg';

// * Stylesheets
// import './item-task.component.scss';

export default function ItemEditTask(props) {
  // console.log('MOUNT ItemTask()');
  // const [taskData, setTaskData] = useState({
  //   name: '',
  //   owner: '',
  //   due: '',
  // });
  // const [doneState, setDoneState] = useState(false);
  const [updatedTaskData, setUpdatedTaskData] = useState();
  const [showEditModal, setShowEditModal] = useState(false);

  // * Fetch Task Data from DB on mount
  // useEffect(
  //   () =>{
  //     fetchTaskData(props.taskID);
  //   },
  //   [props.taskID]
  // );

  function handleEditShow() {
    console.log('handleEditShow()');
    setShowEditModal(true);
  };

  function handleEditClose() {
    setShowEditModal(false);
  };


  function onEditClick() {
    console.log('onEditClick()');
    handleEditShow();
  };

  function onDeleteClick() {
    console.log('onDeleteClick()');
  };

  // * Render
  return (
    (props.filterMode === 'My Tasks' && props.taskData.owner !== props.currentUser)
    ? ''
    : <div className='card card-item-task'>
        <div className='item-task'>
          <div className='group-1'>
            <ItemAvatarCircle
              userID={props.taskData.owner}
              key={props.taskData.owner}
              parent='ItemEditTask'
            />
            <p>{props.taskData.name}</p>      
          </div>
          <div className='group-2'>
            <span className="priority-due badge text-bg-secondary">
              {new Date(props.taskData.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            {/* <button
              className='edit-btn'
              onClick={
                () => {
                  onEditClick();
                }
              }
            >
              <SVGPencil />
            </button>
            <button
              className='trash-btn'
              onClick={
                () => {
                  onDeleteClick();
                }
              }
            >
            </button> */}
            <Button
              variant="primary"
              onClick={onEditClick}
            >
              <SVGPencil />
            </Button>
            <PopupEditTask
              taskData={props.taskData}
              showEditModal={showEditModal}
              setShowEditModal={setShowEditModal}
              handleEditClose={handleEditClose}
              newMembersData={props.newMembersData}
              setNewMembersData={props.setNewMembersData}
              newTasksData={props.newTasksData}
              setNewTasksData={props.setNewTasksData}
              allTasksAreAssigned={props.allTasksAreAssigned}
              setAllTasksAreAssigned={props.setAllTasksAreAssigned}
            />
          </div>
        </div>
      </div>
  );
}