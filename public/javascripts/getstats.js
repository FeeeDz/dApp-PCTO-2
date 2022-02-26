var topDonor = document.getElementById('top-donor');
var topDonated = document.getElementById('top-donated');
var totalDonation = document.getElementById('total-donation');

//make a get request that sends the json file with the data of the contract, then display the data
async function getStats() {
    await fetch('http://localhost:3000/api/v1/getstats')
    .then((res) => res.json())
    .then((data) => {
        topDonor.textContent = data.topdonor;
        topDonated.textContent = data.topdonated;
        totalDonation.textContent = data.totaldonation;
    });
}

getStats();