 APIs for devtinder app

authRouter
 POST- /login
 POST -/signup
 POST-/logout

profileRouter
 GET- /profile/view
 PATCH- /profile/ edit
 PATCH- /profile/password


connectionrequestRouter
 POST- /request/send/interested/:userId
 POST- /request/send/ignore/:userId
 POST -/request/review/accepted/:requestId
 POST -/request/review/rejected/:requestId

userRouter
 GET-/connections
 GET-/connections/recieved
 GET-/feed - gets u the profile of other users on the platform 

status: ignore, interested, accepted, rejected