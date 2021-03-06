import React, { Component } from 'react'
import classNames from 'classnames'
import { white, indigo900 } from 'material-ui/styles/colors'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/appActions'
import { connect } from 'react-redux'
import Typist from 'react-typist';
import { TYPING_OPTION } from '../../const'
import { removeHTMLTag } from '../../utils'

const themeColor = '#3c85f4'
const styles = {
  outer: {
    position: 'relative',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'auto',
    backgroundColor: themeColor,
  },
  inner: {
    width: '100%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    textAlign: 'center',
  },
  title: {
    color: white,
    fontSize: '9vw',
    fontWeight: '300',
    marginBottom: 30,
  },
  subtitle: {
    color: white,
    fontSize: '2.5vw',
    lineHeight: '3.5vw',
    fontWeight: 100,
    width: '55%',
    margin: '0 auto',
  },
  button: {
    position: 'relative',
    height: '9vw',
    width: '9vw',
    lineHeight: '9vw',
    borderRadius: '50%',
    textAlign: 'center',
    cursor: 'pointer',
    color: themeColor,
    backgroundColor: white,
    margin: '30px auto 0',
    top: 0,
    left: 0,
    fontSize: '2.5vw',
  },
  buttonText: {
    color: themeColor,
    animation: 'flash 4s infinite ease-in-out',
  },
}

class IntroBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finishedTyping: false,
      clicked: false,
    }
  }

  onClick() {
    this.setState({clicked: true})
    setTimeout(() => {
      this.props.actions.finshedIntro()
    }, 300)
  }

  onTypingDone() {
    this.setState({finishedTyping: true})
  }

  render() {
    const { finishedTyping, clicked } = this.state
    const { title, subtitle, titleStyle } = this.props
    return (
      <div style={styles.outer}>
        <section style={styles.inner}>
          <div style={{...styles.title, ...titleStyle}}>
            {title}
          </div>
          { finishedTyping ? 
            <div style={styles.subtitle}
              dangerouslySetInnerHTML={{__html: subtitle}} />
            :
            <div style={styles.subtitle}>
              <Typist
                avgTypingDelay={100}
                cursor={TYPING_OPTION.cursor}
                onTypingDone={this.onTypingDone.bind(this)}>
                { removeHTMLTag(subtitle) }
              </Typist>
            </div>
          }
          <div
            className={`${clicked ? "pulse-fullscreen":"animated zoomIn hover-ripple-out"}`}
            style={styles.button}
            onClick={this.onClick.bind(this)}>
            <div style={styles.buttonText}>
              { `${clicked ? "":"Start"}` }
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const stateToProps = state => {
  return {
    app: state.app
  }
}

const dispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  stateToProps,
  dispatchToProps,
)(IntroBase)
