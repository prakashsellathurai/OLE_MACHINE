const functions = require('firebase-functions')
var config = require('./config.js')
let admin = require('firebase-admin')
admin.initializeApp(config)
let firestore = admin.firestore()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.postSensorData = functions
  .https
  .onRequest((request, response) => {
    let body = (request.body) || {}
    return firestore
      .collection('sensorData')
      .add(body)
      .then(() => response.json({
        status: 200
      }))
  })
