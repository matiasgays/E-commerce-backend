const moment = require('moment');

const myBrth = moment(new Date('03/23/1993')).format('L');
console.log(moment(myBrth).isValid());
const today = moment().format('L');
console.log(typeof(today));
console.log(moment(today).diff(myBrth,'years'));