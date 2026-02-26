const { test, expect } = require('@playwright/test');
const api = require('../utils/UDH_apiClient');
const logger = require('../utils/logger');
const payloads = require('../utils/payloads');
const validate = require('../utils/responseverification');
const config = require('../config/UDH_env')

let user_id = config.user_id; 
let subscription_key = config.subscription_key;
let obj_id = "8a661b3b-1755-4535-89f0-c4c8520cc697";
let invalid_obj_id = "8a661b3b-1755-4535-89f0-c4c8520cc697hhhhhhikjkjjjokjikjklmklmkojionlnlkmoijiojolkmklhhhhhhikjkjjjokjikjklmklmkojionlnlkmoijiojolkmklhhhhhhikjkjjjokjikjklmklmkojionlnlkmoijiojolkmklhhhhhhikjkjjjokjikjklmklmkojionlnlkmoijiojolkmklhhhhhhikjkjjjokjikjklmklmkojionlnlkmoijiojolkmkl";
let profile_subscription_key = config.profile_subscription_key;

test("Likes - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@likes'],timeout : 60000},async () => {
  // Post method respoonse
  logger.log("Initiated Likes - post with userid check");

  const payload = await payloads.UDH_payload('likes',[]);

  const response_userid_post = await api.post(`/api/likes/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_post,200);

 logger.log("Likes - post with userid request successfull"); 

 //Get method response
 logger.log("Initiated Likes - get with userid check"); 

  const response_userid_get = await api.get(`/api/likes/v1/${user_id}`,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  if (JSON.stringify(postResponse)===JSON.stringify(getResponse)) { 
  console.log("[Result] The responses of the POST and GET methods using the userId are identical.");
  } else {
  console.log("[Result] The responses of the POST and GET methods using the userId are different.");
  }
  
  logger.log("Likes - get with userid request successfull"); 

});

test("nLikes - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@likes'],timeout : 60000},async () => {
  // get method respoonse
  logger.log("Initiated nLikes - get with userid check");

  const response_userid_get = await api.get(`/api/nlikes/v1/8a661b3b-1755-4535-89f0-c4c8520cc697`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 logger.log("Likes - get with userid request successfull"); 

 //post method response
 logger.log("Initiated Likes - post with userid check"); 

  const response_userid_post = await api.post(`/api/nlikes/v1`, [{ id: "8A661B3b-1755-4535-89F0-c4c8520Cc697" }],{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  expect(postResponse).toContainEqual(getResponse);

  console.log("[Result] id and nLikes match between GET and POST.");

  logger.log("Likes - post with userid request successfull"); 

});



test("Likes - post with userid",{tag: ['@sanity', '@regression','@likes'],timeout : 60000},async () => {
  logger.log("Initiated Likes - post with userid check");

  const payload = await payloads.UDH_payload('likes',[]);

  const response = await api.post(`/api/likes/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
 
  logger.log("Likes - post with userid request successfull"); 

});

test("Likes - post with userid - invalid body",{ tag: ['@regression','@likes'] },async () => {
  logger.log("Likes - post with userid - invalid body check");

  const payload = await payloads.UDH_payload('likesssd', []);
  
  const response = await api.post(`/api/likes/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
 
  logger.log("Likes - post with userid - invalid body request successfull"); 

});

test("Likes - post with userid - invalid subscription key",{ tag: ['@regression','@likes'] },async () => {
  logger.log("Likes - post with userid - invalid subscription key check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/likes/v1/${user_id}`, payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("Likes - post with userid - invalid subscription key request successfull"); 

});

test("Likes - post with userid - invalid userid",{ tag: ['@regression','@likes'] },async () => {
  logger.log("Likes - post with userid - invalid userid check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/likes/v1/${user_id}890`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("Likes - post with userid - invalid userid request successfull"); 

});

test("Likes - post with userid - Adding the new content",{ tag: ['@regression','@likes'] },async () => {
  logger.log("Likes - post with userid - Adding the new content");

  const payload = await payloads.UDH_payload('likes',[{id:"1001", status:true}]);
  
  const response = await api.post(`/api/likes/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("Likes - post with userid - Adding the new content request successfull"); 

});

test("Likes - post with userid - Removing the content",{ tag: ['@regression','@likes'] },async () => {
  logger.log("Likes - post with userid - Removing the content check");

  const payload = await payloads.UDH_payload('likes',[{id:"1001", status:false}]);
  
  const response = await api.post(`/api/likes/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("Likes - post with userid - Removing the content request successfull"); 

});

test("Likes - get with userid",{ tag: ['@sanity','@regression','@likes'] },async () => {
  logger.log("Likes - get with userid check");
  
  const response = await api.get(`/api/likes/v1/${user_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("Likes - get with userid request successfull"); 

});

test("Likes - get with userid - No data found",{ tag: ['@regression','@likes'] },async () => {
  logger.log("Likes - get with userid - No data found check");
  
  const response = await api.get(`/api/likes/v1/806d89b9-8d19-466d-98b0-e027eddda0b0`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'likes' data was found");
  
  logger.log("Likes - get with userid - No data found request successfull"); 

});

test("Likes - get with invalid userid",{ tag: ['@regression','@likes'] },async () => {
  logger.log("Likes - get with invalid userid check");
  
  const response = await api.get(`/api/likes/v1/806d89b9-8d19-466d-98b0-e027eddda0b0bgjj`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("Likes - get with invalid userid request successfull"); 

});

test("Likes - get with userid - invalid subscription key",{ tag: ['@regression','@likes'] },async () => {
  logger.log("Likes - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/likes/v1/${user_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("Likes - get with userid - invalid subscription key request successfull"); 

});

test("nLikes - get with object id",{ tag: ['@sanity','@regression','@likes'] },async () => {
  logger.log("nLikes - get with userid check");
  
  const response = await api.get(`/api/nlikes/v1/${obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nLikes - get with userid request successfull"); 

});

test("nLikes - get with object id - No data found",{ tag: ['@regression','@likes'] },async () => {
  logger.log("nLikes - get with userid - No data found check");
  
  const response = await api.get(`/api/nlikes/v1/8a661b3b-1755-4535-89f0-c4c8520cc397`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'likes' data was found");
  
  logger.log("Likes - get with userid - No data found request successfull"); 

});

test("nLikes - get with invalid object id",{ tag: ['@regression','@likes'] },async () => {
  logger.log("nLikes - get with invalid userid check");
  
  const response = await api.get(`/api/nlikes/v1/${invalid_obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter id does not conform to the definition");
  
  logger.log("nLikes - get with invalid userid request successfull"); 

});

test("nLikes - get with object id - invalid subscription key",{ tag: ['@regression','@likes'] },async () => {
  logger.log("nLikes - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/nlikes/v1/${obj_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("nLikes - get with userid - invalid subscription key request successfull"); 

});

test("nLikes - post with object id",{ tag: ['@sanity','@regression','@likes'] },async () => {
  logger.log("nLikes - post with object id check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nlikes/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nLikes - post with object id request successfull"); 

});

test("nLikes - post with object id - invalid endpoints",{ tag: ['@regression','@likes'] },async () => {
  logger.log("nLikes - post with object id - invalid endpoints check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nlikes/v1/jhg`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"Value of the path parameter DATA_ITEM_NAME does not conform to the definition");
  
  logger.log("Likes - post with object id - invalid endpoints request successfull"); 

});

test("nLikes - post with invalid body",{ tag: ['@regression','@likes'] },async () => {
  logger.log("nLikes - post with invalid body check");

  const payload = await payloads.UDH_npayload([{idjkj : '63e70046-FC61-4e1d-b79a-c6b5Cf37e753'}]);
  
  const response = await api.post(`/api/nlikes/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
  logger.log("nLikes - post with invalid body request successfull"); 

});

test("nLikes - post with object id - invalid subscription key",{ tag: ['@regression','@likes'] },async () => {
  logger.log("nLikes - post with object id - invalid subscription key check");

   const payload = await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nlikes/v1`,payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("nLikes - post with object id - invalid subscription key request successfull"); 

});

test("nLikes - post with object id - Adding the new content",{ tag: ['@regression','@likes'] },async () => {
  logger.log("nLikes - post with object id - Adding the new content check");

  const payload = await payloads.UDH_npayload([{id: "63e70046-fc61-4e1d-b79a-c6b5cf37e852"}]);
  
  const response = await api.post(`/api/nlikes/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nLikes - post with object id - Adding the new content request successfull"); 

});

test("nLikes - post with object id - Removing the  content",{ tag: ['@regression','@likes'] },async () => {
  logger.log("nLikes - post with object id - Adding the new content check");

  
  const fullpayload = await payloads.UDH_npayload();

  expect(fullpayload.length).toBe(fullpayload.length); console.log("number of content id's before execution", fullpayload.length);

 const contentToremove = fullpayload[1].id;

  const payload = fullpayload.filter(item => item.id.toLowerCase() !== contentToremove.toLowerCase())

  expect(payload.length).toBe(fullpayload.length-1); console.log("number of content id's after execution", payload.length);
  
  const response = await api.post(`/api/nlikes/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nLikes - post with object id - Adding the new content request successfull"); 

});

// Follows

test("Follows - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@follows'],timeout : 60000},async () => {
  // Post method respoonse
  logger.log("Initiated follows - post with userid check");

  const payload = await payloads.UDH_payload('follows',[]);

  const response_userid_post = await api.post(`/api/follows/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_post,200);

 logger.log("follows - post with userid request successfull"); 

 //Get method response
 logger.log("Initiated follows - get with userid check"); 

  const response_userid_get = await api.get(`/api/follows/v1/${user_id}`,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  if (JSON.stringify(postResponse)===JSON.stringify(getResponse)) { 
  console.log("[Result] The responses of the POST and GET methods using the userId are identical.");
  } else {
  console.log("[Result] The responses of the POST and GET methods using the userId are different.");
  }
  
  logger.log("follows - get with userid request successfull"); 

});

test("nFollows - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@follows'],timeout : 60000},async () => {
  // get method respoonse
  logger.log("Initiated nfollows - get with userid check");

  const response_userid_get = await api.get(`/api/nfollows/v1/8a661b3b-1755-4535-89f0-c4c8520cc697`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 logger.log("follows - get with userid request successfull"); 

 //post method response
 logger.log("Initiated follows - post with userid check"); 

  const response_userid_post = await api.post(`/api/nfollows/v1`, [{ id: "8A661B3b-1755-4535-89F0-c4c8520Cc697" }],{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  expect(postResponse).toContainEqual(getResponse);

  console.log("[Result] id and nfollows match between GET and POST.");

  logger.log("follows - post with userid request successfull"); 

});



test("Follows - post with userid",{tag: ['@sanity', '@regression','@follows'],timeout : 60000},async () => {
  logger.log("Initiated follows - post with userid check");

  const payload = await payloads.UDH_payload('follows',[]);

  const response = await api.post(`/api/follows/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
 
  logger.log("follows - post with userid request successfull"); 

});

test("Follows - post with userid - invalid body",{ tag: ['@regression','@follows'] },async () => {
  logger.log("follows - post with userid - invalid body check");

  const payload = await payloads.UDH_payload('followsssd', []);
  
  const response = await api.post(`/api/follows/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
 
  logger.log("Follows - post with userid - invalid body request successfull"); 

});

test("Follows - post with userid - invalid subscription key",{ tag: ['@regression','@follows'] },async () => {
  logger.log("follows - post with userid - invalid subscription key check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/follows/v1/${user_id}`, payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("follows - post with userid - invalid subscription key request successfull"); 

});

test("Follows - post with userid - invalid userid",{ tag: ['@regression','@follows'] },async () => {
  logger.log("follows - post with userid - invalid userid check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/follows/v1/${user_id}890`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("follows - post with userid - invalid userid request successfull"); 

});

test("Follows - post with userid - Adding the new content",{ tag: ['@regression','@follows'] },async () => {
  logger.log("follows - post with userid - Adding the new content");

  const payload = await payloads.UDH_payload('follows',[{id:"1001", status:true}]);
  
  const response = await api.post(`/api/follows/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("follows - post with userid - Adding the new content request successfull"); 

});

test("Follows - post with userid - Removing the content",{ tag: ['@regression','@follows'] },async () => {
  logger.log("follows - post with userid - Removing the content check");

  const payload = await payloads.UDH_payload('follows',[{id:"1001", status:false}]);
  
  const response = await api.post(`/api/follows/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("follows - post with userid - Removing the content request successfull"); 

});

test("Follows - get with userid",{ tag: ['@sanity','@regression','@follows'] },async () => {
  logger.log("follows - get with userid check");
  
  const response = await api.get(`/api/follows/v1/${user_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("follows - get with userid request successfull"); 

});

test("Follows - get with userid - No data found",{ tag: ['@regression','@follows'] },async () => {
  logger.log("follows - get with userid - No data found check");
  
  const response = await api.get(`/api/follows/v1/806d89b9-8d19-466d-98b0-e027eddda0b0`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'follows' data was found");
  
  logger.log("follows - get with userid - No data found request successfull"); 

});

test("Follows - get with invalid userid",{ tag: ['@regression','@follows'] },async () => {
  logger.log("follows - get with invalid userid check");
  
  const response = await api.get(`/api/follows/v1/806d89b9-8d19-466d-98b0-e027eddda0b0bgjj`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("follows - get with invalid userid request successfull"); 

});

test("Follows - get with userid - invalid subscription key",{ tag: ['@regression','@follows'] },async () => {
  logger.log("follows - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/follows/v1/${user_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("follows - get with userid - invalid subscription key request successfull"); 

});

test("nFollows - get with object id",{ tag: ['@sanity','@regression','@follows'] },async () => {
  logger.log("nfollows - get with userid check");
  
  const response = await api.get(`/api/nfollows/v1/${obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nfollows - get with userid request successfull"); 

});

test("nFollows - get with object id - No data found",{ tag: ['@regression','@follows'] },async () => {
  logger.log("nfollows - get with userid - No data found check");
  
  const response = await api.get(`/api/nfollows/v1/8a661b3b-1755-4535-89f0-c4c8520cc397`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'follows' data was found");
  
  logger.log("follows - get with userid - No data found request successfull"); 

});

test("nFollows - get with invalid object id",{ tag: ['@regression','@follows'] },async () => {
  logger.log("nfollows - get with invalid userid check");
  
  const response = await api.get(`/api/nfollows/v1/${invalid_obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter id does not conform to the definition");
  
  logger.log("nfollows - get with invalid userid request successfull"); 

});

test("nFollows - get with object id - invalid subscription key",{ tag: ['@regression','@follows'] },async () => {
  logger.log("nfollows - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/nfollows/v1/${obj_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("nfollows - get with userid - invalid subscription key request successfull"); 

});

test("nFollows - post with object id",{ tag: ['@sanity','@regression','@follows'] },async () => {
  logger.log("nfollows - post with object id check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nfollows/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nfollows - post with object id request successfull"); 

});

test("nFollows - post with object id - invalid endpoints",{ tag: ['@regression','@follows'] },async () => {
  logger.log("nfollows - post with object id - invalid endpoints check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nfollows/v1/jhg`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"Value of the path parameter DATA_ITEM_NAME does not conform to the definition");
  
  logger.log("follows - post with object id - invalid endpoints request successfull"); 

});

test("nFollows - post with invalid body",{ tag: ['@regression','@follows'] },async () => {
  logger.log("nfollows - post with invalid body check");

  const payload = await payloads.UDH_npayload([{idjkj : '63e70046-FC61-4e1d-b79a-c6b5Cf37e753'}]);
  
  const response = await api.post(`/api/nfollows/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
  logger.log("nfollows - post with invalid body request successfull"); 

});

test("nFollows - post with object id - invalid subscription key",{ tag: ['@regression','@follows'] },async () => {
  logger.log("nfollows - post with object id - invalid subscription key check");

   const payload = await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nfollows/v1`,payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("nfollows - post with object id - invalid subscription key request successfull"); 

});

test("nFollows - post with object id - Adding the new content",{ tag: ['@regression','@follows'] },async () => {
  logger.log("nfollows - post with object id - Adding the new content check");

  const payload = await payloads.UDH_npayload([{id: "63e70046-fc61-4e1d-b79a-c6b5cf37e852"}]);
  
  const response = await api.post(`/api/nfollows/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nfollows - post with object id - Adding the new content request successfull"); 

});

test("nFollows - post with object id - Removing the  content",{ tag: ['@regression','@follows'] },async () => {
  logger.log("nfollows - post with object id - Adding the new content check");

  
  const fullpayload = await payloads.UDH_npayload();

  expect(fullpayload.length).toBe(fullpayload.length); console.log("number of content id's before execution", fullpayload.length);

 const contentToremove = fullpayload[1].id;

  const payload = fullpayload.filter(item => item.id.toLowerCase() !== contentToremove.toLowerCase())

  expect(payload.length).toBe(fullpayload.length-1); console.log("number of content id's after execution", payload.length);
  
  const response = await api.post(`/api/nfollows/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nfollows - post with object id - Adding the new content request successfull"); 

});

// Bookmarks

test("Bookmarks - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@bookmarks'],timeout : 60000},async () => {
  // Post method respoonse
  logger.log("Initiated bookmarks - post with userid check");

  const payload = await payloads.UDH_payload('bookmarks',[]);

  const response_userid_post = await api.post(`/api/bookmarks/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_post,200);

 logger.log("bookmarks - post with userid request successfull"); 

 //Get method response
 logger.log("Initiated bookmarks - get with userid check"); 

  const response_userid_get = await api.get(`/api/bookmarks/v1/${user_id}`,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  if (JSON.stringify(postResponse)===JSON.stringify(getResponse)) { 
  console.log("[Result] The responses of the POST and GET methods using the userId are identical.");
  } else {
  console.log("[Result] The responses of the POST and GET methods using the userId are different.");
  }
  
  logger.log("bookmarks - get with userid request successfull"); 

});

test("nBookmarks - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@bookmarks'],timeout : 60000},async () => {
  // get method respoonse
  logger.log("Initiated nbookmarks - get with userid check");

  const response_userid_get = await api.get(`/api/nbookmarks/v1/8a661b3b-1755-4535-89f0-c4c8520cc697`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 logger.log("bookmarks - get with userid request successfull"); 

 //post method response
 logger.log("Initiated bookmarks - post with userid check"); 

  const response_userid_post = await api.post(`/api/nbookmarks/v1`, [{ id: "8A661B3b-1755-4535-89F0-c4c8520Cc697" }],{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  expect(postResponse).toContainEqual(getResponse);

  console.log("[Result] id and nbookmarks match between GET and POST.");

  logger.log("bookmarks - post with userid request successfull"); 

});



test("Bookmarks - post with userid",{tag: ['@sanity', '@regression','@bookmarks'],timeout : 60000},async () => {
  logger.log("Initiated bookmarks - post with userid check");

  const payload = await payloads.UDH_payload('bookmarks',[]);

  const response = await api.post(`/api/bookmarks/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
 
  logger.log("bookmarks - post with userid request successfull"); 

});

test("Bookmarks - post with userid - invalid body",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("bookmarks - post with userid - invalid body check");

  const payload = await payloads.UDH_payload('bookmarksssd', []);
  
  const response = await api.post(`/api/bookmarks/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
 
  logger.log("Bookmarks - post with userid - invalid body request successfull"); 

});

test("Bookmarks - post with userid - invalid subscription key",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("bookmarks - post with userid - invalid subscription key check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/bookmarks/v1/${user_id}`, payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("bookmarks - post with userid - invalid subscription key request successfull"); 

});

test("Bookmarks - post with userid - invalid userid",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("bookmarks - post with userid - invalid userid check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/bookmarks/v1/${user_id}890`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("bookmarks - post with userid - invalid userid request successfull"); 

});

test("Bookmarks - post with userid - Adding the new content",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("bookmarks - post with userid - Adding the new content");

  const payload = await payloads.UDH_payload('bookmarks',[{id:"1001", status:true}]);
  
  const response = await api.post(`/api/bookmarks/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("bookmarks - post with userid - Adding the new content request successfull"); 

});

test("Bookmarks - post with userid - Removing the content",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("bookmarks - post with userid - Removing the content check");

  const payload = await payloads.UDH_payload('bookmarks',[{id:"1001", status:false}]);
  
  const response = await api.post(`/api/bookmarks/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("bookmarks - post with userid - Removing the content request successfull"); 

});

test("Bookmarks - get with userid",{ tag: ['@sanity','@regression','@bookmarks'] },async () => {
  logger.log("bookmarks - get with userid check");
  
  const response = await api.get(`/api/bookmarks/v1/${user_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("bookmarks - get with userid request successfull"); 

});

test("Bookmarks - get with userid - No data found",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("bookmarks - get with userid - No data found check");
  
  const response = await api.get(`/api/bookmarks/v1/806d89b9-8d19-466d-98b0-e027eddda0b0`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'bookmarks' data was found");
  
  logger.log("bookmarks - get with userid - No data found request successfull"); 

});

test("Bookmarks - get with invalid userid",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("bookmarks - get with invalid userid check");
  
  const response = await api.get(`/api/bookmarks/v1/806d89b9-8d19-466d-98b0-e027eddda0b0bgjj`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("bookmarks - get with invalid userid request successfull"); 

});

test("Bookmarks - get with userid - invalid subscription key",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("bookmarks - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/bookmarks/v1/${user_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("bookmarks - get with userid - invalid subscription key request successfull"); 

});

test("nBookmarks - get with object id",{ tag: ['@sanity','@regression','@bookmarks'] },async () => {
  logger.log("nbookmarks - get with userid check");
  
  const response = await api.get(`/api/nbookmarks/v1/${obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nbookmarks - get with userid request successfull"); 

});

test("nBookmarks - get with object id - No data found",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("nbookmarks - get with userid - No data found check");
  
  const response = await api.get(`/api/nbookmarks/v1/8a661b3b-1755-4535-89f0-c4c8520cc397`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'bookmarks' data was found");
  
  logger.log("bookmarks - get with userid - No data found request successfull"); 

});

test("nBookmarks - get with invalid object id",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("nbookmarks - get with invalid userid check");
  
  const response = await api.get(`/api/nbookmarks/v1/${invalid_obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter id does not conform to the definition");
  
  logger.log("nbookmarks - get with invalid userid request successfull"); 

});

test("nBookmarks - get with object id - invalid subscription key",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("nbookmarks - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/nbookmarks/v1/${obj_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("nbookmarks - get with userid - invalid subscription key request successfull"); 

});

test("nBookmarks - post with object id",{ tag: ['@sanity','@regression','@bookmarks'] },async () => {
  logger.log("nbookmarks - post with object id check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nbookmarks/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nbookmarks - post with object id request successfull"); 

});

test("nBookmarks - post with object id - invalid endpoints",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("nbookmarks - post with object id - invalid endpoints check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nbookmarks/v1/jhg`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"Value of the path parameter DATA_ITEM_NAME does not conform to the definition");
  
  logger.log("bookmarks - post with object id - invalid endpoints request successfull"); 

});

test("nBookmarks - post with invalid body",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("nbookmarks - post with invalid body check");

  const payload = await payloads.UDH_npayload([{idjkj : '63e70046-FC61-4e1d-b79a-c6b5Cf37e753'}]);
  
  const response = await api.post(`/api/nbookmarks/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
  logger.log("nbookmarks - post with invalid body request successfull"); 

});

test("nBookmarks - post with object id - invalid subscription key",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("nbookmarks - post with object id - invalid subscription key check");

   const payload = await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nbookmarks/v1`,payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("nbookmarks - post with object id - invalid subscription key request successfull"); 

});

test("nBookmarks - post with object id - Adding the new content",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("nbookmarks - post with object id - Adding the new content check");

  const payload = await payloads.UDH_npayload([{id: "63e70046-fc61-4e1d-b79a-c6b5cf37e852"}]);
  
  const response = await api.post(`/api/nbookmarks/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nbookmarks - post with object id - Adding the new content request successfull"); 

});

test("nBookmarks - post with object id - Removing the  content",{ tag: ['@regression','@bookmarks'] },async () => {
  logger.log("nbookmarks - post with object id - Adding the new content check");

  
  const fullpayload = await payloads.UDH_npayload();

  expect(fullpayload.length).toBe(fullpayload.length); console.log("number of content id's before execution", fullpayload.length);

 const contentToremove = fullpayload[1].id;

  const payload = fullpayload.filter(item => item.id.toLowerCase() !== contentToremove.toLowerCase())

  expect(payload.length).toBe(fullpayload.length-1); console.log("number of content id's after execution", payload.length);
  
  const response = await api.post(`/api/nbookmarks/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nbookmarks - post with object id - Adding the new content request successfull"); 

});

// Downloads

test("Downloads - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@downloads'],timeout : 60000},async () => {
  // Post method respoonse
  logger.log("Initiated downloads - post with userid check");

  const payload = await payloads.UDH_payload('downloads',[]);

  const response_userid_post = await api.post(`/api/downloads/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_post,200);

 logger.log("downloads - post with userid request successfull"); 

 //Get method response
 logger.log("Initiated downloads - get with userid check"); 

  const response_userid_get = await api.get(`/api/downloads/v1/${user_id}`,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  if (JSON.stringify(postResponse)===JSON.stringify(getResponse)) { 
  console.log("[Result] The responses of the POST and GET methods using the userId are identical.");
  } else {
  console.log("[Result] The responses of the POST and GET methods using the userId are different.");
  }
  
  logger.log("downloads - get with userid request successfull"); 

});

test("nDownloads - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@downloads'],timeout : 60000},async () => {
  // get method respoonse
  logger.log("Initiated ndownloads - get with userid check");

  const response_userid_get = await api.get(`/api/ndownloads/v1/8a661b3b-1755-4535-89f0-c4c8520cc697`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 logger.log("downloads - get with userid request successfull"); 

 //post method response
 logger.log("Initiated downloads - post with userid check"); 

  const response_userid_post = await api.post(`/api/ndownloads/v1`, [{ id: "8A661B3b-1755-4535-89F0-c4c8520Cc697" }],{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  expect(postResponse).toContainEqual(getResponse);

  console.log("[Result] id and ndownloads match between GET and POST.");

  logger.log("downloads - post with userid request successfull"); 

});

test("Downloads - post with userid",{tag: ['@sanity', '@regression','@downloads'],timeout : 60000},async () => {
  logger.log("Initiated downloads - post with userid check");

  const payload = await payloads.UDH_payload('downloads',[]);

  const response = await api.post(`/api/downloads/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
 
  logger.log("downloads - post with userid request successfull"); 

});

test("Downloads - post with userid - invalid body",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("downloads - post with userid - invalid body check");

  const payload = await payloads.UDH_payload('downloadsssd', []);
  
  const response = await api.post(`/api/downloads/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
 
  logger.log("Downloads - post with userid - invalid body request successfull"); 

});

test("Downloads - post with userid - invalid subscription key",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("downloads - post with userid - invalid subscription key check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/downloads/v1/${user_id}`, payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("downloads - post with userid - invalid subscription key request successfull"); 

});

test("Downloads - post with userid - invalid userid",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("downloads - post with userid - invalid userid check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/downloads/v1/${user_id}890`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("downloads - post with userid - invalid userid request successfull"); 

});

test("Downloads - post with userid - Adding the new content",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("downloads - post with userid - Adding the new content");

  const payload = await payloads.UDH_payload('downloads',[{id:"1001", status:true}]);
  
  const response = await api.post(`/api/downloads/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("downloads - post with userid - Adding the new content request successfull"); 

});

test("Downloads - post with userid - Removing the content",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("downloads - post with userid - Removing the content check");

  const payload = await payloads.UDH_payload('downloads',[{id:"1001", status:false}]);
  
  const response = await api.post(`/api/downloads/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("downloads - post with userid - Removing the content request successfull"); 

});

test("Downloads - get with userid",{ tag: ['@sanity','@regression','@downloads'] },async () => {
  logger.log("downloads - get with userid check");
  
  const response = await api.get(`/api/downloads/v1/${user_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("downloads - get with userid request successfull"); 

});

test("Downloads - get with userid - No data found",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("downloads - get with userid - No data found check");
  
  const response = await api.get(`/api/downloads/v1/806d89b9-8d19-466d-98b0-e027eddda0b0`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'downloads' data was found");
  
  logger.log("downloads - get with userid - No data found request successfull"); 

});

test("Downloads - get with invalid userid",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("downloads - get with invalid userid check");
  
  const response = await api.get(`/api/downloads/v1/806d89b9-8d19-466d-98b0-e027eddda0b0bgjj`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("downloads - get with invalid userid request successfull"); 

});

test("Downloads - get with userid - invalid subscription key",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("downloads - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/downloads/v1/${user_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("downloads - get with userid - invalid subscription key request successfull"); 

});

test("nDownloads - get with object id",{ tag: ['@sanity','@regression','@downloads'] },async () => {
  logger.log("ndownloads - get with userid check");
  
  const response = await api.get(`/api/ndownloads/v1/${obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("ndownloads - get with userid request successfull"); 

});

test("nDownloads - get with object id - No data found",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("ndownloads - get with userid - No data found check");
  
  const response = await api.get(`/api/ndownloads/v1/8a661b3b-1755-4535-89f0-c4c8520cc397`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'downloads' data was found");
  
  logger.log("downloads - get with userid - No data found request successfull"); 

});

test("nDownloads - get with invalid object id",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("ndownloads - get with invalid userid check");
  
  const response = await api.get(`/api/ndownloads/v1/${invalid_obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter id does not conform to the definition");
  
  logger.log("ndownloads - get with invalid userid request successfull"); 

});

test("nDownloads - get with object id - invalid subscription key",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("ndownloads - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/ndownloads/v1/${obj_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("ndownloads - get with userid - invalid subscription key request successfull"); 

});

test("nDownloads - post with object id",{ tag: ['@sanity','@regression','@downloads'] },async () => {
  logger.log("ndownloads - post with object id check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/ndownloads/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("ndownloads - post with object id request successfull"); 

});

test("nDownloads - post with object id - invalid endpoints",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("ndownloads - post with object id - invalid endpoints check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/ndownloads/v1/jhg`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"Value of the path parameter DATA_ITEM_NAME does not conform to the definition");
  
  logger.log("downloads - post with object id - invalid endpoints request successfull"); 

});

test("nDownloads - post with invalid body",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("ndownloads - post with invalid body check");

  const payload = await payloads.UDH_npayload([{idjkj : '63e70046-FC61-4e1d-b79a-c6b5Cf37e753'}]);
  
  const response = await api.post(`/api/ndownloads/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
  logger.log("ndownloads - post with invalid body request successfull"); 

});

test("nDownloads - post with object id - invalid subscription key",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("ndownloads - post with object id - invalid subscription key check");

   const payload = await payloads.UDH_npayload();
  
  const response = await api.post(`/api/ndownloads/v1`,payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("ndownloads - post with object id - invalid subscription key request successfull"); 

});

test("nDownloads - post with object id - Adding the new content",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("ndownloads - post with object id - Adding the new content check");

  const payload = await payloads.UDH_npayload([{id: "63e70046-fc61-4e1d-b79a-c6b5cf37e852"}]);
  
  const response = await api.post(`/api/ndownloads/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("ndownloads - post with object id - Adding the new content request successfull"); 

});

test("nDownloads - post with object id - Removing the  content",{ tag: ['@regression','@downloads'] },async () => {
  logger.log("ndownloads - post with object id - Adding the new content check");

  
  const fullpayload = await payloads.UDH_npayload();

  expect(fullpayload.length).toBe(fullpayload.length); console.log("number of content id's before execution", fullpayload.length);

 const contentToremove = fullpayload[1].id;

  const payload = fullpayload.filter(item => item.id.toLowerCase() !== contentToremove.toLowerCase())

  expect(payload.length).toBe(fullpayload.length-1); console.log("number of content id's after execution", payload.length);
  
  const response = await api.post(`/api/ndownloads/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("ndownloads - post with object id - Adding the new content request successfull"); 

});

// History

test("History - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@history'],timeout : 60000},async () => {
  // Post method respoonse
  logger.log("Initiated history - post with userid check");

  const payload = await payloads.UDH_payload('history',[]);

  const response_userid_post = await api.post(`/api/history/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_post,200);

 logger.log("history - post with userid request successfull"); 

 //Get method response
 logger.log("Initiated history - get with userid check"); 

  const response_userid_get = await api.get(`/api/history/v1/${user_id}`,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  if (JSON.stringify(postResponse)===JSON.stringify(getResponse)) { 
  console.log("[Result] The responses of the POST and GET methods using the userId are identical.");
  } else {
  console.log("[Result] The responses of the POST and GET methods using the userId are different.");
  }
  
  logger.log("history - get with userid request successfull"); 

});

test("nHistory - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@history'],timeout : 60000},async () => {
  // get method respoonse
  logger.log("Initiated nhistory - get with userid check");

  const response_userid_get = await api.get(`/api/nhistory/v1/8a661b3b-1755-4535-89f0-c4c8520cc697`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 logger.log("history - get with userid request successfull"); 

 //post method response
 logger.log("Initiated history - post with userid check"); 

  const response_userid_post = await api.post(`/api/nhistory/v1`, [{ id: "8A661B3b-1755-4535-89F0-c4c8520Cc697" }],{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  expect(postResponse).toContainEqual(getResponse);

  console.log("[Result] id and nhistory match between GET and POST.");

  logger.log("history - post with userid request successfull"); 

});

// History

test("History - post with userid",{tag: ['@sanity', '@regression','@history'],timeout : 60000},async () => {
  logger.log("Initiated history - post with userid check");

  const payload = await payloads.UDH_payload('history',[]);

  const response = await api.post(`/api/history/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
 
  logger.log("history - post with userid request successfull"); 

});

test("History - post with userid - invalid body",{ tag: ['@regression','@history'] },async () => {
  logger.log("history - post with userid - invalid body check");

  const payload = await payloads.UDH_payload('historyssd', []);
  
  const response = await api.post(`/api/history/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
 
  logger.log("History - post with userid - invalid body request successfull"); 

});

test("History - post with userid - invalid subscription key",{ tag: ['@regression','@history'] },async () => {
  logger.log("history - post with userid - invalid subscription key check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/history/v1/${user_id}`, payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("history - post with userid - invalid subscription key request successfull"); 

});

test("History - post with userid - invalid userid",{ tag: ['@regression','@history'] },async () => {
  logger.log("history - post with userid - invalid userid check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/history/v1/${user_id}890`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("history - post with userid - invalid userid request successfull"); 

});

test("History - post with userid - Adding the new content",{ tag: ['@regression','@history'] },async () => {
  logger.log("history - post with userid - Adding the new content");

  const payload = await payloads.UDH_payload('history',[{id:"1001", status:true}]);
  
  const response = await api.post(`/api/history/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("history - post with userid - Adding the new content request successfull"); 

});

test("History - post with userid - Removing the content",{ tag: ['@regression','@history'] },async () => {
  logger.log("history - post with userid - Removing the content check");

  const payload = await payloads.UDH_payload('history',[{id:"1001", status:false}]);
  
  const response = await api.post(`/api/history/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("history - post with userid - Removing the content request successfull"); 

});

test("History - get with userid",{ tag: ['@sanity','@regression','@history'] },async () => {
  logger.log("history - get with userid check");
  
  const response = await api.get(`/api/history/v1/${user_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("history - get with userid request successfull"); 

});

test("History - get with userid - No data found",{ tag: ['@regression','@history'] },async () => {
  logger.log("history - get with userid - No data found check");
  
  const response = await api.get(`/api/history/v1/806d89b9-8d19-466d-98b0-e027eddda0b0`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'history' data was found");
  
  logger.log("history - get with userid - No data found request successfull"); 

});

test("History - get with invalid userid",{ tag: ['@regression','@history'] },async () => {
  logger.log("history - get with invalid userid check");
  
  const response = await api.get(`/api/history/v1/806d89b9-8d19-466d-98b0-e027eddda0b0bgjj`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("history - get with invalid userid request successfull"); 

});

test("History - get with userid - invalid subscription key",{ tag: ['@regression','@history'] },async () => {
  logger.log("history - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/history/v1/${user_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("history - get with userid - invalid subscription key request successfull"); 

});

test("nHistory - get with object id",{ tag: ['@sanity','@regression','@history'] },async () => {
  logger.log("nhistory - get with userid check");
  
  const response = await api.get(`/api/nhistory/v1/${obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nhistory - get with userid request successfull"); 

});

test("nHistory - get with object id - No data found",{ tag: ['@regression','@history'] },async () => {
  logger.log("nhistory - get with userid - No data found check");
  
  const response = await api.get(`/api/nhistory/v1/8a661b3b-1755-4535-89f0-c4c8520cc397`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'history' data was found");
  
  logger.log("history - get with userid - No data found request successfull"); 

});

test("nHistory - get with invalid object id",{ tag: ['@regression','@history'] },async () => {
  logger.log("nhistory - get with invalid userid check");
  
  const response = await api.get(`/api/nhistory/v1/${invalid_obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter id does not conform to the definition");
  
  logger.log("nhistory - get with invalid userid request successfull"); 

});

test("nHistory - get with object id - invalid subscription key",{ tag: ['@regression','@history'] },async () => {
  logger.log("nhistory - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/nhistory/v1/${obj_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("nhistory - get with userid - invalid subscription key request successfull"); 

});

test("nHistory - post with object id",{ tag: ['@sanity','@regression','@history'] },async () => {
  logger.log("nhistory - post with object id check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nhistory/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nhistory - post with object id request successfull"); 

});

test("nHistory - post with object id - invalid endpoints",{ tag: ['@regression','@history'] },async () => {
  logger.log("nhistory - post with object id - invalid endpoints check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nhistory/v1/jhg`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"Value of the path parameter DATA_ITEM_NAME does not conform to the definition");
  
  logger.log("history - post with object id - invalid endpoints request successfull"); 

});

test("nHistory - post with invalid body",{ tag: ['@regression','@history'] },async () => {
  logger.log("nhistory - post with invalid body check");

  const payload = await payloads.UDH_npayload([{idjkj : '63e70046-FC61-4e1d-b79a-c6b5Cf37e753'}]);
  
  const response = await api.post(`/api/nhistory/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
  logger.log("nhistory - post with invalid body request successfull"); 

});

test("nHistory - post with object id - invalid subscription key",{ tag: ['@regression','@history'] },async () => {
  logger.log("nhistory - post with object id - invalid subscription key check");

   const payload = await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nhistory/v1`,payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("nhistory - post with object id - invalid subscription key request successfull"); 

});

test("nHistory - post with object id - Adding the new content",{ tag: ['@regression','@history'] },async () => {
  logger.log("nhistory - post with object id - Adding the new content check");

  const payload = await payloads.UDH_npayload([{id: "63e70046-fc61-4e1d-b79a-c6b5cf37e852"}]);
  
  const response = await api.post(`/api/nhistory/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nhistory - post with object id - Adding the new content request successfull"); 

});

test("nHistory - post with object id - Removing the  content",{ tag: ['@regression','@history'] },async () => {
  logger.log("nhistory - post with object id - Adding the new content check");

  
  const fullpayload = await payloads.UDH_npayload();

  expect(fullpayload.length).toBe(fullpayload.length); console.log("number of content id's before execution", fullpayload.length);

 const contentToremove = fullpayload[1].id;

  const payload = fullpayload.filter(item => item.id.toLowerCase() !== contentToremove.toLowerCase())

  expect(payload.length).toBe(fullpayload.length-1); console.log("number of content id's after execution", payload.length);
  
  const response = await api.post(`/api/nhistory/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nhistory - post with object id - Adding the new content request successfull"); 

});

// Queues

test("Queues - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@queues'],timeout : 60000},async () => {
  // Post method respoonse
  logger.log("Initiated queues - post with userid check");

  const payload = await payloads.UDH_payload('queues',[]);

  const response_userid_post = await api.post(`/api/queues/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_post,200);

 logger.log("queues - post with userid request successfull"); 

 //Get method response
 logger.log("Initiated queues - get with userid check"); 

  const response_userid_get = await api.get(`/api/queues/v1/${user_id}`,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  if (JSON.stringify(postResponse)===JSON.stringify(getResponse)) { 
  console.log("[Result] The responses of the POST and GET methods using the userId are identical.");
  } else {
  console.log("[Result] The responses of the POST and GET methods using the userId are different.");
  }
  
  logger.log("queues - get with userid request successfull"); 

});

test("nQueues - Comparison of post and get method response using same userid",{tag: ['@sanity', '@regression','@queues'],timeout : 60000},async () => {
  // get method respoonse
  logger.log("Initiated nqueues - get with userid check");

  const response_userid_get = await api.get(`/api/nqueues/v1/8a661b3b-1755-4535-89f0-c4c8520cc697`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 logger.log("queues - get with userid request successfull"); 

 //post method response
 logger.log("Initiated queues - post with userid check"); 

  const response_userid_post = await api.post(`/api/nqueues/v1`, [{ id: "8A661B3b-1755-4535-89F0-c4c8520Cc697" }],{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response_userid_get,200);

 // Comparing both the response
  console.log("Comparing the responses of the POST and GET methods using the same userId.");

  const postResponse = await response_userid_post.json();
  const getResponse = await response_userid_get.json();

  expect(postResponse).toContainEqual(getResponse);

  console.log("[Result] id and nqueues match between GET and POST.");

  logger.log("queues - post with userid request successfull"); 

});

// Queues

test("Queues - post with userid",{tag: ['@sanity', '@regression','@queues'],timeout : 60000},async () => {
  logger.log("Initiated queues - post with userid check");

  const payload = await payloads.UDH_payload('queues',[]);

  const response = await api.post(`/api/queues/v1/${user_id}`, payload,{headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
 
  logger.log("queues - post with userid request successfull"); 

});

test("Queues - post with userid - invalid body",{ tag: ['@regression','@queues'] },async () => {
  logger.log("queues - post with userid - invalid body check");

  const payload = await payloads.UDH_payload('queuesssd', []);
  
  const response = await api.post(`/api/queues/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
 
  logger.log("Queues - post with userid - invalid body request successfull"); 

});

test("Queues - post with userid - invalid subscription key",{ tag: ['@regression','@queues'] },async () => {
  logger.log("queues - post with userid - invalid subscription key check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/queues/v1/${user_id}`, payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("queues - post with userid - invalid subscription key request successfull"); 

});

test("Queues - post with userid - invalid userid",{ tag: ['@regression','@queues'] },async () => {
  logger.log("queues - post with userid - invalid userid check");

  const payload = await payloads.UDH_payload();
  
  const response = await api.post(`/api/queues/v1/${user_id}890`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("queues - post with userid - invalid userid request successfull"); 

});

test("Queues - post with userid - Adding the new content",{ tag: ['@regression','@queues'] },async () => {
  logger.log("queues - post with userid - Adding the new content");

  const payload = await payloads.UDH_payload('queues',[{id:"1001", status:true}]);
  
  const response = await api.post(`/api/queues/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("queues - post with userid - Adding the new content request successfull"); 

});

test("Queues - post with userid - Removing the content",{ tag: ['@regression','@queues'] },async () => {
  logger.log("queues - post with userid - Removing the content check");

  const payload = await payloads.UDH_payload('queues',[{id:"1001", status:false}]);
  
  const response = await api.post(`/api/queues/v1/${user_id}`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("queues - post with userid - Removing the content request successfull"); 

});

test("Queues - get with userid",{ tag: ['@sanity','@regression','@queues'] },async () => {
  logger.log("queues - get with userid check");
  
  const response = await api.get(`/api/queues/v1/${user_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("queues - get with userid request successfull"); 

});

test("Queues - get with userid - No data found",{ tag: ['@regression','@queues'] },async () => {
  logger.log("queues - get with userid - No data found check");
  
  const response = await api.get(`/api/queues/v1/806d89b9-8d19-466d-98b0-e027eddda0b0`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'queues' data was found");
  
  logger.log("queues - get with userid - No data found request successfull"); 

});

test("Queues - get with invalid userid",{ tag: ['@regression','@queues'] },async () => {
  logger.log("queues - get with invalid userid check");
  
  const response = await api.get(`/api/queues/v1/806d89b9-8d19-466d-98b0-e027eddda0b0bgjj`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter USER_ID does not conform to the definition");
  
  logger.log("queues - get with invalid userid request successfull"); 

});

test("Queues - get with userid - invalid subscription key",{ tag: ['@regression','@queues'] },async () => {
  logger.log("queues - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/queues/v1/${user_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("queues - get with userid - invalid subscription key request successfull"); 

});

test("nQueues - get with object id",{ tag: ['@sanity','@regression','@queues'] },async () => {
  logger.log("nqueues - get with userid check");
  
  const response = await api.get(`/api/nqueues/v1/${obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nqueues - get with userid request successfull"); 

});

test("nQueues - get with object id - No data found",{ tag: ['@regression','@queues'] },async () => {
  logger.log("nqueues - get with userid - No data found check");
  
  const response = await api.get(`/api/nqueues/v1/8a661b3b-1755-4535-89f0-c4c8520cc397`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"No 'queues' data was found");
  
  logger.log("queues - get with userid - No data found request successfull"); 

});

test("nQueues - get with invalid object id",{ tag: ['@regression','@queues'] },async () => {
  logger.log("nqueues - get with invalid userid check");
  
  const response = await api.get(`/api/nqueues/v1/${invalid_obj_id}`,  {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Value of the path parameter id does not conform to the definition");
  
  logger.log("nqueues - get with invalid userid request successfull"); 

});

test("nQueues - get with object id - invalid subscription key",{ tag: ['@regression','@queues'] },async () => {
  logger.log("nqueues - get with userid - invalid subscription key check");
  
  const response = await api.get(`/api/nqueues/v1/${obj_id}`, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("nqueues - get with userid - invalid subscription key request successfull"); 

});

test("nQueues - post with object id",{ tag: ['@sanity','@regression','@queues'] },async () => {
  logger.log("nqueues - post with object id check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nqueues/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nqueues - post with object id request successfull"); 

});

test("nQueues - post with object id - invalid endpoints",{ tag: ['@regression','@queues'] },async () => {
  logger.log("nqueues - post with object id - invalid endpoints check");

  const payload =  await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nqueues/v1/jhg`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,404,"Value of the path parameter DATA_ITEM_NAME does not conform to the definition");
  
  logger.log("queues - post with object id - invalid endpoints request successfull"); 

});

test("nQueues - post with invalid body",{ tag: ['@regression','@queues'] },async () => {
  logger.log("nqueues - post with invalid body check");

  const payload = await payloads.UDH_npayload([{idjkj : '63e70046-FC61-4e1d-b79a-c6b5Cf37e753'}]);
  
  const response = await api.post(`/api/nqueues/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,400,"Body of the request does not conform to the definition");
  
  logger.log("nqueues - post with invalid body request successfull"); 

});

test("nQueues - post with object id - invalid subscription key",{ tag: ['@regression','@queues'] },async () => {
  logger.log("nqueues - post with object id - invalid subscription key check");

   const payload = await payloads.UDH_npayload();
  
  const response = await api.post(`/api/nqueues/v1`,payload, { headers:{subscription_key : `${subscription_key}jkhk`}});

  await validate.validation(response,401,"Access denied due to missing subscription key");
  
  logger.log("nqueues - post with object id - invalid subscription key request successfull"); 

});

test("nQueues - post with object id - Adding the new content",{ tag: ['@regression','@queues'] },async () => {
  logger.log("nqueues - post with object id - Adding the new content check");

  const payload = await payloads.UDH_npayload([{id: "63e70046-fc61-4e1d-b79a-c6b5cf37e852"}]);
  
  const response = await api.post(`/api/nqueues/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nqueues - post with object id - Adding the new content request successfull"); 

});

test("nQueues - post with object id - Removing the  content",{ tag: ['@regression','@queues'] },async () => {
  logger.log("nqueues - post with object id - Adding the new content check");

  
  const fullpayload = await payloads.UDH_npayload();

  expect(fullpayload.length).toBe(fullpayload.length); console.log("number of content id's before execution", fullpayload.length);

 const contentToremove = fullpayload[1].id;

  const payload = fullpayload.filter(item => item.id.toLowerCase() !== contentToremove.toLowerCase())

  expect(payload.length).toBe(fullpayload.length-1); console.log("number of content id's after execution", payload.length);
  
  const response = await api.post(`/api/nqueues/v1`, payload, {headers:{'subscription-key' : subscription_key}});

  await validate.validation(response,200);
  
  logger.log("nqueues - post with object id - Adding the new content request successfull"); 

});










//profile

test("Profile by email - Response comparison between post and get method ",{ tag: ['@sanity','@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - post method - with valid email check");

  const payload = await payloads.profilebyemail();
  
  const post_response = await api.post(`/api/users/v1/profilebyemail`, payload, {headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(post_response,200);
  
  logger.log("profile by email - post method - with valid email request successfull"); 

  logger.log("profile by email - get method - with valid email check");

  const params = await payloads.profilebyemail();
  
  const get_response = await api.get(`/api/users/v1/profilebyemail`, {params, headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(get_response,200);

  // Comparison of both the response

  const profilebyemail_post = await post_response.json();
  const profilebyemail_get = await get_response.json();

  expect(profilebyemail_post).toEqual(profilebyemail_get);

  console.log("[Result] Profile by email response match between GET and POST.");

  logger.log("profile by email - get method - with valid email request successfull"); 

});


test("Profile by email - post method - with valid email",{ tag: ['@sanity','@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - post method - with valid email check");

  const payload = await payloads.profilebyemail();
  
  const response = await api.post(`/api/users/v1/profilebyemail`, payload, {headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,200);
  
  logger.log("profile by email - post method - with valid email request successfull"); 

});

test("Profile by email - post method - with invalid endpoint",{ tag: ['@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - post method - with invalid endpoint check");

  const payload = await payloads.profilebyemail();
  
  const response = await api.post(`/api/users/v1/profilebyemail/invalid`, payload, {headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,404,'Unable to match incoming request to an operation');
  
  logger.log("profile by email - post method - with invalid endpoint request successfull"); 

});

test("Profile by email - post method - with invalid payload",{ tag: ['@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - post method - with invalid payload check");

  const payload = await payloads.profilebyemail({email : ""});
  
  const response = await api.post(`/api/users/v1/profilebyemail`, payload, {headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,400, 'Body of the request does not conform to the definition which is associated with the content type application/json');
  
  logger.log("profile by email - post method - with invalid payload request successfull"); 

});

test("Profile by email - post method - with invalid subscription key",{ tag: ['@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - post method - with invalid subscription key check");

  const payload = await payloads.profilebyemail();
  
  const response = await api.post(`/api/users/v1/profilebyemail`, payload, {headers:{'subscription-key' : profile_subscription_key+'cdfsds'}});

  await validate.validation(response,401, 'Access denied due to invalid subscription key');
  
  logger.log("profile by email - post method - with invalid subscription key request successfull"); 

});

test("Profile by email - post method - with invalid email",{ tag: ['@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - post method - with invalid email check");

  const payload = await payloads.profilebyemail({email : "dayseigh@gmailcom"});
  
  const response = await api.post(`/api/users/v1/profilebyemail`, payload, {headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,400);
  
  logger.log("profile by email - post method - with invalid email request successfull"); 

});

test("Profile by email - get method - with valid email",{ tag: ['@sanity','@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - get method - with valid email check");

  const params = await payloads.profilebyemail();
  
  const response = await api.get(`/api/users/v1/profilebyemail`, {params, headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,200);

  logger.log("profile by email - get method - with valid email request successfull"); 

});


test("Profile by email - get method - with invalid endpoint",{ tag: ['@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - get method - with invalid endpoint check");

  const params = await payloads.profilebyemail();
  
  const response = await api.get(`/api/users/v1/profilebyemail/invalid`, {params, headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,404,'Unable to match incoming request to an operation');
  
  logger.log("profile by email - get method - with invalid endpoint request successfull"); 

});

test("Profile by email - get method - with invalid params",{ tag: ['@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - get method - with invalid params check");

  const params = await payloads.profilebyemail({email : ""});
  
  const response = await api.get(`/api/users/v1/profilebyemail`, {params, headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,400);
  
  logger.log("profile by email - get method - with invalid params request successfull"); 

});

test("Profile by email - get method - with invalid subscription key",{ tag: ['@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - get method - with invalid subscription key check");

  const params = await payloads.profilebyemail();
  
  const response = await api.get(`/api/users/v1/profilebyemail`, {params, headers:{'subscription-key' : profile_subscription_key+'cdfsds'}});

  await validate.validation(response,401, 'Access denied due to invalid subscription key');
  
  logger.log("profile by email - post method - with invalid subscription key request successfull"); 

});

test("Profile by email - get method - with invalid email",{ tag: ['@regression','@profilebyemail'] },async () => {
  logger.log("profile by email - get method - with invalid email check");

  const params = await payloads.profilebyemail({email : "dayseigh@gmailcom"});
  
  const response = await api.get(`/api/users/v1/profilebyemail`, {params, headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,400);
  
  logger.log("profile by email - get method - with invalid email request successfull"); 

});


test("Profile by SSO ID - Response comparison between post and get method ",{ tag: ['@sanity','@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - post method - with valid SSO_id check");

  const payload = await payloads.profilebyssoid();
  
  const post_response = await api.post(`/api/users/v1/profile`, payload, {headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(post_response,200);
  
  logger.log("profile by SSO ID - post method - with valid SSO_id request successfull"); 

  logger.log("profile by SSO ID - get method - with valid SSO_id check");

  const params = await payloads.profilebyssoid();
  
  const get_response = await api.get(`/api/users/v1/profile`, {params, headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(get_response,200);

  // Comparison of both the response

  const profilebyssoid_post = await post_response.json();
  const profilebyssoid_get = await get_response.json();

  expect(profilebyssoid_post).toEqual(profilebyssoid_get);

  console.log("[Result] Profile by SSO ID response match between GET and POST.");

  logger.log("profile by SSO ID - get method - with valid SSO_id request successfull"); 

});


test("Profile by SSO ID - post method - with valid SSO_id",{ tag: ['@sanity','@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - post method - with valid SSO_id check");

  const payload = await payloads.profilebyssoid();
  
  const response = await api.post(`/api/users/v1/profile`, payload, {headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,200);
  
  logger.log("profile by SSO ID - post method - with valid SSO_id request successfull"); 

});

test("Profile by SSO ID - post method - with invalid endpoint",{ tag: ['@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - post method - with invalid endpoint check");

  const payload = await payloads.profilebyssoid();
  
  const response = await api.post(`/api/users/v1/profile/invalid`, payload, {headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,404,'Unable to match incoming request to an operation');
  
  logger.log("profile by SSO ID - post method - with invalid endpoint request successfull"); 

});

test("Profile by SSO ID - post method - with invalid payload",{ tag: ['@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - post method - with invalid payload check");

  const payload = await payloads.profilebyssoid({sso_id : " "});
  
  const response = await api.post(`/api/users/v1/profile`, payload, {headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,400, 'Body of the request does not conform to the definition which is associated with the content type application/json');
  
  logger.log("profile by SSO ID - post method - with invalid payload request successfull"); 

});

test("Profile by SSO ID - post method - with invalid subscription key",{ tag: ['@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - post method - with invalid subscription key check");

  const payload = await payloads.profilebyssoid();
  
  const response = await api.post(`/api/users/v1/profile`, payload, {headers:{'subscription-key' : profile_subscription_key+'cdfsds'}});

  await validate.validation(response,401, 'Access denied due to invalid subscription key');
  
  logger.log("profile by SSO ID - post method - with invalid subscription key request successfull"); 

});

test("Profile by SSO ID - post method - with invalid SSO_id",{ tag: ['@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - post method - with invalid SSO_id check");

  const payload = await payloads.profilebyssoid({sso_id : "e0ab61f5-4485-4f39-8441-3379d2369606-897y"});
  
  const response = await api.post(`/api/users/v1/profile`, payload, {headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,400);
  
  logger.log("profile by SSO ID - post method - with invalid SSO_id request successfull"); 

});

test("Profile by SSO ID - get method - with valid SSO_id",{ tag: ['@sanity','@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - get method - with valid SSO_id check");

  const params = await payloads.profilebyssoid();
  
  const response = await api.get(`/api/users/v1/profile`, {params, headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,200);

  logger.log("profile by SSO ID - get method - with valid SSO_id request successfull"); 

});


test("Profile by SSO ID - get method - with invalid endpoint",{ tag: ['@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - get method - with invalid endpoint check");

  const params = await payloads.profilebyssoid();
  
  const response = await api.get(`/api/users/v1/profile/invalid`, {params, headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,404,'Unable to match incoming request to an operation');
  
  logger.log("profile by SSO ID - get method - with invalid endpoint request successfull"); 

});

test("Profile by SSO ID - get method - with invalid params",{ tag: ['@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - get method - with invalid params check");

  const params = await payloads.profilebyssoid({sso_id : ""});
  
  const response = await api.get(`/api/users/v1/profile`, {params, headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,400);
  
  logger.log("profile by SSO ID - get method - with invalid params request successfull"); 

});

test("Profile by SSO ID - get method - with invalid subscription key",{ tag: ['@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - get method - with invalid subscription key check");

  const params = await payloads.profilebyssoid();
  
  const response = await api.get(`/api/users/v1/profile`, {params, headers:{'subscription-key' : profile_subscription_key+'cdfsds'}});

  await validate.validation(response,401, 'Access denied due to invalid subscription key');
  
  logger.log("profile by SSO ID - post method - with invalid subscription key request successfull"); 

});

test("Profile by SSO ID - get method - with invalid email",{ tag: ['@regression','@profilebyssoid'] },async () => {
  logger.log("profile by SSO ID - get method - with invalid SSO_id check");

  const params = await payloads.profilebyssoid({sso_id: "e0ab61f5-4485-4f39-8441-3379d2369606-juj78"});
  
  const response = await api.get(`/api/users/v1/profile`, {params, headers:{'subscription-key' : profile_subscription_key}});

  await validate.validation(response,400);
  
  logger.log("profile by SSO ID - get method - with invalid SSO_id request successfull"); 

});

