const express = require("express");
const morgan = require("morgan");
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()
const app = express();

const movies = require("./movies.js");

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

//state = initialState;

// performFetch = () =>
//     fetch('http://localhost:8000/movie', {
//     headers: {
//         Authorization: `Bearer ${process.env.apiToken}`,
//     },
//   });


app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.apiToken
  const authToken = req.get('Authorization')
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  next()
 })

app.get("/movie", (req, res) => {
  const { genre = "", country, avg_vote } = req.query;

  if (genre) {
    let results = movies.filter(movie =>
      movie.genre.toLowerCase().includes(genre.toLowerCase().trim())
    );

    console.log(results);

    res.status(200).json(results);
  }
  

  if (country) {
    let results = movies.filter(movie =>
      movie.country.toLowerCase().includes(country.toLowerCase().trim())
    );

    console.log(results);

    res.status(200).json(results);
  }

  if (avg_vote) {
    let results = movies.filter(
      movie => movie.avg_vote >= parseFloat(req.query.avg_vote)
    );

    console.log(results);
    console.log(req.query);

    res.status(200).json(results);
  }
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
