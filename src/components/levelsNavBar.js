import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as levelsActionCreators from '../actions/levelsActions';

// made this a stateless functional component
class LevelNavigation extends Component {

  changeTheLevelFunction(level) {
    console.log(`inside changeTheLevelFunction function  want to change to level - ${level}`);
    this.props.dispatch(levelsActionCreators.changeLevel(level));
  }

  render() {
    const levelsArray = [1,2,3]
    return (
      <nav>
        <div className='level-navigation'>
          {/* <div>
            <span
              className="arrow left"
              onClick={ () => triggerSingleLevelChange(false)}>
              &#8249;
            </span>
            {level} of 3 {levelsArray[-1]}
            <span className="arrow right"
              onClick={ () => this.triggerSingleLevelChange(true)}>
              &#8250;
            </span>
          </div> */}
          <div className='button-container' >
            {levelsArray.map( (level) => {

              return (
                <button
                  className="btn"
                  key={level}
                  onClick={ () =>  this.changeTheLevelFunction(level)}>
                  {level}
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    )
  }
}

LevelNavigation.propTypes = {
  level: PropTypes.number.isRequired,
  levelsArray: PropTypes.array.isRequired,
  // triggerLevelChange: PropTypes.func.isRequired,
  // triggerSingleLevelChange: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  console.log('State in levelsNavBar', state);
  return {
    level: state.level,
    totalLevels: state.totalLevels,
  }
}
export default connect(mapStateToProps)(LevelNavigation);
