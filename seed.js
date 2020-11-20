/* 
  Seed File to Give Slide Banner Default Images

  Required on first load on fresh computer or server.

 */
const db = require('./models');

const slides =[
    {
        image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F201108fw-xl-asian-steamed-buns-with-bok-choy-and-chinese-chives.jpg%3Fitok%3DylMzmY_M",
        comment: "Defualt ",
        description: "Defualt"
    },
    {
        image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F201108fw-xl-asian-steamed-buns-with-bok-choy-and-chinese-chives.jpg%3Fitok%3DylMzmY_M",
        comment: "Defualt",
        description: "Defualt"
    },
    {
        image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F201108fw-xl-asian-steamed-buns-with-bok-choy-and-chinese-chives.jpg%3Fitok%3DylMzmY_M",
        comment: "Defualt",
        description: "Defualt"
    }
];

const hours = [
  {
    day: "Monday"
  },
  {
    day: "Tuesday"
  },
  {
    day: "Wendesday"
  },
  {
    day: "Thursday"
  },
  {
    day: "Friday"
  },
  {
    day: "Saturday"
  },
  {
    day: "Sunday"
  }
];



for(let i = 0; i < hours.length; i++){
    db.Hour.create(hours[i], (error, hours) => {
        if (error) {
          console.log(error);
        } else {
            
          console.log("Initial Hours created");
        }
      });
}


for(let i = 0; i < slides.length; i++){
  db.Hour.create(slides[i], (error, hours) => {
      if (error) {
        console.log(error);
      } else {    
        console.log("Initial Slide Imgs created");
      }
    });
}

// db.Slide.create(req.body, (error, slides) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.redirect('/admin');
//     }
//   });