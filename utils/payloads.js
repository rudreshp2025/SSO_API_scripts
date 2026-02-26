

class list_of_payloads{


async UDH_payload(key = "ikes", extraItems = []){

  const baseItems = 
     [
   {
            "id": "8A661B3b-1755-4535-89F0-c4c8520Cc697",
            "status": true,
            "name":"deep dive",
            "title":"Podcast",
            "artist":"John xavier",
            "category":"Entertainment",
            "language":"Chinese",
             "station":"SGP",
            "pushTag":"tag",
            "entityId": 174896,
            "brandCode": "melisten",
            "type": "podcast",
            "url": "https://www.melisten.sg/podcast/playlist/Deep-Dive-174896",
            "imageUrl": "https://www.omnycontent.com/d/playlist/7740012e-e1bd-4f85-81c4-a7f50047134a/053184de-200a-4a53-a80c-ab6e006ab608/22e00ef9-7730-4062-8cd4-ab6e006ab624/image.jpg?t=1713999098&size=Small",
           "videoUrl":"https://www.melisten.sg/podcast/playlist/Deep-Dive-174896",
           "audioUrl":"https://www.melisten.sg/podcast/playlist/Deep-Dive-174896",
           "contentUrl":"https://www.melisten.sg/podcast/playlist/Deep-Dive-174896",
            "currentPosition": 5.8,
            "duration": 15.35,
            "Queueposition": 1
            
        },
        {
            "id": "63e70046-Fc61-4e1d-b79A-c6b5cF37E753",
             "status": true,
            "name": "Radio-987",
            "title":"Radio",
            "entityId": 987,
            "brandCode": "melisten",
            "type": "radio",
            "url": "https://www.melisten.sg/radio/987",
            "imageUrl": "https://onecms-res.cloudinary.com/image/upload/v1690945557/mediacorp/mel/image/2023-08/Web-987-Nat-3216x664.jpg",
            "currentPosition": 3.4,
            "duration": 15,
            "Queueposition": ""
           
        },
        {
            "id": "8A661B3b-1755-4535-89F0-c4c8520Cc654",
            "status": true,
            "name":"",
            "title":"",
            "artist":"",
            "category":"",
            "language":"",
             "station":"",
            "pushTag":"",
            "entityId": null,
            "brandCode":"",
            "type": "",
            "url": "",
            "imageUrl":"",
           "videoUrl":"",
           "audioUrl":"",
           "contentUrl":"",
            "currentPosition": null,
            "duration": null,
            "queueposition":""
            
        },
        {
            "id": "8A661B3b-1755-4535-89F0-c4c8520Cc655",
             "status": false,
            "name": null,
            "title": null,
            "artist": null,
            "category" : null,
            "language": null,
             "station": null,
            "pushTag": null,
            "entityId": null,
            "brandCode": null,
            "type": null,
            "url": null,
            "imageUrl": null,
           "videoUrl": null,
           "audioUrl": null,
           "contentUrl": null,
            "currentPosition": null,
            "duration": null,
            "queueposition": null
            
        }
        
         
    ];
return {
  [key] : [...baseItems, ...extraItems]
}
  

}

 async UDH_npayload(extraItems = []) {
  const baseItems = [
    { id: "8A661B3b-1755-4535-89F0-c4c8520Cc697" },
    { id: "63e70046-FC61-4e1d-b79a-c6b5Cf37e753" },
    {id: "8A661B3b-1755-4535-89F0-c4c8520Cc654"},
    {id: "8A661B3b-1755-4535-89F0-c4c8520Cc655"},
    {id: "8A661B3b-1755-4535-89F0-c4c8520Cc656"},
  ];

  return [...baseItems, ...extraItems];
}

async profilebyemail(overrides = {}){
  return{
    
  email: "dayseight26@gmail.com",

  ...overrides

  };
} 

async profilebyssoid(overrides = {}){
  return{
    
  
  sso_id: "e0ab61f5-4485-4f39-8441-3379d2369606",

  ...overrides

  };
} 

}


module.exports = new list_of_payloads();
