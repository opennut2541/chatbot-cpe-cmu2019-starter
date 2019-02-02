const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const app = express()
const Client = require('@line/bot-sdk').Client;


const config = {
  channelAccessToken: 'n88hInBJRyYcNr6+hH9xfd8CVmjS1aChz/ddo2cZRTMFDBk+BYDGJG1Cys9vX6Z54V35K8lFPsXDofI8Jkh/YbfC5DxW2NlIMMRTTMUB31isF7VpFNsNzz8a57iXCC1Ejnc6qEPlZR+RP6BkFM1ETgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1e12d29941fc79f3bfdd367a18045df9'
  
}
const client  = new Client(config)
app.get('/', function (req, res) {
    res.send('Hello World!!')
    })

app.post('/webhook', middleware(config), (req, res) => {
  //req.body.events // webhook event objects
  //req.body.destination // user ID of the bot (optional)
  res.send("Webhook success")
  const event = req.body.events[0];
    if (event.type === 'message') {
        const message = event.message;
        console.log(message);
        client.replyMessage(event.replyToken, 
          {
            "type": "template",
            "altText": "This is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg",
                "imageAspectRatio": "rectangle",
                "imageSize": "cover",
                "imageBackgroundColor": "#5C42F4",
                "title": "Charin Sansri",
                "text": "Please select",
                "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://google.com/"
                },
                "actions": [
                    {
                      "type": "postback",
                      "label": "มุขนี้ซื้อ",
                      "data": "action=buy&itemid=123"
                    },
                    {
                      "type": "message",
                      "label": "ซื้อไหมครับ",
                      "text": "ไม่ขายครับ"
                    },
                    {
                      "type": "uri",
                      "label": "ดูไหมครับ",
                      "uri": "http://facebook.com"
                    }
                ]
            }
          })
    }
    

  })

  app.set('port', (process.env.PORT || 4000))
app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})