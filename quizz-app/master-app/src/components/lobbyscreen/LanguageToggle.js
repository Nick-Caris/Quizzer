// Imports
import React from "react";
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { toggleLanuage } from '../../actions/actions'


class LanguageToggle extends Component {

    render() {
        const lang = this.props.language.lang

        if (this.props.roomCode === "") {
            return (
                <div>
                    <p>toggle:</p>
                    <button className="bg-orange lang-toggle" onClick={ () => this.props.toggleLanuage(lang)}>
                        { lang }
                    </button>
                </div>
            )
        } else {
            return (
                <div>
                    <p>toggle:</p>
                    <button className="bg-grey lang-toggle">
                        { lang }
                    </button>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        roomCode: state.roomCodeResponse.roomCode,
        language: state.language
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggleLanuage: toggleLanuage
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageToggle)