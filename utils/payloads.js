
const { getEmail,Generatetoken,getResetPassword } = require('../helpers/emailGenerator');



class list_of_payloads{

   
meconnectsignin_payload(overrides = {}){
        
 return{
     username: "meconnectsignin@gmail.com",
    password: "123456789",
    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    token_expiry: 1020,
    device_id: "apimocktestdevice",

    ...overrides
        };
}
    
async meconnectsignup_payload(overrides = {}){
 const email = getEmail();
 return{
    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    username: email,
    password: "123456789",
    first_name: "Mongo",
    last_name: "Jumbo",
    dob: "1987-02-01",
    gender: "male",
    token_expiry: "20",
    terms_condition: true,
    is_subscribed: true,
    device_id: "apimocktestdevice",
    subscription_source: "subscription_source",

    ...overrides
    
  }; 

}

devicesignin_payload(overrides = {}){
 return {
    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    username: "tiger07@gmail.com",
    password: "123456789",
    token_expiry: 20,
    type: "mobile",
    name: "Mongo iPhone",
    manufacturer: "Apple",
    model: "iPhone 14",
    os: "Android",
    browser: "chrome",

     ...overrides
};
  
}


subscribe(overrides = {}){
  const shortcode = ['Toggle', 'Berita', 'CNA_Partners', '8WorldNews', '8WorldLifestyle', 'Mediacorp_Marketing', 'Mediacorp_Partners', 'CNA_Insider'];
  
  return{

    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    email: "tiger32w@gmail.com",
    newsletter_shortcode: shortcode[Math.floor(Math.random() * shortcode.length)],
    terms_condition: true,
     first_name: "Mongo",
    last_name: "Jumbo",
    emarsys_customdata: {"33651": "Toggle_Web2"  },
    subscription_source: "subscription_source",
    ...overrides
  };
  
}

unsubscribe(overrides = {}){

  return{

    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    email: "tiger32w@gmail.com",
    website: "toggle",
    ...overrides

  };
}

termsandcondition(overrides = {}){

  return{

    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    
    ...overrides

  };
}

profilereward(overrides = {}){

  return{

    client_id: "12EFDC3B-C4A0-40C4-911A-57152550BF85",
    secret_key: "4418B577-D7A7-4A02-8C83-A2FF7014418D",
    
    ...overrides

  };
}

usersubscription(overrides = {}){

  return{

    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    
    ...overrides

  };
}

userprofilemetadata(overrides = {}){

  return{

    client_id: "12EFDC3B-C4A0-40C4-911A-57152550BF85",
    secret_key: "4418B577-D7A7-4A02-8C83-A2FF7014418D",
    
    ...overrides

  };
}

automaticsignin(overrides = {}){

  return{

    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    
    ...overrides

  };
}

renewtoken(overrides = {}){

  return{

    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    
    ...overrides

  };
}

newslettersubscription(overrides = {}){

  return{

    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    
    ...overrides

  };
}

forgotpassword(overrides = {}){

  // const listofmail = ['dayseight26@gmail.com', 'channelnewsasia3@gmail.com','todaysonline2@gmail.com','dayseight22@gmail.com']
  // const email= listofmail[Math.floor(Math.random() * listofmail.length)]
   
  return{
    email: "todaysonline2@gmail.com",
    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    return_url: "https://github.com/",

    ...overrides
  };
}
 
resetpassword(overrides = {}){
  const resetpassword = getResetPassword();

  return{
    
    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    newPassword: resetpassword,
    confirmPassword: resetpassword,

    ...overrides
  
  };
}

updateuserprofile(minAge = 18, maxAge = 60){
  // random names
  const firstNames = ['John', 'Jane', 'Alex', 'Chris', 'Sam', 'Taylor'];
  const lastNames = ['Smith', 'Brown', 'Johnson', 'Lee', 'Wilson', 'Clark'];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];

  // Random gender
  const gender = Math.random() < 0.5 ? 'male' : 'female';

 // Random DOB
  const today = new Date();
  const start = new Date( today.getFullYear() - maxAge, today.getMonth(), today.getDate());
  const end = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  const randomDate = new Date( start.getTime() + Math.random() * (end.getTime() - start.getTime()) );
 const dob = randomDate.toISOString().split('T')[0]; // YYYY-MM-DD


  return{
    
    first_name: first,
    last_name: last,
    dob: dob,
    occupation: "3",
    gender: gender,
    nationality: "195",
    identification_number: "S0806655H",
    is_nric : true,
    ethnicity: "1",
    marital_status: "3",
    income: "2",
    home_phone :"9846714",
    mobile_phone: "9846714",
    block: "TestHouse",
    street: "TestStreet",
    building: "TestBuilding",
    unit: "TestUnit",
    postalcode: "138507",
    city: "Singapore",
    country: "195"

  };
}


  async headers_payload(overrides = {}) {

   const token = overrides.token ?? await Generatetoken();
    return{      
                
    headers: {
      Authorization: `Bearer ${token}`,
       Accept : "application/json",
       "Content-Type": "application/json",

       ...(overrides.headers || {})
    },
    ...overrides
    };          

}

requestotp(overrides = {}){

  return {

    client_id: "1e36e3c0-35a9-48c0-914e-5e37da1e3b95",
    secret_key: "9350D596-D57B-4F7C-B93D-DC951AB5A716",
    otp_expiry: 3,

    ...overrides

  };
}

Verifyotp(overrides = {}){
  return{
    
    client_id: "1e36e3c0-35a9-48c0-914e-5e37da1e3b95",
    secret_key: "9350D596-D57B-4F7C-B93D-DC951AB5A716",
    otp: "132669",

    ...overrides

  };
}

VerifyEmail(overrides = {}){

  return{

    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    email: "dayseight26@gmail.com",
    return_url: "https%3A%2F%2Fgithub.com%2F",

    ...overrides

  };
}

}
module.exports = new list_of_payloads();
