const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ajeetrajbhar2504@gmail.com",
        pass: process.env.nodemailer_key, // Replace with your actual Gmail password
    },
});

function sendEmail(mailOption) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOption, function (err, info) {
            if (err) {
                reject("Otp send failed");
            } else {
                resolve("Otp send successfully");
            }
        });
    });
}

module.exports = { sendEmail };
