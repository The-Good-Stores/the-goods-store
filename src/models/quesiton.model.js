// Project Name: Used Goods Store
// Date: Nov 19 2022
// Project Member (SID):
// Long Tang (301225866)
// Alabed, Nabeel
// Chung, Wonyoung
// Park, Inhee
// Vu, Thi Thanh Thu
// Yeom, Hanna
const questionDb = require("./question.mongo");

class Question {
  adsId;
  questionId;
  question;
  answer;

  constructor(adsId, questionId, question, answer) {
    this.adsId = adsId;
    this.questionId = questionId;
    this.question = question;
    this.answer = answer;
  }
}

async function saveQuestion(question) {
  try {
    await questionDb.create(question);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getAdQuestion(adsId) {
  const questions = await questionDb
    .find(
      { adsId },
      {
        __v: 0,
        _id: 0,
      }
    )
    .sort({ createdAt: -1 });
  return questions;
}

async function addAnswer(questionId, answer) {
  console.log({ questionId, answer });
  try {
    const doc = await questionDb.findOneAndUpdate(
      { questionId },
      { answer: answer },
      { new: false }
    );
    console.log({ doc });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
module.exports = {
  Question,
  saveQuestion,
  getAdQuestion,
  addAnswer,
};
