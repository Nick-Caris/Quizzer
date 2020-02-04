// Imports
import React, {Component} from "react";
import {connect} from 'react-redux';
import {getRoomRequest} from "../../actions/getRoomAction";

class EnterCode extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.enterRoom(this.refs.roomCode.value);
  };


  render() {
    if (this.props.quizResponse.isUpdated) {
      this.props.getRoom(this.props.quiz.roomCode)
    }
    return (
      <div className="enter-code">
        <form onSubmit={this.handleSubmit}>
          <label>
            RoomCode:
            <input type="text" name="roomCode" ref="roomCode" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.dashboardQuizResponse.isloading,
    hasErrored: state.dashboardQuizResponse.hasErrored,
    quizResponse: state.dashboardQuizResponse,
    quiz: state.dashboardQuizResponse.quiz,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    enterRoom: (data) => dispatch(getRoomRequest(data)),
    getRoom: (data) => dispatch(getRoomRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterCode);
