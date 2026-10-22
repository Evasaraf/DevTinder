
const { SendEmailCommand } = require("@aws-sdk/client-ses");
const sesClient = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Source: fromAddress,

    Destination: {
      ToAddresses: [toAddress],
    },

    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "DevTinder Connection Request",
      },
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: "Someone has sent you a connection request on DevTinder!",
        },
      },
    },
  });
};

const run = async () => {
  const command = createSendEmailCommand(
    "evasaraf1405@gmail.com",
    "evasonismr@gmail.com"
  );

  return await sesClient.send(command);
};

module.exports = { run };


