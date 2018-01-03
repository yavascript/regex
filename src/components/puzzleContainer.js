import React from 'react';
import PropTypes from 'prop-types';
// html parser for react so that I can have the facts be strings that include the html of what should be highlighted
import ReactHtmlParser from 'react-html-parser';
// import {regexHighlight } from './highlight';

const puzzles = {
  0:{
    text: `Otters love to eat shelled animals, like clams, but otters aren’t equipped with the strength to open their food without some help. Otters are big on tools, and will often use rocks to help crack into dinner. While they hunt for food underwater, they’ll often store a rock in the skin under their arms for later use.`,
    prompt: 'Build a Regex that matches the word "rock"',
    answer: 'rock',
  },
  1: {
    text: `There are 13 species of Otters, and just about all of them are decreasing.`,
    prompt: 'Build a Regex that matches the number "13"',
    answer: '13',
  },
  2:{
    text: 'file_record_transcript.pdf',
    prompt: 'prompt',
    answer: 'answer'
  }
}

// TODO: figure out how react handles white space - the puzzle text "a    bc" renders as "a bc"
// const text = 'Wild otters on the run from others';
// const userInput = 'otter'
// let regex = new RegExp(userInput)
// let f = new RegExp(/ddd/);

// function regexHighlight(text, input) {
//   if (input === ''){
//     return text
//   }
//   const regex = new RegExp(input);
//   // run exec method with new regex based on user input
//   const result = regex.exec(text)
//   // if result is NOT null that means there is a match
//   if (result !== null) {
//     return (
//       text.split(result[0]).reduce( (prev, curr, i) => {
//           return prev + `<span class='highlight-two'>` + result[0] + `</span>`+ curr
//       })
//     )
//   } else {
//     return text
//   }
// }
// TODO: think about how I want to this run, do I want it to show all matches? Or just the first one, do I want to to be able to do both with toggle?
// TODO: refactor this to return proper jsx
// TODO: rewrite this so it only styles the first match
function regexHighlightGlobal(text, input, value) {
  console.log(`value: ${value}`);
  let passInClassName;
  if ( !value ) {
    passInClassName = 'highlight-one'
  } else {
    passInClassName = 'highlight-two'
  }

  // don't do anything if there is no input
  if (input === ''){
    return text
  }
  let regex;
  // try and catch statement because bad RegExp's throw and expection
  try {
    regex = new RegExp(input)
  }
  catch(err) {
    console.log(`users regex: '${input} was invalid `);
    return text
  }
  const result = regex.exec(text)
  // when there is a match
  if (result !== null) {
    return (
      text.split(result[0]).reduce( (prev, curr, i) => {
        console.log(`checking that inside of this function you get the value: ${value}`);
        console.log(`passInClassName = ${passInClassName}`);
        return prev + `<span class='${passInClassName}'>` + result[0] + `</span>`+ curr
      })
    )
  } else {
    return text
  }
}

function regexHighlightStrict(text, input, user) {
  // don't do anything if there is no input
  if (input === ''){
    return text
  }
  let regex;
  // try and catch statement because bad RegExp's throw and expection
  try {
    regex = new RegExp(input)
  }
  catch(err) {
    console.log(`users regex: '${input} was invalid `);
    return text
  }
  const result = regex.exec(text)
  // when there is a match
  if (result !== null) {
    return (
      text.split(result[0]).reduce( (prev, curr, i) => {
        return prev + `<span class='highlight-two'>` + result[0] + `</span>`+ curr
      })
    )
  } else {
    return text
  }
}

class Puzzle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userRegex: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const userInput = event.target.value;

    this.setState( () => {
      return{
        userRegex: userInput,
      }
    })
  }


  render () {
    const { text, answer, prompt } = this.props.puzzle
    const { userRegex } = this.state;

    return (
      <div className='puzzle'>
        <div className='puzzle-display-container'>
          <div className='puzzle-display'>
            <p className='top'>{ ReactHtmlParser(regexHighlightGlobal(text, answer, false))}</p>
            <p className='bottom'>{ ReactHtmlParser(regexHighlightGlobal(text, this.state.userRegex, true))}</p>
          </div>
        </div>


        <div>
          <h3>Promt: {prompt}</h3>
        </div>

        <div>
          /<input
            id='userInput'
            placeholder='insert regex here'
            type='text'
            value={userRegex}
            autoComplete='off'
            onChange={this.handleChange}
          />/
        </div>
      </div>
    )
  }
}

Puzzle.propTypes = {
  puzzle: PropTypes.shape({
    text: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    solution: PropTypes.isRequired,
  }).isRequired,
}

class PuzzleContainer extends React.Component {
  render() {
    return(
      <div className='puzzle-container'>
        <Puzzle puzzle={puzzles[1]} />
      </div>
    )
  }
}

export default PuzzleContainer;
