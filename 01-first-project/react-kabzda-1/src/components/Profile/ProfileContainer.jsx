import axios from 'axios';
import React from 'react';
import Profile from './Profile';
import {setUserProfile} from '../../Redux/profile-reducer'
import { connect } from 'react-redux';
import { useMatch } from 'react-router-dom';


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match ? this.props.match.params.userId : '2';
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then(response => {
        this.props.setUserProfile(response.data);
      });
  }


  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} />
    )
  }
}

const ProfileMatch = (props) => {
	let match = useMatch("/profile/:userId");
	return (
		<ProfileContainer {...props} match={match} />
	)
}



let mapStateToProps = (state) =>({
   profile:state.profilePage.profile
})



export default connect (mapStateToProps, {setUserProfile}) (ProfileMatch);