const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const https = require("https")



app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/" + "index.html")
})


app.post("/", function(req, res){
  const user = req.body.user
  const pass = req.body.password

  const data = {
    members: [
      {
        email_address: (Math.random() + "@gmail.com"),
        status: "subscribed",
        merge_fields: {
          FNAME: user,
          LNAME: pass
        }
       }
    ]
  };

   const jsonData = JSON.stringify(data)

   const url = "https://us14.api.mailchimp.com/3.0/lists/f6d76efc74"

   const options = {
     method: "POST",
     auth: "Txbe2000:3559840c97549b01633fa01b08286dbb-us14"
   }

  const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
          res.sendFile(__dirname + "/success.html")
        } else if (response.statusCode !== 200){
          res.sendFile(__dirname + "/failure.html")
        }


        response.on("data", function(data){
        console.log(JSON.parse(data));
      })
   })

    request.write(jsonData)
    request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("server started on port 3000")
})
