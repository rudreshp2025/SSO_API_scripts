const { test, expect } = require('@playwright/test');
const api = require('../helpers/apiClient');
const logger = require('../utils/logger');
const payloads = require('../utils/payloads');
const validate = require('../utils/responseverification');
const launchbrowser = require('../utils/browser');
const generatetoken= require('../helpers/emailGenerator');
const { fetchOTP } = require('../helpers/gmailOtpReader');



// Request and Verify OTP

test("Request and Verify OTP",{tag: ['@sanity', '@regression','@requestanverifyotp'],timeout : 60000},async () => {
  logger.log("Initiated Request OTP check");

  const payload = payloads.requestotp();
  const token = await generatetoken.Generatetoken({username:'channelnewsasia3@gmail.com'});

  console.log(token);

  const otpRequestTime = Math.floor(Date.now() / 1000);

  const response = await api.post("api/api/auth0/otp/request", payload, {headers:{Authorization:`Bearer ${token}`}});

  await validate.validation(response,200);
 
  logger.log("Request OTP's request successfull"); 

  logger.log("Initiated verify OTP check");   // Verify OTP


  const otp = await fetchOTP(otpRequestTime);

  console.log('OTP:', otp);

  const payload_1 = payloads.Verifyotp({otp});

  const response_1 = await api.post("api/api/auth0/otp/verify", payload_1, {headers:{Authorization:`Bearer ${token}`}});

  await validate.validation(response_1,200);
 
  logger.log("verify OTP's request successfull"); 
  
});

test("Request OTP - error occured",{tag: ['@regression','@requestanverifyotp'],timeout : 60000},async () => {
  logger.log("Initiated Request OTP check");

  const payload = payloads.requestotp({client_id: '1e36e3c0-35a9-48c0-914e-5e37da1e3b95-GH'});
  const token = await generatetoken.Generatetoken({username:'channelnewsasia3@gmail.com'});


  const response = await api.post("api/api/auth0/otp/request", payload, {headers:{Authorization:`Bearer ${token}`}});

  await validate.validation(response,401,'Error occured');
 
  logger.log("Request OTP's request successfull"); 

});

test("Verify OTP - error occured",{tag: ['@regression','@requestanverifyotp'],timeout : 60000},async () => {
  logger.log("Initiated verify OTP check");   // Verify OTP


 const token = await generatetoken.Generatetoken({username:'dayseight22@gmail.com'});

  const payload_1 = payloads.Verifyotp({client_id: '1e36e3c0-35a9-48c0-914e-5e37da1e3b95-GH'});

  const response_1 = await api.post("api/api/auth0/otp/verify", payload_1, {headers:{Authorization:`Bearer ${token}`}});

  await validate.validation(response_1,401,'Error occured');
 
  logger.log("verify OTP's request successfull"); 
  
});

test("Request OTP - Invalid parameter",{tag: ['@regression','@requestanverifyotp'],timeout : 60000},async () => {
  logger.log("Initiated Request OTP - Invalid parameters check");

  const payload = payloads.requestotp();

  const response = await api.post("api/api/auth0/otp/request", payload);

  await validate.validation(response,400,'Invalid parameters');
 
  logger.log("Request OTP's - Invalid parameters request successfull"); 

});

test("Verify OTP - Invalid parameter",{tag: ['@regression','@requestanverifyotp'],timeout : 60000},async () => {
  logger.log("Initiated verify OTP - Invalid parameters check");   

  const payload_1 = payloads.Verifyotp();

  const response_1 = await api.post("api/api/auth0/otp/verify", payload_1);

  await validate.validation(response_1,400,'Invalid parameters');
 
  logger.log("verify OTP's - Invalid parameters request successfull"); 
  
});

test("Request OTP - Invalid token",{tag: ['@regression','@requestanverifyotp'],timeout : 60000},async () => {
  logger.log("Initiated Request OTP check");

  const payload = payloads.requestotp();

  const token = await generatetoken.Generatetoken({username:'channelnewsasia3@gmail.com'});

  const response = await api.post("api/api/auth0/otp/request", payload, {headers:{Authorization:`Bearer ${token+"BHG"}`}});

  await validate.validation(response,401,'Invalid token');
 
  logger.log("Request OTP's request successfull"); 

});

test("Verify OTP - Invalid",{tag: ['@regression','@requestanverifyotp'],timeout : 60000},async () => {
  logger.log("Initiated verify OTP check");   // Verify OTP

 const token = await generatetoken.Generatetoken({username:'dayseight22@gmail.com'});

  const payload_1 = payloads.Verifyotp();

  const response_1 = await api.post("api/api/auth0/otp/verify", payload_1, {headers:{Authorization:`Bearer ${token+"BHG"}`}});

  await validate.validation(response_1,401,'Invalid token');
 
  logger.log("verify OTP's request successfull"); 
  
});


// meconnect sign in
test('meconnect signin',{tag: ['@sanity','@regression','@meconnectsignin']}, async () => {
  logger.log("Initiated meconnect signin check");
  //body
  const payload =  payloads.meconnectsignin_payload({});
    
  //sending the psot request
 const response = await api.post("api/api/auth0/signin",payload);

 await validate.validation(response,200);
 
  logger.log("meconnect sign in request successful!");
});

test('meconnect signin invalid parameters',{tag: ['@regression','@meconnectsignin']}, async () => {
  logger.log("Initiating.. invalid parameters trigger meconnect sign in");

  const payload = payloads.meconnectsignin_payload({ username : "dhdfhfjfj.com"});

  const response = await api.post("api/api/auth0/signin",payload);

  await validate.validation(response,400,'invalid parameters');

 logger.log("invalid parameters triggered for meconnect sign in");

});

test('meconnect signin invalid password',{tag: ['@regression','@meconnectsignin']}, async () => {
  logger.log("Initiating.. invalid password check using meconnect sign in");

  const payload = payloads.meconnectsignin_payload({ password : "12345789@rr"});

  const response = await api.post("api/api/auth0/signin",payload);

  await validate.validation(response,401,'password');

 logger.log("invalid password triggered for meconnect sign in");

});

test('meconnect signin - user doesnt exist',{tag: ['@regression','@meconnectsignin']}, async () => {
  logger.log("Initiating.. [user doesnt exist] check using meconnect sign in");

  const payload = payloads.meconnectsignin_payload({username:"abxyzhdjh940494@gmail.com"});

  const response = await api.post("api/api/auth0/signin", payload);

  await validate.validation(response,401,'exist');

  logger.log("user doesn't exist - triggered for meconnect sign in");

});

test('meconnect signin - user disabled',{tag: ['@regression','@meconnectsignin']}, async() => {
 logger.log("Initiating.. [user disabled] check using meconnect sign in");

 const payload = payloads.meconnectsignin_payload({username : "rudreshp180+1@gmail.com"});

 const response = await api.post("api/api/auth0/signin",payload);

 await validate.validation(response,401,'disabled');

 logger.log("user disabled - triggered for meconnect sign in");
 
});

test('meconnect signin - deleted user',{tag: ['@regression','@meconnectsignin']}, async() => {
 logger.log("Initiating.. [deleted user] check using meconnect sign in");

 const payload = payloads.meconnectsignin_payload({username : "rudreshp180+3@gmail.com"});

 const response = await api.post("api/api/auth0/signin",payload);

 await validate.validation(response,401,'deleted');

 logger.log("deleted user - triggered for meconnect sign in");
});

// meconnect signup

test("meconnect signup",{tag: ['@sanity','@regression','@meconnectsignup']}, async() =>{
  logger.log("Initiated meconnect signup check");

  const payload = await payloads.meconnectsignup_payload();
    

  const response = await api.post("api/api/auth0/signup",payload);


  await validate.validation(response,200);

  logger.log("meconnect signup request successfull");

});

test("meconnect signup - invalid email",{tag: ['@regression','@meconnectsignup']}, async() =>{
  logger.log("Initiated.. invalid email - meconnect signup check");

  const payload = await payloads.meconnectsignup_payload({username:"abcdfeh@gmailcom"});
    

  const response = await api.post("api/api/auth0/signup",payload);


  await validate.validation(response,400,'Valid email','username');

  logger.log("meconnect signup - invalid email request successfull");

});

test("meconnect signup - email already exists",{tag: ['@regression','@meconnectsignup']}, async() =>{
  logger.log("Initiated.. email already exists - meconnect signup check");

  const payload = await payloads.meconnectsignup_payload({username:"todaysonline2@gmail.com"});
    

  const response = await api.post("api/api/auth0/signup",payload);


  await validate.validation(response,401,'already exist');

  logger.log("meconnect signup - email already exists request successfull");

});

test("meconnect signup - null password",{tag: ['@regression','@meconnectsignup']}, async() =>{
  logger.log("Initiated.. email already exists - meconnect signup check");

  const payload = await payloads.meconnectsignup_payload({password:""});
    

  const response = await api.post("api/api/auth0/signup",payload);


  await validate.validation(response,400,'Please enter your password','password');

  logger.log("meconnect signup - null password request successfull");

});

test("meconnect signup - password minimum characters",{tag: ['@regression','@meconnectsignup']}, async() =>{
  logger.log("Initiated.. password minimum characters - meconnect signup check");

  const payload = await payloads.meconnectsignup_payload({password:"1234567"});
    

  const response = await api.post("api/api/auth0/signup",payload);


  await validate.validation(response,400,'at least 8 characters','password');

  logger.log("meconnect signup - password minimum characters request successfull");

});

test("meconnect signup - Invalid DOB",{tag: ['@regression','@meconnectsignup']}, async() =>{
  logger.log("Initiated.. Invalid DOB - meconnect signup check");

  const payload = await payloads.meconnectsignup_payload({dob:"1987-02-35"});
    

  const response = await api.post("api/api/auth0/signup",payload);


  await validate.validation(response,400,'valid date','dob');

  logger.log("meconnect signup - Invalid DOB request successfull");

});

test("meconnect signup - Invalid gender",{tag: ['@regression','@meconnectsignup']}, async() =>{
  logger.log("Initiated.. Invalid gender - meconnect signup check");

  const payload = await payloads.meconnectsignup_payload({gender:"maluu"});
    

  const response = await api.post("api/api/auth0/signup",payload);


  await validate.validation(response,400,'valid gender');

  logger.log("meconnect signup - Invalid gender request successfull");

});

// Device signin

test('Device signin - type = mobile',{tag: ['@sanity','@regression','@devicesignin']}, async() => {
 logger.log("Initiated.. Device signin check with mandatory parameters for the type of mobile");

 const payload = payloads.devicesignin_payload({os : "", browser : ""});

 const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

 await validate.validation(response,200);

 logger.log("Device signin request successfull using mandatory parameters for the type of mobile");

});

test('Device signin - type = mobile (without mandatory fields)',{tag: ['@regression','@devicesignin']}, async() => {
 logger.log("Initiated.. Device signin check by removing mandatory parameters for the type of web");

 const payload = payloads.devicesignin_payload({name : " ", manufacturer : " ",model : " "});

 const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

 await validate.validation(response,400,'invalid parameters');

 logger.log("Device signin request successfull by removing mandatory parameters for the type of mobile");

});

test('Device signin - type = web',{tag: ['@sanity','@regression','@devicesignin']}, async() => {
 logger.log("Initiated.. Device signin check with mandatory parameters for the type of web");

 const payload = payloads.devicesignin_payload({type : "web",name : " ", manufacturer : " ",model : " "});

 const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

 await validate.validation(response,200);

 logger.log("Device signin request successfull using mandatory parameters for the type of web");

});

test('Device signin - type = web (without mandatory fields)',{tag: ['@regression','@devicesignin']}, async() => {
 logger.log("Initiated.. Device signin check by removing mandatory parameters for the  type of web");

 const payload = payloads.devicesignin_payload({type : "web",os : "",browser : ""});

 const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

 await validate.validation(response,400,'invalid parameters');

 logger.log("Device signin request successfull by removing mandatory parameters for the  type of web");

});

test('Device signin - type = tv',{tag: ['@sanity','@regression','@devicesignin']}, async() => {
 logger.log("Initiated.. Device signin check with mandatory parameters for the type of tv");

 const payload = payloads.devicesignin_payload({type : "tv",os : "",browser : ""});

 const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

 await validate.validation(response,200);

 logger.log("Device signin request successfull using mandatory parameters for the type of tv");

});

test('Device signin - type = tv (without mandatory fields)',{tag: ['@regression','@devicesignin']}, async() => {
 logger.log("Initiated.. Device signin check by removing mandatory parameters for the  type of tv");

 const payload = payloads.devicesignin_payload({type : "tv",name : " ", manufacturer : " ",model : " "});

 const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

 await validate.validation(response,400,'invalid parameters');

 logger.log("Device signin request successfull by removing mandatory parameters for the  type of tv");

});

test('Device signin - type = others',{tag: ['@sanity','@regression','@devicesignin']}, async() => {
 logger.log("Initiated.. Device signin check with mandatory parameters for the type of others");

 const payload = payloads.devicesignin_payload({type : "others", manufacturer : "",model : "",OS : "",browser : ""});

 const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

 await validate.validation(response,200);

 logger.log("Device signin request successfull using mandatory parameters for the type of others");

});

test('Device signin - type = others (without mandatory fields)',{tag: ['@regression','@devicesignin']}, async() => {
 logger.log("Initiated.. Device signin check by removing mandatory parameters for the  type of others");

 const payload = payloads.devicesignin_payload({type : "others",name : " "});

 const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

 await validate.validation(response,400,'invalid parameters');

 logger.log("Device signin request successfull by removing mandatory parameters for the  type of others");

});

test('Device signin invalid parameters',{tag: ['@regression','@devicesignin']}, async () => {
  logger.log("Initiating.. invalid parameters trigger meconnect sign in");

  const payload = payloads.devicesignin_payload({ username : "dhdfhfjfj.com"});

  const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

  await validate.validation(response,400,'invalid parameters');

 logger.log("invalid parameters triggered for device sign in");

});

test('device signin invalid password',{tag: ['@regression','@devicesignin']}, async () => {
  logger.log("Initiating.. invalid password check using device sign in");

  const payload = payloads.devicesignin_payload({ password : "12345789@rr"});

  const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

  await validate.validation(response,401,'password');

 logger.log("invalid password triggered for device sign in");

});

test('device signin - user doesnt exist',{tag: ['@regression','@devicesignin']}, async () => {
  logger.log("Initiating.. [user doesnt exist] check using device sign in");

  const payload = payloads.devicesignin_payload({username:"abxyzhdjh940494@gmail.com"});

  const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

  await validate.validation(response,401,'exist');

  logger.log("user doesn't exist - triggered for device sign in");

});

test('device signin - user disabled',{tag: ['@regression','@devicesignin']}, async() => {
 logger.log("Initiating.. [user disabled] check using device sign in");

 const payload = payloads.devicesignin_payload({username : "rudreshp180+1@gmail.com"});

 const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

 await validate.validation(response,401,'disabled');

 logger.log("user disabled - triggered for device sign in");
 
});

test('device signin - deleted user',{tag: ['@regression','@devicesignin']}, async() => {
 logger.log("Initiating.. [deleted user] check using device sign in");

 const payload = payloads.devicesignin_payload({username : "rudreshp180+3@gmail.com"});

 const response = await api.post("api/api/auth0/device-signin",payload,{ headers: {"device-identifier" : "apimocktestdevice" }});

 await validate.validation(response,401,'deleted');

 logger.log("deleted user - triggered for device sign in");

});

// Get profile

test("get profile",{tag: ['@sanity','@regression','@getprofile']}, async() => {
  logger.log("Initiated get profile check");

  const headerpayload = await payloads.headers_payload();
 
  const response = await api.get("api/api/auth0/profile/get", headerpayload);

  await validate.validation(response,200);

  logger.log("get profile request successfull");
});

test("get profile - Invalid token",{tag: ['@regression','@getprofile']}, async() => {
  logger.log("Initiated get profile check for invalid token");

  const headerpayload = await payloads.headers_payload({token: "fddfff3322dsdddsds"});
 
  const response = await api.get("api/api/auth0/profile/get", headerpayload);

  await validate.validation(response,401);

  logger.log("get profile - invalid token request successfull");
});

// update user profile

test("update user profile",{tag: ['@sanity', '@regression','@updateuserprofile']}, async() => {
  logger.log("Initiated update user profile check");

  const payload =  payloads.updateuserprofile();
  const token = await generatetoken.Generatetoken();

  const response = await api.post("api/api/auth0/profile/update",payload,{headers: {Authorization: `Bearer ${token}` }});

  await validate.validation(response,200);

  logger.log("update user profile request successfull");
});

test("update user profile - invalid token",{tag: ['@regression','@updateuserprofile']}, async() => {
  logger.log("Initiated update user profile - invalid token check");

  const payload =  payloads.updateuserprofile();
  const token = await generatetoken.Generatetoken();

  const response = await api.post("api/api/auth0/profile/update",payload,{headers: {Authorization: `Bearer ${token+"jjjjjj"}` }});

  await validate.validation(response,401);

  logger.log("update user profile - invalid token request successfull");
});

// Subscribe

let shortcode;

test("Subscribe ",{tag: ['@sanity','@regression','@subscribe']}, async() => {
  logger.log("Initiated subscribe check");

  const payload =  payloads.subscribe();

  const response = await api.post("api/api/auth0/subscribe",payload);

  await validate.validation(response,200);
  const body = await response.json();
   shortcode = body.subscriptions[0].shortcode;
  console.log("shortcode: ",shortcode);

  logger.log("Subscribe request successfull");
});

test("Subscribe - mandatory fields",{tag: ['@regression','@subscribe']}, async() => {
  logger.log("Initiated subscribe check with mandatory fields");

  const payload =  payloads.subscribe({first_name: "",last_name: "",emarsys_customdata:"",subscription_source: "",});

  const response = await api.post("api/api/auth0/subscribe",payload);

  await validate.validation(response,200);

  logger.log("Subscribe - mandatory fields request successfull");
});

test("Subscribe - invalid email",{tag: ['@regression','@subscribe']}, async() => {
  logger.log("Initiated subscribe check with invalid email");

  const payload =  payloads.subscribe({email: "tiger32w@gmailcom"});

  const response = await api.post("api/api/auth0/subscribe",payload);

  await validate.validation(response,400,'valid email');

  logger.log("Subscribe - invalid email request successfull");
});

test("Subscribe - invalid client id",{tag: ['@regression','@subscribe']}, async() => {
  logger.log("Initiated subscribe check with invalid client id");

  const payload =  payloads.subscribe({client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7-fdsa"});

  const response = await api.post("api/api/auth0/subscribe",payload);

  await validate.validation(response,401,'error occured');

  logger.log("Subscribe - invalid client id request successfull");
});

test("Subscribe - invalid secret key",{tag: ['@regression','@subscribe']}, async() => {
  logger.log("Initiated subscribe check with invalid secret key");

  const payload =  payloads.subscribe({secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F-dfddf"});

  const response = await api.post("api/api/auth0/subscribe",payload);

  await validate.validation(response,401,'error occured');

  logger.log("Subscribe - invalid secret key request successfull");
});

test("Subscribe - invalid shortcode",{tag: ['@regression','@subscribe']}, async() => {
  logger.log("Initiated subscribe check with invalid shortcode");

  const payload =  payloads.subscribe({newsletter_shortcode: ""});

  const response = await api.post("api/api/auth0/subscribe",payload);

  await validate.validation(response,400,'invalid shortcode');

  logger.log("Subscribe - invalid shortcode request successfull");
});

test("Subscribe - T&C set to false",{tag: ['@regression','@subscribe']}, async() => {
  logger.log("Initiated subscribe check with terms and condition");

  const payload =  payloads.subscribe({terms_condition: false,});

  const response = await api.post("api/api/auth0/subscribe",payload);

  await validate.validation(response,400,'Please agree to the Terms of Service & Privacy Policy');

  logger.log("Subscribe - terms and condition set to false request successfull");
});

test("UnSubscribe ",{tag: ['@sanity','@regression','@Unsubscribe']}, async() => {
  logger.log("Initiated unsubscribe check");

  const params =  payloads.unsubscribe()

  const response = await api.get("api/api/v2/subscription/unsubscribe",{params });
  await validate.validation(response,200);

  logger.log("Unsubscribe request successfull");
});

test("UnSubscribe -invalid parameters",{tag: ['@regression','@Unsubscribe']}, async() => {
  logger.log("Initiated unsubscribe - invalid parameters check");

  const params =  payloads.unsubscribe({client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7-gfd"})

  const response = await api.get("api/api/v2/subscription/unsubscribe",{params });
  await validate.validation(response,400,'invalid parameters');

  logger.log("Unsubscribe - invalid parameters request successfull");
});

test("UnSubscribe -user doesn't exist",{tag: ['@regression','@Unsubscribe']}, async() => {
  logger.log("Initiated unsubscribe - user doesn't exist check");

  const params =  payloads.unsubscribe({email: "tiger3test4532w@gmail.com"})

  const response = await api.get("api/api/v2/subscription/unsubscribe",{params });
  await validate.validation(response,401,'user does not exist');

  logger.log("Unsubscribe - user doesn't exist request successfull");
});

// terms and condition

test("terms and condition",{tag: ['@sanity','@regression','@termsandcondition']}, async() => {
  logger.log("Initiated terms and condidition check");

  const params =  payloads.termsandcondition();
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/profile/termsandconditions/get",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,200);

  logger.log("terms and condidition request successfull");
});

test("terms and condition - Invalid token",{tag: ['@regression','@termsandcondition']}, async() => {
  logger.log("Initiated terms and condidition - invalid token check");

  const params =  payloads.termsandcondition();
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/profile/termsandconditions/get",{params, headers: {Authorization: `Bearer ${token+"ddeee"}`}});

  await validate.validation(response,401,'invalid token');

  logger.log("terms and condidition - Invalid token request successfull");
});

test("terms and condition - Invalid client id",{tag: ['@regression','@termsandcondition']}, async() => {
  logger.log("Initiated terms and condidition - invalid client id check");

  const params =  payloads.termsandcondition({client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7-htyd"});
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/profile/termsandconditions/get",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,401,'error occured');

  logger.log("terms and condidition - Invalid client id request successfull");
});

test("terms and condition - Invalid secret key",{tag: ['@regression','@termsandcondition']}, async() => {
  logger.log("Initiated terms and condidition - invalid secret key check");

  const params =  payloads.termsandcondition({secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F-fddssds"});
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/profile/termsandconditions/get",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,401,'error occured');

  logger.log("terms and condidition - Invalid secret key request successfull");
});

//Profile Reward

test("profile reward",{tag: ['@sanity','@regression','@profilereward']}, async() => {
  logger.log("Initiated profile rewards check");

  const params =  payloads.profilereward();
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/profile/reward",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,200);

  logger.log("profile reward request successfull");
});

test("profile reward - Invalid token",{tag: ['@regression','@profilereward']}, async() => {
  logger.log("Initiated profile reward - invalid token check");

  const params =  payloads.profilereward();
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/profile/reward",{params, headers: {Authorization: `Bearer ${token+"ddeee"}`}});

  await validate.validation(response,401,'invalid token');

  logger.log("profile reward - Invalid token request successfull");
});

test("profile reward - Invalid client id",{tag: ['@regression','@profilereward']}, async() => {
  logger.log("Initiated profile reward - invalid client id check");

  const params =  payloads.profilereward({client_id: "12EFDC3B-C4A0-40C4-911A-57152550BF85-htyd"});
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/profile/reward",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,400,'invalid parameters');

  logger.log("profile reward - Invalid client id request successfull");
});

test("profile reward - Invalid secret key",{tag: ['@regression','@profilereward']}, async() => {
  logger.log("Initiated profile reward - invalid secret key check");

  const params =  payloads.profilereward({secret_key: "4418B577-D7A7-4A02-8C83-A2FF7014418D-fddssds"});
  const token = await generatetoken.Generatetoken();

   const response = await api.get("api/api/v2/profile/reward",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,400,'invalid parameters');

  logger.log("profile reward - Invalid secret key request successfull");
});

// User subscription
test("user subscription",{tag: ['@sanity','@regression','@usersubscription']}, async() => {
  logger.log("Initiated user subscription  check");

  const params =  payloads.usersubscription();
  const token = await generatetoken.Generatetoken();

   const response = await api.get("api/api/v2/get/profile/subscriptions",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,200);

  logger.log("user subscription request successfull");
});

test("user subscription - Invalid token",{tag: ['@regression','@usersubscription']}, async() => {
  logger.log("Initiated user subscription - invalid token check");

  const params =  payloads.usersubscription();
  const token = await generatetoken.Generatetoken();

   const response = await api.get("api/api/v2/get/profile/subscriptions",{params, headers: {Authorization: `Bearer ${token+"hfff"}`}});

  await validate.validation(response,401,'invalid token');

  logger.log("user subscription -invalid token request successfull");
});

test("user subscription - Invalid client id",{tag: ['@regression','@usersubscription']}, async() => {
  logger.log("Initiated profile reward - invalid client id check");

  const params =  payloads.usersubscription({client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7-htyd"});
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/get/profile/subscriptions",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,400,'invalid parameters');

  logger.log("user subscription - Invalid client id request successfull");
});

test("user subscription - Invalid secret key",{tag: ['@regression','@usersubscription']}, async() => {
  logger.log("Initiated user subscription - invalid secret key check");

  const params =  payloads.usersubscription({secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F-fddssds"});
  const token = await generatetoken.Generatetoken();

   const response = await api.get("api/api/v2/get/profile/subscriptions",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,400,'invalid parameters');

  logger.log("user subscription - Invalid secret key request successfull");
});

// user profile metadata

test("user profile metadata",{tag: ['@sanity','@regression','@userprofilemetadata']}, async() => {
  logger.log("Initiated user profile metadata check");

  const params =  payloads.userprofilemetadata();
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/userinfo/cnarevamp",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,200);

  logger.log("user profile metadata request successfull");
});

test("user profile metadata - Invalid token",{tag: ['@regression','@userprofilemetadata']}, async() => {
  logger.log("Initiated user profile metadata - invalid token check");

  const params =  payloads.userprofilemetadata();
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/userinfo/cnarevamp",{params, headers: {Authorization: `Bearer ${token+"ddeee"}`}});

  await validate.validation(response,401,'invalid token');

  logger.log("user profile metadata - Invalid token request successfull");
});

test("user profile metadata - Invalid client id",{tag: ['@regression','@userprofilemetadata']}, async() => {
  logger.log("Initiated user profile metadata - invalid client id check");

  const params =  payloads.userprofilemetadata({client_id: "12EFDC3B-C4A0-40C4-911A-57152550BF85-htyd"});
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/v2/userinfo/cnarevamp",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,401,'not authorized');

  logger.log("user profile metadata - Invalid client id request successfull");
});

test("user profile metadata - Invalid secret key",{tag: ['@regression','@userprofilemetadata']}, async() => {
  logger.log("Initiated user profile metadata - invalid secret key check");

  const params =  payloads.userprofilemetadata({secret_key: "4418B577-D7A7-4A02-8C83-A2FF7014418D-fddssds"});
  const token = await generatetoken.Generatetoken();

   const response = await api.get("api/api/v2/userinfo/cnarevamp",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,401,'not authorized');

  logger.log("user profile metadata - Invalid secret key request successfull");
});

// Automatic signin

test("Automatic signin",{tag: ['@sanity','@regression','@Automaticsignin']}, async() => {
  logger.log("Initiated Automatic signin  check");

  const payload =  payloads.automaticsignin();
  const token = await generatetoken.Generatetoken();

   const response = await api.post("api/api/auth0/autosignin",payload, {headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,200);

  logger.log("Automatic signin request successfull");
});

test("Automatic signin - Invalid token",{tag: ['@regression','@Automaticsignin']}, async() => {
  logger.log("Initiated Automatic signin - invalid token check");

  const payload =  payloads.automaticsignin();
  const token = await generatetoken.Generatetoken();

   const response = await api.post("api/api/auth0/autosignin",payload, {headers: {Authorization: `Bearer ${token+"hfff"}`}});

  await validate.validation(response,401,'invalid token');

  logger.log("Automatic signin -invalid token request successfull");
});

test("Automatic signin - Invalid client id",{tag: ['@regression','@Automaticsignin']}, async() => {
  logger.log("Initiated profile reward - invalid client id check");

  const payload =  payloads.automaticsignin({client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7-htyd"});
  const token = await generatetoken.Generatetoken();

  const response = await api.post("api/api/auth0/autosignin",payload, {headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,400,'invalid parameters');

  logger.log("Automatic signin - Invalid client id request successfull");
});

test("Automatic signin - Invalid secret key",{tag: ['@regression','@Automaticsignin']}, async() => {
  logger.log("Initiated Automatic signin - invalid secret key check");

  const payload =  payloads.automaticsignin({secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F-fddssds"});
  const token = await generatetoken.Generatetoken();

   const response = await api.post("api/api/auth0/autosignin",payload, {headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,400,'invalid parameters');

  logger.log("Automatic signin - Invalid secret key request successfull");
});

// Renew token
test("Renew token",{tag: ['@sanity','@regression','@renewtoken']}, async() => {
  logger.log("Initiated Renew token  check");

  const params =  payloads.renewtoken();
  const token = await generatetoken.Generatetoken();

   const response = await api.get("api/api/auth0/renewtoken",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,200);

  logger.log("Renew token request successfull");
});

test("Renew token - Invalid token",{tag: ['@regression','@renewtoken']}, async() => {
  logger.log("Initiated Renew token - invalid token check");

  const params =  payloads.renewtoken();
  const token = await generatetoken.Generatetoken();

   const response = await api.get("api/api/auth0/renewtoken",{params, headers: {Authorization: `Bearer ${token+"hfff"}`}});

  await validate.validation(response,401,'invalid token');

  logger.log("Renew token -invalid token request successfull");
});

test("Renew token - Invalid client id",{tag: ['@regression','@renewtoken']}, async() => {
  logger.log("Initiated profile reward - invalid client id check");

  const params =  payloads.renewtoken({client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7-htyd"});
  const token = await generatetoken.Generatetoken();

  const response = await api.get("api/api/auth0/renewtoken",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,401,'Invalid ClientId or Secret key');

  logger.log("Renew token - Invalid client id request successfull");
});

test("Renew token - Invalid secret key",{tag: ['@regression','@renewtoken']}, async() => {
  logger.log("Initiated Renew token - invalid secret key check");

  const params =  payloads.renewtoken({secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F-fddssds"});
  const token = await generatetoken.Generatetoken();

   const response = await api.get("api/api/auth0/renewtoken",{params, headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response,401,'Invalid ClientId or Secret key');

  logger.log("Renew token - Invalid secret key request successfull");
});

//Newsletter subscription

test("Newsletter subscription",{tag: ['@sanity','@regression','@Newslettersubscription']}, async() => {
  logger.log("Initiated Newsletter subscription  check");

  const params =  payloads.newslettersubscription();

   const response = await api.get("api/api/v2/get/subscriptions",{params});

  await validate.validation(response,200);

  logger.log("Newsletter subscription request successfull");
});


test("Newsletter subscription - Invalid client id",{tag: ['@regression','@Newslettersubscription']}, async() => {
  logger.log("Initiated profile reward - invalid client id check");

  const params =  payloads.newslettersubscription({client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7-htyd"});
  
  const response = await api.get("api/api/v2/get/subscriptions",{params});

  await validate.validation(response,400,'Invalid parameters');

  logger.log("Newsletter subscription - Invalid client id request successfull");
});

test("Newsletter subscription - Invalid secret key",{tag: ['@regression','@Newslettersubscription']}, async() => {
  logger.log("Initiated Newsletter subscription - invalid secret key check");

  const params =  payloads.newslettersubscription({secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F-fddssds"});
 
   const response = await api.get("api/api/v2/get/subscriptions",{params});

  await validate.validation(response,400,'Invalid parameters');

  logger.log("Newsletter subscription - Invalid secret key request successfull");
});

//Forgot  and reset password [email: mediamewatch@gmail.com, newsasiac@gmail.com, dayseight26@gmail.com, eightworldappln@gmail.com]

test("forgotpassword and Reset password",{tag: ['@sanity','@regression','@forgot_reset_password'],timeout : 60000},async () => {
  logger.log("Initiated forgot password check");

  const payload = payloads.forgotpassword({email : "mediamewatch@gmail.com"});

  const response = await api.post("api/api/auth0/profile/forgot_password",payload);

  await validate.validation(response,200);

 // Grab the url
  const body = await response.json();
  const reset_pwd_url = body.verificationEmail;
 
  logger.log("forgot password request successfull");
  

  logger.log("Initiated reset password check"); //Reset Password

  const currenturl = await launchbrowser.launchurl(reset_pwd_url);

  // extract token from url
  const token =  new URL(currenturl).searchParams.get("token");

  const payload_1 = payloads.resetpassword();

  const response_1 = await api.post("api/api/auth0/profile/reset_password",payload_1,{ headers: {Authorization: `Bearer ${token}`}});

  console.log("Token:", token);

  await validate.validation(response_1,200);

  logger.log("reset password request successfull");

});

test("forgotpassword - Invalid parameters",{tag: ['@regression','@forgot_reset_password'],timeout : 60000},async () => {
  logger.log("Initiated forgot password - Invalid parameter check");

  const payload = payloads.forgotpassword({client_id: '05bf8e42-5bb6-468c-9c89-143b20ba47e7HG'});

  const response = await api.post("api/api/auth0/profile/forgot_password",payload);

  await validate.validation(response,400,'Invalid parameters');
 
  logger.log("forgot password - Invalid parameter request successfull");

});

test("forgotpassword - disabled user",{tag: ['@regression','@forgot_reset_password'],timeout : 60000},async () => {
  logger.log("Initiated forgot password - disabled user check");

  const payload = payloads.forgotpassword({email: 'rudreshp180+1@gmail.com'});

  const response = await api.post("api/api/auth0/profile/forgot_password",payload);

  await validate.validation(response,401,'Account has been disabled');
 
  logger.log("forgot password - disabled user request successfull");

});

test("forgotpassword - deleted user",{tag: ['@regression','@forgot_reset_password'],timeout : 60000},async () => {
  logger.log("Initiated forgot password - deleted user check");

  const payload = payloads.forgotpassword({email: 'rudreshp180+3@gmail.com'});

  const response = await api.post("api/api/auth0/profile/forgot_password",payload);

  await validate.validation(response,401,'Account Deleted');
 
  logger.log("forgot password - deleted user request successfull");

});

// Email [mediamewatch@gmail.com, newsasiac@gmail.com, dayseight26@gmail.com, eightworldappln@gmail.com,todaysonline2@gmail.com]
test("Reset password - Error occured",{tag: ['@regression','@forgot_reset_password'],timeout : 60000},async () => {
  logger.log("Initiated forgot password - Error occured check in reset passsword");

  const payload = payloads.forgotpassword({email :"eightworldappln@gmail.com"});

  const response = await api.post("api/api/auth0/profile/forgot_password",payload);

  await validate.validation(response,200);

 // Grab the url
  const body = await response.json();
  const reset_pwd_url = body.verificationEmail;
 
  logger.log("forgot password request successfull");
  

  logger.log("Initiated reset password - error occured check"); //Reset Password

  const currenturl = await launchbrowser.launchurl(reset_pwd_url);

  // extract token from url
  const token =  new URL(currenturl).searchParams.get("token");

  const payload_1 = payloads.resetpassword({client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7-HG"});

  const response_1 = await api.post("api/api/auth0/profile/reset_password",payload_1,{ headers: {Authorization: `Bearer ${token}`}});

  await validate.validation(response_1,401,'Error Occured');

  logger.log("reset password - error occured request successfull");

});

test("Reset password - Invalid token",{tag: ['@regression','@forgot_reset_password'],timeout : 60000},async () => {  

  logger.log("Initiated reset password -Invalid token check"); //Reset Password


  const payload_1 = payloads.resetpassword({});

  const response_1 = await api.post("api/api/auth0/profile/reset_password",payload_1,{ headers: {Authorization: `Bearer ${"hdhdhddhjhhjh"}`}});

  await validate.validation(response_1,401,'Invalid token');

  logger.log("reset password - Invalid token request successfull");

});

test("Verify email ",{tag: ['@sanity','@regression','@verifyemail']}, async() => {
  logger.log("Initiated Verify email check");

  const params =  payloads.VerifyEmail();
  const response = await api.get("api/api/auth0/verifyemail",{params});

  await validate.validation(response,200,'activate?token');

  logger.log("Verify email request successfull");
});

test("Verify email - Invalid client ID ",{tag: ['@regression','@verifyemail']}, async() => {
  logger.log("Initiated Verify email - Invalid client ID check");

  const params =  payloads.VerifyEmail({ client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7-GH"});

  const response = await api.get("api/api/auth0/verifyemail",{params});

  await validate.validation(response,401,'error occured');

  logger.log("Verify email - Invalid client ID request successfull");
});

test("Verify email - Invalid Secret key ",{tag: ['@regression','@verifyemail']}, async() => {
  logger.log("Initiated Verify email - Invalid Secret key check");

  const params =  payloads.VerifyEmail({ secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F-jk"});

  const response = await api.get("api/api/auth0/verifyemail",{params});

  await validate.validation(response,401,'error occured');

  logger.log("Verify email - Invalid Secret key request successfull");
});

test("Verify email - Invalid email ",{tag: ['@regression','@verifyemail']}, async() => {
  logger.log("Initiated Verify email - Invalid email check");

  const params =  payloads.VerifyEmail({ email: "dayseight26@gmailcom"});

  const response = await api.get("api/api/auth0/verifyemail",{params});

  await validate.validation(response,401,'User does not exist');

  logger.log("Verify email - Invalid email request successfull");
});

test("Verify email - Invalid parameters ",{tag: ['@regression','@verifyemail']}, async() => {
  logger.log("Initiated Verify email - Invalid parameters check");

  const params =  payloads.VerifyEmail({ return_url: ""});

  const response = await api.get("api/api/auth0/verifyemail",{params});

  await validate.validation(response,400,'Invalid parameters');

  logger.log("Verify email - Invalid parameters request successfull");
});


