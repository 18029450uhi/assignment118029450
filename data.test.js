const data = require('./data');

const {hasAnswersProperty,hasQuestionsArray,hasNoImage,checkImage,handleQuestionAttempt} = require('./index');



//This test checks if there are answers one or multiple and if there are incorrect answers.
describe('Check the questions for answer', () => {
test('Should return true if selected answer is correct', () => {
  const questions = Array.isArray(data) ? data : Object.values(data);
  questions.forEach(question => {
    if (question && question.answers) {
      const correctAnswer = question.answers.filter(answer => answer.isCorrect);
      correctAnswers.forEach(correctAnswer => {
      expect(handleQuestionAttempt(question, correctAnswer.answer)).toBe(true);
    });
}
  });
});

test('Should return false if selected answer is incorrect', () => {
  const questions = Array.isArray(data) ? data : Object.values(data);
  questions.forEach(question => {
    if (question && question.answers) {
      const incorrectAnswers = question.answers.filter(answer => !answer.isCorrect);
      incorrectAnswers.forEach(incorrectAnswer => {
        expect(handleQuestionAttempt(question, incorrectAnswer.answer)).toBe(false);
      });
    }
  });
});
test('Throws error for missing attempt', () => {
    expect(() => handleQuestionAttempt(question, undefined)).toThrow();
  });

  test('Throws error for missing answers property in question', () => {
    const q = {};
    expect(() => handleQuestionAttempt(q, 'Option 2')).toThrow();
  });
});



// This test check if the data has a question arrary
describe("Check questions array", () => {
  test("Has questions array", () => {
    expect(hasQuestionsArray(data)).toBe(true);
  });
});

// This test checks if there is an image.
describe("Check images", () => {
  test("Has no empty image field", () => {
    expect(hasNoImage(data)).toBe(true);
  });
});
//This test checks for images and throws error
describe('Check images present or not', () => {
  test('All images should exist', () => {
    try {
      expect(checkImage(data)).not.toThrow();
    } catch (error) {
      console.log("Error:", error.message);
    }
  });
});

//The below tests if there is keys for all data.
describe('data', () => {
  test('should have keys for all sections of data', () => {
    const keys = Object.keys(data);
    expect(keys).toHaveLength(10);
  });


  //This tests if there is a question property in each section
  test('each section should have a questions property', () => {
    Object.keys(data).forEach((key) => {
      expect(data[key]).toHaveProperty('questions');
    });
  });
  
  //This tests if there is one answer field.
  test("should have at least one answers property", () => {
    expect(hasAnswersProperty(data)).toBe(true);
  });

  test('each section\'s questions property should not be empty', () => {
    Object.keys(data).forEach((key) => {
      const questions = data[key].questions;
      expect(Object.keys(questions)).not.toBe(0);
    });
  });
});
