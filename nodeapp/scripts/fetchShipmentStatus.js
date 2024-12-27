const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { parse } = require('json2csv');
const fetch = require('node-fetch');


const INPUT_CSV = 'input.csv'; // Input CSV file name
const OUTPUT_CSV = 'output.csv'; // Output CSV file name

const API_URL = 'https://purolator.ts2000.net/quickTrack/List';
const DELAY_MS = 2000; 

async function fetchStatus(trackingNumber) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json',
        'origin': 'https://purolator.ts2000.net',
        'referer': `https://purolator.ts2000.net/login/quicktrack/${trackingNumber}/0`,
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
      },
      body: JSON.stringify({
        trackingNumber,
        searchType: 0,
        searchTypeId: 0,
        startIndex: 0,
        limit: 10000,
        search: trackingNumber,
        sort: null,
        quickTrackType: 0,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch status for ${trackingNumber}`);
    }

    const data = await response.json();
    return data.quickTrackShipmentStatusTitle || 'Unknown';
  } catch (error) {
    console.error(error.message);
    return 'Error';
  }
}

// Function to introduce a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to process CSV file
async function processCSV() {
  const records = [];

  // Read the input CSV file
  fs.createReadStream(path.resolve(__dirname, INPUT_CSV))
    .pipe(csv())
    .on('data', (row) => {
      records.push(row);
    })
    .on('end', async () => {
      console.log(`Read ${records.length} records from ${INPUT_CSV}`);

      for (const record of records) {
        console.log(`Processing record with Serial Number: ${record['Serial Number']}`);

        if (record['Pickup Tracking Number']) {
          console.log(`Fetching pickup status for: ${record['Pickup Tracking Number']}`);
          record['Pickup Status'] = await fetchStatus(record['Pickup Tracking Number']);
        } else {
          record['Pickup Status'] = 'No Tracking Number';
        }

        if (record['Drop-off Tracking Number']) {
          console.log(`Fetching drop-off status for: ${record['Drop-off Tracking Number']}`);
          record['Dropoff Status'] = await fetchStatus(record['Drop-off Tracking Number']);
        } else {
          record['Dropoff Status'] = 'No Tracking Number';
        }

        await delay(DELAY_MS); // Add delay between processing each record
      }

      // Write updated data to the output CSV file
      const csvOutput = parse(records);
      fs.writeFileSync(path.resolve(__dirname, OUTPUT_CSV), csvOutput);
      console.log(`Updated records written to ${OUTPUT_CSV}`);
    });
}

processCSV();
