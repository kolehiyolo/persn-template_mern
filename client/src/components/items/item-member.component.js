// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
// import ItemAvatarCircle from './item-avatar-circle.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './item-member.component.scss';

export default function ItemMember(props) {
  // console.log('MOUNT CardProjectVertical()');
  // const [doneStatus, setDoneStatus] = useState(props.projectData.done);
  const [memberData, setMemberData] = useState(
    {
      name: {
        first: '',
        last: ''
      },
      project_role: '',
      profile_picture: '',
    }
  );

  // * Fetch Member Data from DB on mount
  useEffect(
    () =>{
      fetchMemberData(props.projectMember._id);
    },
    []
  );

  function fetchMemberData(memberID) {
    console.log(`RUN ItemMember -> fetchMemberData()`); 
    axios.get('http://localhost:5000/users/' + memberID)
      .then(
        res => {
          const fetchedMemberData = res.data;
          const refinedMemberData = {
            name: fetchedMemberData.name,
            project_role: props.projectMember.role,
            profile_picture: fetchedMemberData.profile_picture,
          }
          setMemberData(refinedMemberData);
        }
      )
  };
  
  // * Render
  return (
    <div className='item-task'>
        <div className='group-1'>
          <div className='left'>
            <div
              className="item-avatar-circle"
              key={props.userID}
            >
              <img src={memberData.profile_picture} alt={'User ' + props.userID + ' Avatar'} />
            </div>
          </div>
          <div className='right'>
            <p className='name'>{memberData.name.first} {memberData.name.last}</p>      
            <p className='role'>{memberData.project_role}</p>      
          </div>
        </div>
        <div className='group-2'>
        </div>
      </div>
  );
};