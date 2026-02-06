const api = require('./apiClient');

// generate random number for email
function getEmail() {
  // Generates a 4-digit random number (0000–9999)
  const random = `${Math.floor(Math.random() * 10000)}`.padStart(4, '0');

  return `todaysonline2${random}@gmail.com`;
}



let token;
async function Generatetoken(overrides ={}){

   if (token){
    return token;
   }
    const payload = {
     username: "meconnectsignin@gmail.com",
    password: "123456789",
    client_id: "05bf8e42-5bb6-468c-9c89-143b20ba47e7",
    secret_key: "66DFD35B-B889-4FC8-8793-8B664CA0102F",
    token_expiry: 1020,
    device_id: "apimocktestdevice",

    ...overrides
    }
    
  const response = await api.post("api/api/auth0/signin",payload);
    const responsebody = await response.json();
  
    token = responsebody.token;
    return token;
  
  }

  let useFirst = true;

function getResetPassword() {
  const password1 = "123456789@r";
  const password2 = "123456789";

  const selectedPassword = useFirst ? password1 : password2;
  useFirst = !useFirst; // toggle

  return selectedPassword;
}



module.exports = { getEmail,Generatetoken,getResetPassword };
