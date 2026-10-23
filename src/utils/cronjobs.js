
const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const connectionRequestModel = require("../models/connectionrequest");
const sendEmail = require('./sendEmail');

cron.schedule("0 8 * * *", async () => {
  console.log("Running daily pending request job:", new Date());

  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await connectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

  const listOfEmails = [... new Set(pendingRequests.map(req=> req.toUserId.emailId))]

  for(const email of listOfEmails){
  // send emails 
  try{
  const res = await sendEmail.run("new friend requests pending for " + toEmailId, "there are many friend requests pending, please login to the DevTinder.in and accept or reject the requests");
  }
  catch(err){
    console.error(err);
  }
  }

    console.log("Pending requests found:", pendingRequests.length);

  } catch (err) {
    console.error("Error in daily pending request job:", err);
  }
});
