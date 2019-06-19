const sgMail = require("@sendgrid/mail");
const { sendgridAPIKey } = require("../config");

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  console.log(email, name);
  sgMail.send({
    to: email,
    from: "joaobrunoalencar@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app ${name}. Let me know how you get along with the app.`
  });
};

module.exports = {
  sendWelcomeEmail
};
