const env = process.env.ENV || "stg";

const config = {
   stg: {
    baseURL: "https://beta-userdatahub.mediacorp.sg/",
    user_id : "90897066-0525-4917-9293-c4a7bdfc4ff8",
    subscription_key : "d0ce34d339424e339f447e4689695f23",
    profile_subscription_key : '9209dba8b0e145aeb6df0ebb3c440f0c'
  },

  prod: {
    baseURL: "https://userdatahub.mediacorp.sg",
    user_id : "90897066-0525-4917-9293-c4a7bdfc4ff8",
    subscription_key : "",
    profile_subscription_key : ''
  }
};

module.exports = config[env];