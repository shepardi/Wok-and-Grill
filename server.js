/* External Module */
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

/* Internal Modules */
const controllers = require('./controllers');
const adminRequired = require('./middleware/adminRequire');
const db = require('./models/index');

/* Instance Module */
const app = express();

/* Global Variables */
const PORT = 4000;

/* app configuration */
app.set('view engine', 'ejs');

/* Middleware */
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

/* session config */
app.use(
  session({
    store: new MongoStore({
      url:'mongodb://localhost:27017/wokAndGrill',
      
    }),
    secret: 'wok and grill',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

/* Loading Initial Images & Data  */

// let firstLoad = false;
// if(db.Slide.length){
//     const slides =[
//       {
//           image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F201108fw-xl-asian-steamed-buns-with-bok-choy-and-chinese-chives.jpg%3Fitok%3DylMzmY_M",
//           comment: "Defualt ",
//           description: "Defualt"
//       },
//       {
//           image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F201108fw-xl-asian-steamed-buns-with-bok-choy-and-chinese-chives.jpg%3Fitok%3DylMzmY_M",
//           comment: "Defualt",
//           description: "Defualt"
//       },
//       {
//           image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F201108fw-xl-asian-steamed-buns-with-bok-choy-and-chinese-chives.jpg%3Fitok%3DylMzmY_M",
//           comment: "Defualt",
//           description: "Defualt"
//       }
//   ];

//   const hours = [
//     {
//       day: "Monday"
//     },
//     {
//       day: "Tuesday"
//     },
//     {
//       day: "Wendesday"
//     },
//     {
//       day: "Thursday"
//     },
//     {
//       day: "Friday"
//     },
//     {
//       day: "Saturday"
//     },
//     {
//       day: "Sunday"
//     }
//   ];



//   for(let i = 0; i < hours.length; i++){
//       db.Hour.create(hours[i], (error, hours) => {
//           if (error) {
//             console.log(error);
//           } else {
              
//             console.log("Initial Hours created");
//           }
//         });
//   }


//   for(let i = 0; i < slides.length; i++){
//     db.Hour.create(slides[i], (error, hours) => {
//         if (error) {
//           console.log(error);
//         } else {    
//           console.log("Initial Slide Imgs created");
//         }
//       });
//   }

//   firstLoad = true; //end case
// }

/* Controllers */
//auth routes
app.use('', controllers.root);

//auth routes
app.use('/auth', controllers.auth);

//admin routes
app.use('/admin', adminRequired, controllers.admin);

//Menu Route
app.use('/menu', controllers.menu);

//Item Route
app.use('/items', adminRequired, controllers.items);

//comments Route
app.use('/comments', controllers.comments);

//hour Route
app.use('/hour', adminRequired, controllers.hour);

//slide Route
app.use('/slide', adminRequired, controllers.slide);

app.use((req, res) => {
  res.status(404).render('404');
});

//Binding Server to Port
app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});