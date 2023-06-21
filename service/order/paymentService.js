const { Payment, Order } = require("../../models");
const nodemailer = require("nodemailer");
const { makeTemplatePayment } = require("../../helper/emailTemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "flywisebinar@gmail.com",
    pass: "cydlcwdwtbudltdv",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const createPayment = async (orderId, paymentTypeId) => {
  const paymentCode = generatePaymentCode();

  const payment = await Payment.create({
    paymentCode: paymentCode,
    orderId: orderId,
    paymentTypeId: paymentTypeId,
    status: "Unpaid",
  });

  return payment;
};

const findOneOrder = async (id) => {
  const data = Order.findOne({
    where: {
      id,
    },
  });
  return data;
};

const findOnePayment = async (id) => {
  const data = Payment.findOne({
    where: {
      id,
    },
    include: { all: true, nested: true },
  });
  return data;
};

const updateStatusPayment = async (code) => {
  try {
    const data = Payment.update(
      {
        status: "Issued",
      },
      {
        where: {
          paymentCode: code,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPaymentByOrderId = async (id) => {
  try {
    const data = Payment.findOne({
      where: {
        orderId: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const sendInvoiceMail = async (email, payment) => {
  const data = await findOnePayment(payment.id);

  const template = makeTemplatePayment(data.toJSON());

  const mailOptions = {
    from: "flywisebinar@gmail.com",
    to: email,
    subject: "Payment FlyWise",
    html: template,
  };

  await transporter.sendMail(mailOptions);
};

const generatePaymentCode = () => {
  let result = "";
  const d = new Date();
  let date = d.getTime();
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charLength = char.length;

  do {
    let digit = date % 10;
    result += char.charAt(Math.floor(Math.random() * digit * 100) % charLength);
    date = Math.floor(date / 10);
  } while (date > 0);

  return result;
};

module.exports = {
  createPayment,
  findOnePayment,
  sendInvoiceMail,
  getPaymentByOrderId,
  updateStatusPayment,
  findOneOrder
};
