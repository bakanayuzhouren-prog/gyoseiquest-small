const https = require('https');
const fs = require('fs');

const env = fs.readFileSync('.env', 'utf8');
const keyMatch = env.match(/GOOGLE_SHEETS_API_KEY=(.*)/);
const idMatch = env.match(/SHEET_ID=(.*)/);

if (!keyMatch || !idMatch) {
    console.error('API Key or Sheet ID not found in .env');
    process.exit(1);
}

const key = keyMatch[1].trim();
const id = idMatch[1].trim();
const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}?key=${key}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response Body:', data);
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.log('\n--- ERROR DETAILS ---');
                console.log('Message:', json.error.message);
                console.log('Status:', json.error.status);
            } else {
                console.log('\n--- SUCCESS ---');
                console.log('Title:', json.properties.title);
            }
        } catch (e) {
            console.log('Failed to parse response JSON');
        }
    });
}).on('error', (err) => {
    console.error('Request Error:', err.message);
});
