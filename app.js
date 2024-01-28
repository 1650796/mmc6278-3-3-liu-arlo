require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json());

// TODO: import the getCityInfo and getJobs functions from util.js
const {getCityInfo, getJobs} = require('./util.js');

// TODO: Statically serve the public folder
app.use(express.static('public'));

// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
app.get('/api/city/:city', async (req, res) => {
    // The returned JSON object should have two keys:
    // cityInfo (with value of the getCityInfo function)
    // jobs (with value of the getJobs function)
    const cityInfo = await getCityInfo(req.params.city);
    const jobs = await getJobs(req.params.city);

    if (cityInfo && jobs) {
        res.status(200).json({cityInfo: cityInfo, jobs: jobs});

    } else if (!cityInfo && jobs) {
        res.status(200).json({cityInfo: false, jobs: jobs});

    } else if (cityInfo && !jobs) {
        res.status(200).json({cityInfo: cityInfo, jobs: false});
        
    } else {
        // If no city info or jobs are found,
        // the endpoint should return a 404 status
        res.status(404).json({error: "No city or job information found, please try another city."})
    }
});


module.exports = app
