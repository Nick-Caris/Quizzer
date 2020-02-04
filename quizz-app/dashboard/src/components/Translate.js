// Imports
import React from "react";
import { Component } from 'react'
import { connect } from 'react-redux'

// Language files
import en from '../lang/en'
import nl from '../lang/nl'

/**
 * Component that displays a string of text. Changes depending on the set language of the application.
 */
class Translate extends Component {

    render() {
        return (
            <span>{ translate(this.props.language, this.props.val) }</span>
        )
    }

}
/**
 * Determines the correct text for the language + key combination.
 *
 * @param {String} lang
 * @param {String} key
 * @return {String}
 */
function translate(lang, key) {
    if (lang === "EN") {
        return en[key]
    } else {
        return nl[key]
    }
}


function mapStateToProps(state) {
    return {
        language: state.dashboardQuizResponse.lang
    }
}

export default connect(mapStateToProps)(Translate)
