const { Payment, Order, Schedule } = require("../../models");
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
  const data = await Order.findOne({
    where: {
      id,
    },
  });
  return data;
};

const findOnePaymentAll = async (id) => {
  const data = await Payment.findOne({
    where: {
      id,
    },
    include: { all: true, nested: true },
  });
  return data;
};

const findOnePayment = async (code) => {
  const data = await Payment.findOne({
    where: {
      paymentCode: code,
    },
  });
  return data;
};

const updateStatusPayment = async (code, status) => {
  const data = await Payment.update(
    {
      status: status,
    },
    {
      where: {
        paymentCode: code,
      },
      returning: true,
    }
  );
  return data[1];
};

const getPaymentByOrderId = async (id) => {
  try {
    const data = await Payment.findOne({
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
  const data = await findOnePaymentAll(payment.id);

  const template = makeTemplatePayment(data.toJSON());

  const mailOptions = {
    from: "flywisebinar@gmail.com",
    to: email,
    subject: "Payment FlyWise",
    html: template,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email terkirim: " + info.response);
    }
  });
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

const updateAvailSeatSchedule = async (PaymentId) => {
  const data = await findOnePaymentAll(PaymentId);
  const schedule = data.order.schedules;
  const passenger = data.order.passengers.length;

  

  for (let i = 0; i < schedule.length; i++) {
    await Schedule.update(
      {
        available_seat: schedule[i].schedule.available_seat + passenger,
      },
      {
        where: {
          id: schedule[i].schedule.id,
        },
      }
    );
  }

  return;
};

module.exports = {
  createPayment,
  findOnePayment,
  sendInvoiceMail,
  getPaymentByOrderId,
  updateStatusPayment,
  findOneOrder,
  updateAvailSeatSchedule,
};
