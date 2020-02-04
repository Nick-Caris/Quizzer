// Imports
import React, {Component} from "react";
import {connect} from 'react-redux';
import StartQuiz from "./StartQuiz";
import Translate from "../Translate";

class WaitScreen extends Component {


  render() {
    return (
      <div className="wait-screen">
        <Translate val="wait here to join: " />
        {this.props.roomCode.enterRoomData.roomCode}
        <br />
        <div className="status">
          <Translate val="status" />
          <Translate val={this.props.status.status} />
        </div>
        <br />
        <StartQuiz />
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    roomCode: state.enterRoomResponse,
    status: state.waitRoomResponse
  }
}

export default connect(mapStateToProps)(WaitScreen);
