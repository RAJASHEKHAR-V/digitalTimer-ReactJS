import {Component} from 'react'

import './index.css'

const TimeControl = props => {
  const {isReset, setTimerLimit} = props
  return (
    <div className="timer-set-buttons-card">
      <div>
        <button className="increment-button" type="submit" disabled={isReset}>
          +
        </button>
      </div>
      <p className="set-timer-value">{setTimerLimit}</p>
      <div>
        <button className="decrement-button" type="submit" disabled={isReset}>
          -
        </button>
      </div>
    </div>
  )
}

class DigitalTimer extends Component {
  state = {
    isTimerStarted: false,
    minutes: 25,
    seconds: '00',
    constantMinutes: 25,
    secondsIncreased: 1,
    setTimerLimit: 25,
    isReset: true,
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {secondsIncreased, constantMinutes} = this.state
    const newMinutes = Math.floor(
      (constantMinutes * 60 - secondsIncreased) / 60,
    )
    const newSeconds = (constantMinutes * 60 - secondsIncreased) % 60
    this.setState(prevState => ({
      minutes: newMinutes,
      seconds: newSeconds,
      secondsIncreased: prevState.secondsIncreased + 1,
    }))
  }

  onPlayOrStopButton = () => {
    this.setState(prevState => ({isTimerStarted: !prevState.isTimerStarted}))
    const {isTimerStarted} = this.state
    if (isTimerStarted === false) {
      clearTimeout(this.timerId)
    }
  }

  render() {
    const {
      isTimerStarted,
      minutes,
      seconds,
      setTimerLimit,
      isReset,
    } = this.state

    const timerStatus = isTimerStarted ? 'Running' : 'Pause'
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

    return (
      <div className="bg-container">
        <h1 className="digi-heading">Digital Timer</h1>
        <div className="timer-body">
          <div className="timer-card">
            <div className="time-display-card">
              <h1 className="time">
                {minutes.toString()}:{addSeconds}
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
                    />
                  </button>
                </div>
                <p className="start-stop-status">{startStopStatus[2]}</p>
              </div>
              <div className="reset-card">
                <div>
                  <button className="reset-button" type="submit">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      className="reset-image"
                      alt="reset icon"
                    />
                  </button>
                </div>
                <p className="reset-para">Reset</p>
              </div>
            </div>
            <div className="timer-limits-set-card">
              <p className="timer-limit-para">Set Timer limit</p>
              <TimeControl
                key="time-control"
                isReset={isReset}
                setTimerLimit={setTimerLimit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
