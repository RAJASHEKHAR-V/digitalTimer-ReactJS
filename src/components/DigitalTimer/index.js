import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerStarted: false,
    minutes: 25,
    seconds: '00',
    secondsIncreased: 1,
    setTimerLimit: 25,
    isReset: false,
  }

  tick = () => {
    const {secondsIncreased, setTimerLimit} = this.state
    const newMinutes = Math.floor((setTimerLimit * 60 - secondsIncreased) / 60)
    const newSeconds = (setTimerLimit * 60 - secondsIncreased) % 60
    if (newMinutes < 0 && newSeconds < 0) {
      clearInterval(this.timerId)
      this.setState(prevState => ({isTimerStarted: !prevState.isTimerStarted}))
      return
    }
    this.setState(prevState => ({
      minutes: newMinutes,
      seconds: newSeconds,
      secondsIncreased: prevState.secondsIncreased + 1,
    }))
  }

  onPlayOrStopButton = () => {
    const {isTimerStarted} = this.state
    console.log(isTimerStarted)
    if (!isTimerStarted) {
      this.timerId = setInterval(this.tick, 1000)
      this.setState(prevState => ({
        isTimerStarted: !prevState.isTimerStarted,
        isReset: !prevState.isReset,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState(prevState => ({isTimerStarted: !prevState.isTimerStarted}))
    }
  }

  onReset = () => {
    const {minutes, seconds} = this.state
    if (minutes === 0 && seconds === 0) {
      this.setState(prevState => ({
        minutes: 25,
        seconds: 0,
        setTimerLimit: 25,
        secondsIncreased: 1,
        isReset: !prevState.isReset,
      }))
      return
    }

    clearInterval(this.timerId)

    this.setState(prevState => ({
      minutes: prevState.setTimerLimit,
      seconds: 0,
      secondsIncreased: 1,
      isReset: !prevState.isReset,
    }))
  }

  onIncrementButton = () => {
    this.setState(prevState => ({
      minutes: prevState.setTimerLimit + 1,
      setTimerLimit: prevState.setTimerLimit + 1,
    }))
  }

  onDecrementButton = () => {
    this.setState(prevState => ({
      minutes: prevState.setTimerLimit - 1,
      setTimerLimit: prevState.setTimerLimit - 1,
    }))
  }

  render() {
    const {
      isTimerStarted,
      minutes,
      seconds,
      setTimerLimit,
      isReset,
    } = this.state

    const timerStatus = isTimerStarted ? 'Running' : 'Paused'
    const startStopStatus = isTimerStarted
      ? [
          'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
          'pause icon',
          'Pause',
        ]
      : [
          'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
          'play icon',
          ' Start',
        ]
    const addSeconds = seconds.toString().length === 1 ? `0${seconds}` : seconds
    const addMinutes = minutes.toString().length === 1 ? `0${minutes}` : minutes

    return (
      <div className="bg-container">
        <h1 className="digi-heading">Digital Timer</h1>
        <div className="timer-body">
          <div className="timer-card">
            <div className="time-display-card">
              <h1 className="time">
                {addMinutes}:{addSeconds}
              </h1>
              <p className="time-status">{timerStatus}</p>
            </div>
          </div>
          <div className="time-control-body">
            <div className="controls-card">
              <div className="start-stop-card">
                <div>
                  <button
                    className="start-stop-button"
                    type="submit"
                    onClick={this.onPlayOrStopButton}
                  >
                    <img
                      src={startStopStatus[0]}
                      className="start-stop-image"
                      y
                      alt={startStopStatus[1]}
                    />{' '}
                    {startStopStatus[2]}
                  </button>
                </div>
                {/* <p className="start-stop-status">{startStopStatus[2]}</p> */}
              </div>
              <div className="reset-card">
                <div>
                  <button
                    className="reset-button"
                    type="submit"
                    onClick={this.onReset}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      className="reset-image"
                      alt="reset icon"
                    />{' '}
                    Reset
                  </button>
                </div>
                {/* <p className="reset-para">Reset</p> */}
              </div>
            </div>
            <div className="timer-limits-set-card">
              <p className="timer-limit-para">Set Timer limit</p>
              <div className="timer-set-buttons-card">
                <div>
                  <button
                    className="increment-button"
                    type="submit"
                    disabled={isReset}
                    onClick={this.onDecrementButton}
                  >
                    -
                  </button>
                </div>
                <p className="set-timer-value">{setTimerLimit}</p>
                <div>
                  <button
                    className="decrement-button"
                    type="submit"
                    disabled={isReset}
                    onClick={this.onIncrementButton}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
