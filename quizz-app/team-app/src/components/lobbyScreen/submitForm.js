// Imports
import React, {Component} from "react";
import {enterRoomRequest} from "../../actions/lobbyActions";
import {connect} from 'react-redux';
import {withRouter} from "react-router";

class SubmitForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const callback = () => this.props.history.push('/wait');
    const data = {'name': this.refs.name.value, 'roomCode': this.refs.roomCode.value};
    this.props.enterRoom(data, callback);
  };

  render() {
    let error = '';
    if (this.props.hasErrored) {
      error = 'TeamName is already use.';
    }
    return (
      <div className="submit-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" ref="name" placeholder="Team name..." required/>
          <input type="text" name="roomCode" ref="roomCode" placeholder="Room code..." required/>
          <input className="submit-from-button bg-orange"type="submit" value="Submit" />
        </form>
        <p>{error}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.enterRoomResponse.isloading,
    hasErrored: state.enterRoomResponse.hasErrored,
    RoomCode: state.enterRoomResponse.payload
  }
}

function mapDispatchToProps(dispatch) {
  return {
    enterRoom: (data, callback) => dispatch(enterRoomRequest(data, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubmitForm))
