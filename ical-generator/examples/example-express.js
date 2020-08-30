'use strict';

const ical = require('ical-generator');
const moment = require('moment');
const express = require('express');

const cal = ical({
    domain: 'example.com',
    prodId: '//superman-industries.com//ical-generator//EN',
    events: [
        {
            start: moment(),
            end: moment().add(1, 'hour'),
            summary: 'Example Event',
            description: 'It works ;)',
            url: 'https://example.com'
        }
    ]
});

console.log("moment : " + moment());
console.log("moment format : " + moment().format('LLL'));
console.log("moment date : " + moment('2020-06-26 20:44'));
console.log("moment date format : " + moment('2020-06-26 20:44').format('LLL'));
const app = express();

app.get('/calendar', (req, res) => {
    cal.serve(res);
});

app.listen(3000);
