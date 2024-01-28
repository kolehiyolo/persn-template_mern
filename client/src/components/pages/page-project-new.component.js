// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";

// * Importing other Components
import CardProjectEditInfo from '../cards/card-project-edit-info.component.js';
import CardProjectEditTasks from '../cards/card-project-edit-tasks.component.js';
import PopupWarnWOptions from '../popup/popup-warn-w-options.component.js';
import PopupWarn from "../popup/popup-warn.component.js";
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './page-project-edit.component.scss';

export default function PageProjectNew(props) {
  // console.log('MOUNT PageProjectEdit()');
  // const [oldProjectData, setOldProjectData] = useState([]);
  const [newProjectData, setNewProjectData] = useState({
    name: '',
    description: '',
    priority: 'High',
    done: false,
    start: new Date(),
    due: new Date(),
    members: [],
    tasks: [],
  });
  // const [oldTasksData, setOldTasksData] = useState([]);
  const [newTasksData, setNewTasksData] = useState([]);
  // const [oldMembersData, setOldMembersData] = useState([]);
  const [newMembersData, setNewMembersData] = useState([]);
  const [oldCurrentUserFriendsData, setOldCurrentUserFriendsData] = useState([]);
  const [currentUserFriendsData, setCurrentUserFriendsData] = useState();
  const [allTasksAreAssigned, setAllTasksAreAssigned] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSaveWithUnassignedTasks, setShowSaveWithUnassignedTasks] = useState(false);
  const [newProjectID, setNewProjectID] = useState();
  
  // const { id: projectID } = useParams();

  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      fetchCurrentUserFriendsData();
    },
    []
  );

  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      setCurrentUserFriendsData(removeFriendsWhoAreMembers(newMembersData, oldCurrentUserFriendsData));
    },
    [newMembersData, oldCurrentUserFriendsData]
  );

  // useEffect(
  //   () =>{
  //     saveNewMembersData();
  //     saveNewTasksData();
  //   },
  //   [newProjectID]
  // );

  function removeFriendsWhoAreMembers(fetchedMembersData, fetchedCurrentUserFriendsData) {
    if (fetchedMembersData !== undefined && fetchedCurrentUserFriendsData !== undefined) {
      // Extract _id values from newMembersData array
      const newMembersIds = fetchedMembersData.map(user => user._id);
      
      // Filter currentUserFriendsData to include only users whose _id is not in newMembersIds
      const updatedFriendsData = fetchedCurrentUserFriendsData.filter(
        user => !newMembersIds.includes(user._id)
        );
      
      return updatedFriendsData;
    }
  };

  function fetchCurrentUserFriendsData() {
    axios.get(`http://localhost:5000/users/${props.currentUser}`)
      .then((res) => {
        let result = res.data.friends;
        // Add user to newProjectData.members
        const currentUserMember = {
          _id: props.currentUser,
          name: res.data.name,
          main_role: res.data.main_role,
          projects: res.data.projects,
          profile_picture: res.data.profile_picture,
          project_role: res.data.main_role
        };
        // setNewProjectData((prevValue) => {
        //   const result = {
        //     ...prevValue,
        //     members: [currentUserMember],
        //   };
        //   return result;
        // });
        setNewMembersData(
          (prevValue) => {
            const result = [...prevValue, currentUserMember];
            return result;
          }
        );
        console.log('currentUserMember');
        console.log(currentUserMember);
        result.unshift(props.currentUser);
        return result;
      })
      .then((currentUserFriends) => {
        const friendPromises = currentUserFriends.map((friendID) =>
          axios.get(`http://localhost:5000/users/${friendID}`)
            .then((res) => {
              const fetchedFriendData = res.data;
              const refinedFriendData = {
                _id: friendID,
                name: fetchedFriendData.name,
                profile_picture: fetchedFriendData.profile_picture,
                main_role: fetchedFriendData.main_role,
                projects: fetchedFriendData.projects,
              };
              return refinedFriendData;
            })
        );

        return Promise.all(friendPromises);
      })
      .then((fetchedCurrentUserFriendsData) => {
        setOldCurrentUserFriendsData(fetchedCurrentUserFriendsData);
      })
      // .catch((error) => {
      //   console.error('Error fetching current user friends data:', error);
      // });
  };

  function onBackClick() {
    // TODO this should throw an "Are you sure" popup before allowing
    window.location.href='/projects/';
  };

  function saveProject() {
    console.log('saveProject()');
    setShowSaveModal(false);
  
    console.log('newProjectData');
    console.log(newProjectData);
    console.log('newTasksData');
    console.log(newTasksData);
    console.log('newMembersData');
    console.log(newMembersData);
  
    function saveNewProjectData() {
      console.log('saveNewProjectData');
      return new Promise((resolve, reject) => {
        const newProject = {
          name: newProjectData.name,
          description: newProjectData.description,
          priority: newProjectData.priority,
          done: false,
          start: newProjectData.start,
          due: newProjectData.due,
          members: newProjectData.members,
          tasks: newProjectData.tasks,
        };
        axios.post(`http://localhost:5000/projects/add`, newProject)
          .then(res => {
            console.log('New Project Added! ID:')
            console.log(res.data._id);
    
            setNewProjectData(
              (prevValue) => {
                const result = {
                  ...prevValue,
                  _id: res.data._id,
                };
                return result;
              }
            );
            setNewProjectID(res.data._id);
    
            resolve(res.data._id); // Resolve the promise with the new project ID
          })
          .catch(error => {
            reject(error); // Reject the promise if there's an error
          });
      });
    }    
  
    function saveNewMembersData(newProjectID) {
      console.log('saveNewMembersData()');
      const memberPromises = newMembersData.map(newMember => {
        console.log('New Member!');
        newProjectData.members.push({
          _id: newMember._id,
          role: newMember.project_role
        });
  
        let newMemberProjectsList = {
          projects: newMember.projects
        };

        newMemberProjectsList.projects.push(newProjectID);
  
        console.log(newMemberProjectsList);
        return axios.post(`http://localhost:5000/users/update/projects/${newMember._id}`, newMemberProjectsList);
      });
  
      return Promise.all(memberPromises);
    }
  
    function saveNewTasksData(newProjectID) {
      console.log('saveNewTasksData()');
      const taskPromises = newTasksData.map(newTask => {
        console.log('New Task!');
        const newTaskData = {
          name: newTask.name,
          start: newTask.start,
          due: newTask.due,
          done: false,
          owner: newTask.owner,
          project: newProjectID,
          priority: newTask.priority,
          description: newTask.description
        }
  
        return axios.post(`http://localhost:5000/tasks/add`, newTaskData)
          .then(res => {
            newProjectData.tasks.push(res.data);
          });
      });
  
      return Promise.all(taskPromises);
    }
  
    function finalProjectSave(newProjectID) {
      console.log('finalProjectSave()');
      axios.post(`http://localhost:5000/projects/update/${newProjectID}/newTask`, newProjectData)
        .then(res => {
          console.log(res.data);
          // window.location.href=`/project/${newProjectID}`;
        });
    };
  
    saveNewProjectData()
      .then(newProjectID => Promise.all([saveNewMembersData(newProjectID), saveNewTasksData(newProjectID)]).then(() => newProjectID))
      .then(newProjectID => finalProjectSave(newProjectID))
      .catch(error => console.error(error));
  };
  
  function deleteProject() {
    console.log('Deleting Project');
    setShowDeleteModal(false);
    // TODO
    // Delete the project from the DB
  };

  function onProjectDeleteClick() {
    console.log(`RUN PageProjectEdit -> onDeleteClick()`);
    setShowDeleteModal(true);
  };

  function onProjectSaveClick() {
    console.log(`RUN PageProjectEdit -> onProjectSaveClick()`);

        
    if (allTasksAreAssigned) {
      console.log('allTasksAreAssigned is true');      
      setShowSaveModal(true);
    }
    else {
      console.log('allTasksAreAssigned is false');
      console.log('Checking for unassigned tasks');

      if (newTasksData.some(task => task.owner === "Unassigned")) {
        console.log('Cannot save project because not all tasks are assigned');
        setShowSaveWithUnassignedTasks(true);
      } else {
        setShowSaveModal(true);
        setAllTasksAreAssigned(true);
      }
    }
  };

  // * Render
  return (
    <>
      {showDeleteModal && (
        <PopupWarnWOptions
          showModal={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          title="Delete Project"
          subtitle="You can’t retrieve deleted projects"
          confirmButtonText="Confirm"
          confirmVariant="danger"
          cancelButtonText="Cancel"
          onConfirm={deleteProject}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      {showSaveModal && (
        <PopupWarnWOptions
          showModal={showSaveModal}
          handleClose={() => setShowSaveModal(false)}
          title="Save Project"
          subtitle="You can’t undo saved changes"
          confirmButtonText="Confirm"
          confirmVariant="success"
          cancelButtonText="Cancel"
          onConfirm={saveProject}
          onCancel={() => setShowSaveModal(false)}
        />
      )}
      {showSaveWithUnassignedTasks && (
        <PopupWarn
          title="Can't do that"
          subtitle="You have unassigned tasks"
          cancelButtonText="Ok"
          onCancel={() => setShowSaveWithUnassignedTasks(false)}
        />
      )}
      <div 
        className='page-project'
        id={'page-project-new'}
      >
        <div className='head'>
          <div className='buttons'>
            <button 
              className="btn btn-primary"
              onClick={
                () => {
                  onBackClick();
                }
              }
              >
              Back
            </button>
          </div>
          <h3>New Project</h3>
        </div>
        <div className='body'>
          <CardProjectEditInfo 
            // oldProjectData={oldProjectData}
            // oldTasksData={oldTasksData}
            // oldMembersData={oldMembersData}
            newProjectData={newProjectData}
            newTasksData={newTasksData}
            newMembersData={newMembersData}
            setNewProjectData={setNewProjectData}
            setNewTasksData={setNewTasksData}
            setNewMembersData={setNewMembersData}
            currentUserFriendsData={currentUserFriendsData}
            setCurrentUserFriendsData={setCurrentUserFriendsData}
            allTasksAreAssigned={allTasksAreAssigned}
            setAllTasksAreAssigned={setAllTasksAreAssigned}
            onProjectSaveClick={onProjectSaveClick}
            onProjectDeleteClick={onProjectDeleteClick}
            currentUser={props.currentUser}
          />
          {
            (newTasksData !== undefined)
            ? <CardProjectEditTasks 
                // projectData={oldProjectData}
                currentUser={props.currentUser}
                // oldProjectData={oldProjectData}
                // oldTasksData={oldTasksData}
                // oldMembersData={oldMembersData}
                newProjectData={newProjectData}
                newTasksData={newTasksData}
                newMembersData={newMembersData}
                setNewProjectData={setNewProjectData}
                setNewTasksData={setNewTasksData}
                setNewMembersData={setNewMembersData}
                currentUserFriendsData={currentUserFriendsData}
                setCurrentUserFriendsData={setCurrentUserFriendsData}
                allTasksAreAssigned={allTasksAreAssigned}
                setAllTasksAreAssigned={setAllTasksAreAssigned}
              />
            : ''
          }
        </div>
      </div>
    </>
  );
}