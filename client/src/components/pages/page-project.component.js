// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";

// * Importing other Components
import CardProjectInfo from '../cards/card-project-info.component.js';
import CardProjectTasks from '../cards/card-project-tasks.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './page-project.component.scss';

export default function PageProject(props) {
  // console.log('MOUNT PageProject()');
  const [projectData, setProjectData] = useState([]);
  const { id: projectID } = useParams();
  // const [filterMode, setFilterMode] = useState('All Projects');

  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      fetchProjectData();
    },
    []
  );

  // * This fetches all Projects from DB
  function fetchProjectData() {
    console.log(`RUN PageProject -> fetchProjectData()`); 
    axios.get('http://localhost:5000/projects/' + projectID)
      .then(
        res => {
          const project = res.data;
          console.log(` - Success! Project "${project.length}" found`);
          console.log(`\n`);
          setProjectData(project);
        }
      )
  };

  function onBackClick() {
    window.location.href='/projects/';
  }

  // * Render
  return (
    <div 
      className='page-project'
      id={'page-project-'+projectData._id}
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
        <h3>{projectData.name}</h3>
      </div>
      <div className='body'>
        <CardProjectInfo 
          projectData={projectData}
        />
        {
          (projectData.length != 0)
          ? <CardProjectTasks 
              projectData={projectData}
              currentUser={props.currentUser}
            />
          : ''
        }
      </div>
    </div>

  );
}