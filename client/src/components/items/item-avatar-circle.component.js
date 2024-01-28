// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
// import CardProject from './card-project.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './item-avatar-circle.component.scss';

export default function ItemAvatarCircle(props) {
  // console.log('MOUNT ItemAvatarCircle()');
  const [avatarUrl, setAvatarUrl] = useState('');

  // console.log(props.userID + ' ' + props.parent);

  useEffect(() => {
    if (props.userID !== 'Unassigned') {
      axios.get('http://localhost:5000/users/' + props.userID)
      .then(
      res => {
        const userData = res.data;
        if (userData.profile_picture) {
          setAvatarUrl(userData.profile_picture);
        }
      }
      )
    } else {
      setAvatarUrl('https://pasrc.princeton.edu/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture-973460_1280.jpg');
    }
  }, []); // Dependency array ensures the effect runs when userId changes

  // * Render
  return (
    <div
      className="item-avatar-circle"
      key={props.userID}
    >
      <img src={avatarUrl} alt={'User ' + props.userID + ' Avatar'} />
    </div>
  );

}