const { paymentService } = require("../../service/order");

module.exports = class paymentController {
  static async getPaymentInvoice(req, res) {
    const { orderId } = req.body;
    const email = req.user.email;

    const payment = await paymentService.getPaymentByOrderId(orderId);

    if (!payment) {
      return res.status(400).json({
        status: false,
        message: "Payment Order could not be found",
      });
    }

    await paymentService.sendInvoiceMail(email, payment);

    return res.status(201).json({
      status: true,
      message: "Payment invoice has been send to destination email",
      data: {
        email: email,
      },
    });
  }

  static async createPayment(req, res) {
    const { orderId, paymentTypeId } = req.body;
    const email = req.user.email;

    if (!(await paymentService.findOneOrder(orderId))) {
      return res.status(400).json({
        status: false,
        message: "Order could not be found",
      });
    }

    const history = await paymentService.getPaymentByOrderId(orderId);

    if (history) {
      return res.status(400).json({
        status: false,
        message: "Payment already created",
        data: history,
      });
    }

    const payment = await paymentService.createPayment(orderId, paymentTypeId);

    await paymentService.sendInvoiceMail(email, payment);

    return res.status(201).json({
      status: true,
      message: "Payment has been created succesfully",
      data: payment,
    });
  }

  static getPaymentMethod(req, res) {}

  static async confirmPayment(req, res) {
    const { paymentCode } = req.query;

    const data = await paymentService.updateStatusPayment(
      paymentCode,
      "Issued"
    );

    res.redirect("https://fe-flywise-jcbxz3zpbq-as.a.run.app/");
  }

  static async cancelPayment(req, res) {
    const { paymentCode } = req.body;

    const history = await paymentService.findOnePayment(paymentCode);

    console.log(history.status);
    if (history.status == "Cancelled") {
      return res.status(400).json({
        status: true,
        message: "Payment already Cancelled",
        data: history,
      });
    }

    const data = await paymentService.updateStatusPayment(
      paymentCode,
      "Cancelled"
    );

    await paymentService.updateAvailSeatSchedule(data[0].id);

    return res.status(201).json({
      status: true,
      message: "Payment has been updated succesfully",
      data: data,
    });
  }
};
