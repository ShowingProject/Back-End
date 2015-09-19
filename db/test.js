var s_concert = require("./table/s_concert");

var concert_obj = s_concert.find(1).success(function (obj) {
  console.dir(obj);
});

//console.dir(s_concert);
s_concert.find({
  where: {
    "concertUuid": 1
  }
}).success(function (concert) {
  console.dir(concert);
});