// Project Name: Used Goods Store
// Date: Nov 19 2022
// Project Member (SID):
// Long Tang (301225866)
// Alabed, Nabeel
// Chung, Wonyoung
// Park, Inhee
// Vu, Thi Thanh Thu
// Yeom, Hanna
const {
  getAllAds,
  getOneAd,
  findUserAds,
  createAds,
  editAds,
  disableAd,
  activateAd,
} = require("../../models/ads.model");
const { v4: uuidv4 } = require("uuid");
const { addAnswer, saveQuestion } = require("../../models/quesiton.model");
async function httpApiGetAllAds(req, res) {
  try {
    const docs = await getAllAds();
    if (docs) {
      res.status(200).json({
        status: "Success",
        data: docs,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
}

async function httpApiGetOneAd(req, res) {
  try {
    const adsId = req.params.id;
    const doc = await getOneAd(adsId);
    if (doc) {
      res.status(200).json({
        status: "Success",
        data: doc,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
}

async function httpApiGetUserAds(req, res) {
  try {
    const username = req.params.username;
    const docs = await findUserAds(username);
    if (docs) {
      res.status(200).json({
        status: "Success",
        data: docs,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
}

async function httpApiPostAds(req, res) {
  const { username, title, body, price, end, deliveryMethod } = req.body;
  const begin = new Date();
  console.log({ body: req.body });
  const ad = {
    adsId: uuidv4(),
    title,
    username,
    price,
    body,
    begin,
    end,
    deliveryMethod,
    active: true,
  };
  console.log({ ad });
  const createResult = await createAds(ad);
  if (createResult) {
    res.status(201).json({
      status: "Created",
    });
  } else {
    res.status(400).json({
      status: "Not Success",
    });
  }
}

async function httpApiPostUpdateAd(req, res) {
  try {
    const adsId = req.params.id;
    const { title, body, price, end, deliveryMethod } = req.body;
    const updatedAd = { title, body, price, end, deliveryMethod };
    const updateResult = await editAds(adsId, updatedAd);
    console.log({ updateResult });
    if (updateResult) {
      res.status(200).json({
        status: "Updated",
      });
    } else {
      res.status(400).json({
        status: "Failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
}
async function httpApiDisableAd(req, res) {
  const adsId = req.params.id;
  try {
    const deleteResult = await disableAd(adsId);
    if (deleteResult) {
      res.status(200).json({
        status: "Updated",
      });
    } else {
      res.status(400).json({
        status: "Failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
}

async function httpApiActivateAd(req, res) {
  const adsId = req.params.id;
  try {
    const activeResult = await activateAd(adsId);
    if (activeResult) {
      res.status(200).json({
        status: "Updated",
      });
    } else {
      res.status(400).json({
        status: "Failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
}

async function httpApiPostQuestion(req, res) {
  const adsId = req.params.id;
  const question = req.body.question;
  const questionId = uuidv4();
  try {
    const questionToSave = {
      adsId,
      questionId,
      question,
    };
    const saveResult = await saveQuestion(questionToSave);
    if (saveResult) {
      res.status(201).json({
        status: "Question saved",
      });
    } else {
      res.status(400).json({
        status: "Failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
}

async function httpApiPostAddAnswer(req, res) {
  const adsId = req.params.id;
  const qid = req.params.qid;
  const answer = req.body.answer;
  try {
    const addResult = await addAnswer(qid, answer);
    if (addResult) {
        res.status(201).json({
          status: "Answer saved",
        });
      } else {
        res.status(400).json({
          status: "Failed",
        });
      }
  } catch (error) {
    res.status(400).json({
        status: "error",
        message: error,
      });
  }
}

module.exports = {
  httpApiGetAllAds,
  httpApiGetOneAd,
  httpApiGetUserAds,
  httpApiPostAds,
  httpApiPostUpdateAd,
  httpApiDisableAd,
  httpApiActivateAd,
  httpApiPostQuestion,
  httpApiPostAddAnswer,
};
