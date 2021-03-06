import React from 'react';
import PropTypes from 'prop-types';

// Functional stateless component
const Instructions = (props) => {
  const { title, number, content, example } = props.instructions;
  return(
    <div className='lesson-zone'>
      <h3>Lesson # {number} - {title}</h3>
      <ul className='lesson-list'>
        <li>{content}</li>
        <li>{example}</li>
      </ul>
    </div>
  )
}

Instructions.propTypes = {
  instructions: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    example: PropTypes.string.isRequired,
  }).isRequired
}

export default Instructions;
