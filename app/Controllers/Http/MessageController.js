'use strict'
const Message = use('App/Models/Message')
const fetch = require('node-fetch');
//const FormData = require('form-data');
/*const https = require('https');
const querystring = require('querystring');*/

class MessageController {
    async save ({ request, response }) {
        const payload = request.only(['message']);
        
        const params = {
            name: payload.message
        }
        
        const msg = new Message()
        await fetch('https://ploppublic.azurewebsites.net/api/HttpTrigger1',{ method: 'POST', body: JSON.stringify(params) })
        .then(async res => {
            //console.log(await res.text())
            msg.message = await res.text()
            await msg.save()
        })
        .catch(err => console.error(err));

        return response.status(200).json({
            msg: msg.message
        });
    }

    async all({ request, response }) {
        var messages = await Message.all();
        var responseJSON = []
        await messages.rows.forEach((message) => {
            responseJSON.push(message.message)
        });
        return response.status(200).json(JSON.stringify(responseJSON));
    }

    async kabaApi({ view, request, response }){
        const payload = request.only(['message', 'url']);
        var returndata = [];
        
        if(payload.message){
            /*var form = new FormData();
            form.append('content', payload.message);*/

            var data = {
                message: payload.message
            }

            await fetch(payload.url,{ method: 'POST', body: JSON.stringify(data) })
            .then(async res => {
                returndata.push(await res.text())
            })
            .catch(err => console.error(err));
        } else {
            var messages = await Message.all();
            var responseJSON = []
            await messages.rows.forEach((message) => {
                responseJSON.push(message.message)
            });
            returndata = responseJSON
        }

        return view.render('hello-world', {content_sended: returndata});
    }
}

module.exports = MessageController
