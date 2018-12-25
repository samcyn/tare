/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAIL_GUN_API_KEY,
  domain: process.env.MAIL_GUN_DOMAIN_NAME,
});

function sendMail(mailObject) {
  const data = {
    from: 'Admin <me@tare.com>',
    to: mailObject.to || 'samsoniyanda@outlook.com',
    subject: mailObject.subject || 'Welcome',
    text: mailObject.message || 'Testing some Mailgun awesomness!',
    html: mailObject.HTML_MARK_UP || '<html>HTML version of the body</html>',
  };

  return mailgun.messages().send(data);
}

module.exports = {
  sendMail,
};
