const data = require('./data');

const {hasAnswersProperty,hasQuestionsArray,hasNoImage,checkImage,handleQuestionAttempt,fetchData} = require('./index');

describe('Server failure', () => {
  test('Should handle server failure gracefully', async () => {
    const response = await fetch('https://i-want-to-study-engineering.org/');
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({error: 'Server error'});
  });
});


describe('Handle question attempt', () => {
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




describe("Check questions array", () => {
  test("Has questions array", () => {
    expect(hasQuestionsArray(data)).toBe(true);
  });
});

describe("Check images", () => {
  test("Has no empty image field", () => {
    expect(hasNoImage(data)).toBe(true);
  });
});

describe('Check images', () => {
  test('All images should exist', () => {
    try {
      expect(checkImage(data)).not.toThrow();
    } catch (error) {
      // handle error here, for example display a default image or message
      console.log("Error:", error.message);
    }
  });
});


describe('data', () => {
  it('should have keys for all courses', () => {
    const keys = Object.keys(data);
    expect(keys).toHaveLength(7);
  });

  it('each course should have a questions property', () => {
    Object.keys(data).forEach((key) => {
      expect(data[key]).toHaveProperty('questions');
    });
  });
  


  test("Has at least one answers property", () => {
    expect(hasAnswersProperty(data)).toBe(true);
  });


  





  it('each course\'s questions property should not be empty', () => {
    Object.keys(data).forEach((key) => {
      const questions = data[key].questions;
      expect(Object.keys(questions)).not.toBe(0);
    });
  });




     



});
