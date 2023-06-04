require('dotenv').config()
const express = require('express')
const app = express()

// TODO: import the getCityInfo and getJobs functions from util.js
const {getJobs, getCityInfo} = require('./util.js')

app.use(express.json())

// TODO: Statically serve the public folder
app.use(express.static('public'))

// TODO: declare the GET route /api/city/:city
app.get('/api/city/:city', async (req, res) => {
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
const cityInfo = await getCityInfo(req.params.city)
const jobs = await getJobs(req.params.city)

// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
if (cityInfo && jobs) {
    res.status(200).json({cityInfo: cityInfo, jobs: jobs})

} else if (cityInfo && !jobs) {
    res.status(200).json({cityInfo: cityInfo, jobs: false})

} else if (!cityInfo && jobs) {
    res.status(200).json({cityInfo: false, jobs: jobs})

} else {
// If no city info or jobs are found,
// the endpoint should return a 404 status
    res.status(404).json({error: 'No information found.'})
}
})


module.exports = app
