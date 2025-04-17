const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const url = 'https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?ts=' + Date.now();
const filePath = path.join(__dirname, 'results.json');

async function fetchAndSaveResults() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const newResults = data?.Data?.list || [];

    let existingResults = [];
    if (fs.existsSync(filePath)) {
      existingResults = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    const existingIssueIds = new Set(existingResults.map(item => item.issue));
    const filteredNewResults = newResults.filter(item => !existingIssueIds.has(item.issue));

    if (filteredNewResults.length > 0) {
      const updatedResults = [...filteredNewResults, ...existingResults].slice(0, 100); // Keep only recent 100
      fs.writeFileSync(filePath, JSON.stringify(updatedResults, null, 2));
      console.log(`Added ${filteredNewResults.length} new result(s).`);
    } else {
      console.log('No new results found.');
    }
  } catch (error) {
    console.error('Error fetching:', error.message);
  }
}

fetchAndSaveResults();
