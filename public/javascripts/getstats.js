var topDonor = document.getElementById('top-donor');
var topDonated = document.getElementById('top-donated');
var totalDonation = document.getElementById('total-donation');


async function getStats() {
    await fetch('https://krypto-medical.herokuapp.com/api/v1/getstats')
    .then((res) => res.json())
    .then((data) => {
        topDonor.textContent = data.topdonor;
        topDonated.textContent = data.topdonated;
        totalDonation.textContent = data.totaldonation;
    });
}


getStats();