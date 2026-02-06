const fs = require('fs');
const { google } = require('googleapis');

const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

function getAuth() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH));

  const { client_secret, client_id, redirect_uris } = credentials.installed;

  const auth = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  auth.setCredentials(token);
  return auth;
}

function getMessageBody(payload) {
  if (payload.body?.data) return payload.body.data;

  if (payload.parts) {
    for (const part of payload.parts) {
      const body = getMessageBody(part);
      if (body) return body;
    }
  }
  return null;
}

async function fetchOTP(afterSeconds, retries = 10, delay = 3000) {
  const gmail = google.gmail({ version: 'v1', auth: getAuth() });

  for (let i = 0; i < retries; i++) {
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: `subject:OTP after:${afterSeconds}`,
      maxResults: 3,
    });

    if (!res.data.messages?.length) {
      await new Promise(r => setTimeout(r, delay));
      continue;
    }

    const message = await gmail.users.messages.get({
      userId: 'me',
      id: res.data.messages[0].id,
    });

    // ✅ THIS IS THE KEY FIX
    const snippet = message.data.snippet;

    const otpMatch = snippet.match(/\b\d{6}\b/);
    if (!otpMatch) throw new Error('OTP not found');

    return otpMatch[0];
  }

  console.log('OTP email not received');
}

module.exports = { fetchOTP };
