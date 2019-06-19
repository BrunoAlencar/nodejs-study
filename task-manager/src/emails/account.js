const sgMail = require("@sendgrid/mail");

const sendgridAPIKey =
  "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";
sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
  to: "joaobrunoalencar@gmail.com",
  from: "joaobrunoalencar@gmail.com",
  subject: "This is my first creation!",
  text: "I hope this one actually get to you."
});
