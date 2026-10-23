
const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const connectionRequestModel = require("../models/connectionrequest");

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

  
    console.log("Pending requests found:", pendingRequests.length);

  } catch (err) {
    console.error("Error in daily pending request job:", err);
  }
});
