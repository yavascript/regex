const text = 'Wild otters on the run from others';
const userInput = 'otter'
let regex = new RegExp(userInput)
let f = new RegExp(/ddd/);

export function regexHighlight(text, input) {
  const regex = new RegExp(input);
  // run exec method with new regex based on user input
  const result = regex.exec(text)
  // if result is NOT null that means there is a match
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

// console.log(regexHighlight(text, userInput));
//
// console.log(regexHighlight(text, 'sddd'));

// 'The <b>Otter</b> are cool animals!'
// 'The otterman wanted to be an otter'
// split(/<\/?b>/) => [ 'The ', 'Otter', 's are cool animals!' ]
// is there a way to do this that isnt inline styling? something do with absolute position by text?
// two overlapping strings one is underlined one is highlighted
