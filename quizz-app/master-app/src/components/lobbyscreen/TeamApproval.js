// Imports
import React from "react";
import { Component } from "react";
import Translate from "../Translate"
import AcceptReject from "../AcceptReject"
import { connect } from 'react-redux'
import { joinTeamRequest } from '../../actions/teamApprovalActions'
import { bindActionCreators } from "redux";


class TeamApproval extends Component {

    render() {

        if (this.props.teams.isUpdated) {
            this.props.getTeams(this.props.roomCode.roomCode)
        }

        return (
            <div id="team-approval">
                <Translate val="teamApproval" />
                <div className="team-approval-container">
                    {   
                        this.props.teams.teams.map((element) => (
                            <AcceptReject key={element._id} team={element}>{element.name}</AcceptReject>
                        ))
                    }
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        roomCode: state.roomCodeResponse.roomCode,
        teams: state.teams
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getTeams: joinTeamRequest
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamApproval)