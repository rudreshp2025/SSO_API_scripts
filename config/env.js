const env = process.env.ENV || "stg";

const config = {
   stg: {
    baseURL: "https://beta-login.mediacorp.sg/"
  },

  prod: {
    baseURL: "https://login.mediacorp.sg/"
  }
};

module.exports = config[env];