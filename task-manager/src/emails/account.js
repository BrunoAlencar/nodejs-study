const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "joaobrunoalencar@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app ${name}. Let me know how you get along with the app.`
  });
};

const sendByeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "joaobrunoalencar@gmail.com",
    subject: "Thanks for try with us!",
    text: `Bye, bye ${name}. Anytime you want please came back with us!`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendByeEmail
};
