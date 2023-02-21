const data= require('./data');



const hasNoImage = data => {
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop].hasOwnProperty("iebackgroundimage")) {
        if (data[prop].iebackgroundimage === "") {
          return false;
        }
      }
    }
  }
  return true;
};

function hasQuestionProperty(object) {
  return Object.values(object).some(
    value => value.hasOwnProperty('question')
  );
}

const hasQuestionsArray = (data) => {
  for (let key in data) {
    if (data[key].hasOwnProperty("questions")) {
      if (!Array.isArray(data[key].questions.question) && typeof data[key].questions.question !== 'undefined') {
        return false;
      }
    }
  }
  return true;
};

 

const checkImage = (data) => {
  try {
    Object.keys(data).forEach((key) => {
      const image = data[key].iebackgroundimage;
      if (!image) {
        throw new Error(`No image found for key: ${key}`);
      }
    });
  } catch (error) {
    console.error(error.message);
  
  }
};
const hasAnswersProperty = data => {
  for (const prop in data) {
    if (data.hasOwnProperty(prop) && data[prop].hasOwnProperty("questions")) {
      const questions = Object.values(data[prop].questions);
      for (const question of questions) {
        if (question.hasOwnProperty("answer")) {
          return true;
        }
      }
    }
  }
}

function handleQuestionAttempt(question, attempt) {
  if (!question.hasOwnProperty('answers')) {
    throw new Error('Question does not have answers property');
  }
  if (!attempt) {
    throw new Error('Attempt is missing');
  }
  const answers = question.answers;
  for (const answer of answers) {
    if (answer.answer === attempt) {
      if (answer.isCorrect) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
};

async function fetchData() {
  try {
    const response = await fetch('https://i-want-to-study-engineering.org/');
    if (!response.ok) {
      throw new Error('Server error');
    }
    return await response.json();
  } catch (error) {
    return {error: error.message};
  }
}


module.exports = {
  hasQuestionProperty,
  hasQuestionsArray,
  hasAnswersProperty,
  hasNoImage,
checkImage,
handleQuestionAttempt,
fetchData

};
