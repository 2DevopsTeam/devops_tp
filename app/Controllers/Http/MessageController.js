'use strict'
const Message = use('App/Models/Message')
const fetch = require('node-fetch');
const FormData = require('form-data');
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
        return response.status(200).json(Message.all());
    }

    async kabaApi({ view, request, response }){
        const payload = request.only(['message']);
        var form = new FormData();
        form.append('content', payload.message);

        var returndata = "";

        await fetch('https://devops.kabaconde.com/messages',{ method: 'POST', body: form })
        .then(async res => {
            //console.log(await res.text())
            returndata = await res.text()
        })
        .catch(err => console.error(err));

        /*let req = await https.post('https://devops.kabaconde.com/messages', {body: form}, (res) => {
            returndata = res.body.text();
            console.log('statusCode:', res.statusCode, 'ip:', res.connection.remoteAddress);
        });
        
        req.on('error', (e) => {
            console.error(e);
        });*/
        
        /*var postData = querystring.stringify({
            'content' : payload.message
        });

        var options = {
            hostname: 'devops.kabaconde.com',
            port: 443,
            path: '/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        var req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                returndata = d;
            });
        });

        req.on('error', (e) => {
            console.error(e);
        });

        req.write(postData);
        req.end();
*/

        return view.render('hello-world', {content_sended: returndata});
//        return response.status(200).json(Message.all());
    }
}

module.exports = MessageController
