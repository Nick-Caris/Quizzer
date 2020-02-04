// Imports
import React, {Component} from "react";
import {getRoomRequest} from "../../actions/getRoomAction";
import {connect} from "react-redux";
import Translate from "../Translate";

class RoundView extends Component {


  render() {
    if (this.props.quizResponse.hasLoaded) {
      return (
        <div className="round-view">
          <span><Translate val='round' /> {this.props.quiz.round}</span>
        </div>
      );
    }
    return (
      <div className="round-view"><Translate val='round' /></div>
    );
  }

}

function mapStateToProps(state) {
  return {
    quiz: state.dashboardQuizResponse.quiz,
    quizResponse: state.dashboardQuizResponse,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRoom: (data) => dispatch(getRoomRequest(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RoundView);
