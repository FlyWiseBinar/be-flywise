const makeTemplatePayment = (data) => {
  const fullName = data.order.user.fullName;
  const orderCode = data.order.orderCode;
  const paymentCode = data.paymentCode;
  const schedules = data.order.schedules;
  const passengers = data.order.passengers;
  const totalOrder = data.order.totalPrice;
  let schedule = [];
  let passenger = {
    adult: 0,
    kids: 0,
    baby: 0,
  };

  for (let i = 0; i < passengers.length; i++) {
    if (passengers[i].ageType == "adult") {
      passenger.adult += 1;
    }
    if (passengers[i].ageType == "kids") {
      passenger.kids += 1;
    }
    if (passengers[i].ageType == "baby") {
      passenger.baby += 1;
    }
  }

  for (let i = 0; i < schedules.length; i++) {
    schedule.push({
      airline: {
        name: schedules[i].schedule.plane.airline.airlineName,
        code: schedules[i].schedule.plane.airline.airlineCode,
        logo: schedules[i].schedule.plane.airline.logo,
      },
      route: `${schedules[i].schedule.originAirport.airportCode} - ${schedules[i].schedule.destinationAirport.airportCode}`,
      class: schedules[i].schedule.class.name,
      price: {
        adultPrice: schedules[i].schedule.adultPrice * passenger.adult,
        kidsPrice: schedules[i].schedule.kidsPrice * passenger.baby,
        babyPrice: schedules[i].schedule.babyPrice * passenger.kids,
        taxPrice: schedules[i].schedule.taxPrice,
      },
    });
  }

  let templateSchedule = "";

  for (let i = 0; i < schedule.length; i++) {
    templateSchedule += `
      
      <table
              border="0"
              style="
              cellspacing: 0;
              color: #e4e6eb;
              font-family: 'Helvetica Neue', Arial, sans-serif;
              font-size: 13px;
              line-height: 22px;
              table-layout: auto;
              width: 100%;
              margin-bottom: 10px;
              "
          >
              <tr
              style="
                  border-bottom: 1px solid #ecedee;
                  text-align: left;
              "
              >
              <th style="font-size: 16px; width: 70%">
                  <p>${schedule[i].airline.name} | ${schedule[i].route} | ${
      schedule[i].class
    }</p>
              </th>
              <th align="right">
                  <img
                  src="${schedule[i].airline.logo}"
                  alt=""
                  style="height: 35px"
                  />
              </th>
              </tr>
          </table>
          <table
              border="0"
              style="
              cellspacing: 0;
              color: #e4e6eb;
              font-family: 'Helvetica Neue', Arial, sans-serif;
              font-size: 13px;
              line-height: 22px;
              table-layout: auto;
              width: 100%;
              margin-bottom: 10px;
              "
          >
              <tr>
              <td style="padding: 0px 5px 5px 0">Adult</td>
              <td style="padding: 0 5px">${passenger.adult}</td>
              <td style="padding: 0 0 0 5px" align="right">
                ${new Intl.NumberFormat().format(schedule[i].price.adultPrice)}
              </td>
              </tr>
              <tr>
              <td style="padding: 0 5px 5px 0">Kids</td>
              <td style="padding: 0 5px">${passenger.kids}</td>
              <td style="padding: 0 0 0 5px" align="right">
                ${new Intl.NumberFormat().format(schedule[i].price.kidsPrice)}
              </td>
              </tr>
              <tr>
              <td style="padding: 0 5px 5px 0">Baby</td>
              <td style="padding: 0 5px">${passenger.baby}</td>
              <td style="padding: 0 0 0 5px" align="right">
                ${new Intl.NumberFormat().format(schedule[i].price.babyPrice)}
              </td>
              </tr>
              <tr
              style="
                  border-bottom: 2px solid #ecedee;
                  text-align: left;
                  padding: 15px 0;
              "
              >
              <td style="padding: 0 5px 5px 0">Tax</td>
              <td style="padding: 0 5px">1</td>
              <td style="padding: 0 0 0 5px" align="right">
                ${new Intl.NumberFormat().format(schedule[i].price.taxPrice)}
              </td>
              </tr>
              <tr
              style="
                  border-bottom: 2px solid #ecedee;
                  text-align: left;
                  padding: 15px 0;
              "
              >
              <td
                  style="padding: 5px 15px 5px 0; font-weight: bold"
              >
                  TOTAL
              </td>
              <td style="padding: 0 15px"></td>
              <td
                  style="padding: 0 0 0 15px; font-weight: bold"
                  align="right"
              >
                ${new Intl.NumberFormat().format(
                  schedule[i].price.adultPrice +
                    schedule[i].price.kidsPrice +
                    schedule[i].price.babyPrice +
                    schedule[i].price.taxPrice
                )}
              </td>
              </tr>
          </table>
      `;
  }

  const bodyTemplate = `
    <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="vertical-align: bottom"
    width="100%"
    >
        <tr>
            <td
            align="center"
            style="
                font-size: 0px;
                padding: 10px 25px;
                word-break: break-word;
            "
            >
            <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="border-collapse: collapse; border-spacing: 0px"
            >
                <tbody>
                <tr>
                    <td style="width: 125px">
                    <img
                        height="auto"
                        src="https://ik.imagekit.io/q0bdgl7c0/flywise-white.png?updatedAt=1686646046162"
                        style="
                        border: 0;
                        display: block;
                        outline: none;
                        text-decoration: none;
                        width: 100%;
                        "
                        width="64"
                    />
                    </td>
                </tr>
                </tbody>
            </table>
            </td>
        </tr>

        <tr>
            <td
            align="center"
            style="
                font-size: 0px;
                padding: 10px 25px;
                word-break: break-word;
            "
            >
            <div
                style="
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 24px;
                font-weight: bold;
                line-height: 22px;
                text-align: center;
                color: #fff;
                "
            >
                Complete your payment
            </div>
            </td>
        </tr>

        <tr>
            <td
            align="left"
            style="
                font-size: 0px;
                padding: 10px 25px;
                word-break: break-word;
            "
            >
            <div
                style="
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                line-height: 22px;
                text-align: left;
                color: #e4e6eb;
                "
            >
                <p>Hi ${fullName},</p>

                <p>
                We hope this message finds you well. We would like
                to provide you with the payment information for the
                flight ticket you have booked. Thank you for
                choosing us as your service provider for flight
                ticket reservations.
                </p>

                <p>
                Here are the details of your flight ticket payment:
                </p>
            </div>
            <div
                style="
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 15px;
                font-weight: bold;
                line-height: 22px;
                text-align: left;
                color: #fff;
                "
            >
                <p style="margin: 0">
                Order Number: ${orderCode} <br />
                Payment Number: ${paymentCode}
                </p>
            </div>
            </td>
        </tr>
        <tr>
        <td
        align="left"
        style="
            font-size: 0px;
            padding: 10px 25px;
            word-break: break-word;
        "
        >
          ${templateSchedule}
          <table
                border="0"
                style="
                cellspacing: 0;
                color: #e4e6eb;
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 13px;
                line-height: 22px;
                table-layout: auto;
                width: 100%;
                margin-bottom: 10px;
                "
            >
          <tr
          style="
          border-bottom: 2px solid #ecedee;
          text-align: left;
          padding: 15px 0;
          "
          >
            <td
              style="padding: 5px 15px 5px 0; font-weight: bold"
            >
                    TOTAL ORDER
            </td>
            <td style="padding: 0 15px"></td>
            <td
            style="padding: 0 0 0 15px; font-weight: bold"
            align="right"
            >
              ${new Intl.NumberFormat().format(totalOrder)}
            </td>
          </tr>
          </table>
          </td>
        </tr>
        
        <tr>
            <td
            align="left"
            style="
                font-size: 0px;
                padding: 10px 25px;
                word-break: break-word;
            "
            >
            <div
                style="
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                line-height: 22px;
                text-align: left;
                color: #e4e6eb;
                "
            >
                <p>
                Kindly make the payment within [Payment Deadline] to
                ensure prompt processing and issuance of your
                ticket. Please note that your flight ticket will be
                considered unconfirmed if payment is not received
                within the specified timeframe.
                </p>
            </div>
            </td>
        </tr>

        <tr>
            <td
            align="center"
            style="
                font-size: 0px;
                padding: 10px 25px;
                word-break: break-word;
            "
            >
            <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="border-collapse: separate; line-height: 100%"
            >
                <tr>
                <td
                    align="center"
                    bgcolor="#2F67F6"
                    role="presentation"
                    style="
                    border: none;
                    border-radius: 3px;
                    color: #ffffff;
                    cursor: auto;
                    padding: 15px 25px;
                    "
                    valign="middle"
                >
                    <p
                    style="
                        background: #2f67f6;
                        color: #ffffff;
                        font-family: 'Helvetica Neue', Arial,
                        sans-serif;
                        font-size: 15px;
                        font-weight: normal;
                        line-height: 120%;
                        margin: 0;
                        text-decoration: none;
                        text-transform: none;
                    "
                    >
                    <a
                        href="http://localhost:5000/v1/api/order/pay-payment?paymentCode=${paymentCode}"
                        style="color: #fff; text-decoration: none" 
                        target="_SEJ" rel="noreferrer"
                    >
                        Pay Invoice</a
                    >
                    </p>
                </td>
                </tr>
            </table>
            </td>
        </tr>

        <tr>
            <td
            align="left"
            style="
                font-size: 0px;
                padding: 10px 25px;
                word-break: break-word;
            "
            >
            <div
                style="
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                line-height: 22px;
                text-align: left;
                color: #e4e6eb;
                "
            >
                <p>
                We appreciate your cooperation and support in using
                our services. Thank you for this opportunity, and we
                wish you a pleasant journey.
                </p>
            </div>
            </td>
        </tr>

        <tr>
            <td
            align="left"
            style="
                font-size: 0px;
                padding: 10px 25px;
                word-break: break-word;
            "
            >
            <div
                style="
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                line-height: 20px;
                text-align: left;
                color: #e4e6eb;
                "
            >
                Best regards,<br /><br /><br />
                FlyWise <br />flywisebinar@gmail.com
            </div>
            </td>
        </tr>
    </table>
    `;

  const template = buildTemplate(bodyTemplate);

  return template;
};

const buildTemplate = (bodyTemplate) => {
  const template = `
    
    <!DOCTYPE html>
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <title> </title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
    
          table,
          td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
    
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
    
          p {
            display: block;
            margin: 13px 0;
          }
        </style>
        <style type="text/css">
          @media only screen and (max-width: 480px) {
            @-ms-viewport {
              width: 320px;
            }
            @viewport {
              width: 320px;
            }
          }
        </style>
        <style type="text/css">
          @media only screen and (min-width: 480px) {
            .mj-column-per-100 {
              width: 100% !important;
            }
          }
        </style>
      </head>
    
      <body style="background-color: #dedede">
        <div style="background-color: #dedede">
          <div
            style="
              background: #dedede;
              background-color: #dedede;
              margin: 0px auto;
              max-width: 600px;
            "
          >
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background: #dedede; background-color: #dedede; width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      border-bottom: #3a3a3a solid 5px;
                      direction: ltr;
                      font-size: 0px;
                      padding: 20px 0;
                      text-align: center;
                      vertical-align: top;
                    "
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style="
              background: #3a3b3c;
              background-color: #3a3b3c;
              margin: 0px auto;
              max-width: 600px;
            "
          >
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background: #3a3b3c; background-color: #3a3b3c; width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      border: #3a3b3c solid 1px;
                      border-top: 0px;
                      direction: ltr;
                      font-size: 0px;
                      padding: 20px 0;
                      text-align: center;
                      vertical-align: top;
                    "
                  >
                    <div
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        font-size: 13px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: bottom;
                        width: 100%;
                      "
                    >
                      ${bodyTemplate}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="margin: 0px auto; max-width: 600px">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      direction: ltr;
                      font-size: 0px;
                      padding: 20px 0;
                      text-align: center;
                      vertical-align: top;
                    "
                  >
                    <div
                      class="mj-column-per-100 outlook-group-fix"
                      style="
                        font-size: 13px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: bottom;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: bottom; padding: 0">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 0;
                                      word-break: break-word;
                                    "
                                  ></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
    `;

  return template;
};

module.exports = {
  makeTemplatePayment,
};
