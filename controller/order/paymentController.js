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

  static async updatePaymentType(req, res) {
    const { paymentCode, paymentTypeId } = req.body;
    const email = req.user.email;

    if (!(await paymentService.findOnePayment(paymentCode))) {
      return res.status(400).json({
        status: false,
        message: "Payment could not be found",
      });
    }

    const payment = await paymentService.updatePaymentMethod(paymentCode, paymentTypeId);

    await paymentService.sendInvoiceMail(email, payment);

    return res.status(201).json({
      status: true,
      message: "Payment has been created succesfully",
      data: payment,
    });
  }

  static async getPaymentType(req, res) {
    const data = await paymentService.getPaymentTypeAll();

    return res.status(200).json({
      status: true,
      message: "List Payment Type",
      data: data,
    })

  }

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
