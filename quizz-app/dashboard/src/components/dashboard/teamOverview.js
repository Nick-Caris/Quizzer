// Imports
import React, {Component} from "react";
import {getRoomRequest} from "../../actions/getRoomAction";
import Translate from "../Translate";
import {connect} from "react-redux";

class TeamOverview extends Component {

  render() {
    console.log('quiz: ',this.props.quizResponse);
    if (this.props.quizResponse.hasLoaded && this.props.quiz.teams) {
      return (
        <div id="team-overview">
          <Translate val="teamOverview" />
          <div className="team-overview-container">
            {
              this.props.quiz.teams.map((team) => (
                <p key={team._id}>{team.name} - <Translate val="score" /> = {team.score}</p>
              ))
            }
          </div>
        </div>
      )
    } else {
      return (
        <div id="team-overview">
          <Translate val="no teams yet" />
        </div>
      );
    }
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


export default connect(mapStateToProps, mapDispatchToProps)(TeamOverview);
