const nodemailer = require("nodemailer");

exports.sendEmail = async function (req, res, next) {
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    port: 25,
    service: "Gmail",
    auth: {
      user: "api2docuatri2020@gmail.com", //poner cuenta gmail
      pass: "Api2020!", //contraseña cuenta  IMPORTANTE HABILITAR acceso apps poco seguras google
    },
  });
  // Definimos el email
  var mailOptions = {
    from: "api2docuatri2020@gmail.com",
    to: req.body.destinatario,
    subject: req.body.asunto,
    html: "<h1>" + req.body.texto1 + "</h1><h3>" + req.body.texto2 + "</h3>",
  };
  console.log("mail", mailOptions);
  console.log("body", req.body);
  // Enviamos el email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error envio mail: ", error);
  }
};
