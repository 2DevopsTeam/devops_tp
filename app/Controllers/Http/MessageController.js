'use strict'
const Message = use('App/Models/Message')
const fetch = require('node-fetch');

class MessageController {
    async save ({ request, response }) {
        const payload = request.only(['message']);

        console.log(payload);
        
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

        return response.status(200).json(msg.message);
    }

    async all({ request, response }) {
        var messages = await Message.all();
        var responseJSON = []
        await messages.rows.forEach((message) => {
            responseJSON.push(message.message)
        });
        return response.status(200).json((responseJSON));
    }

    async kabaApi({ view, request, response }){
        const payload = request.only(['message', 'url']);
        var returndata = [];
        console.log(payload)
        
        if(payload.message){
            /*var form = new FormData();
            form.append('content', payload.message);*/

            const data = {
                message: payload.message
            }
            console.log(JSON.stringify(data));

            await fetch(payload.url,{ method: 'POST',headers: { "Content-type": "application/json" }, body: JSON.stringify(data) })
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
