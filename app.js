const express = require("express");
const morgan = require("morgan");
const app = express();
const movies = require("./movies.js");
app.use(morgan("common"));

const validGenre = [
  `Drama`,
  `Romantic`,
  `Comedy`,
  `Spy`,
  `Crime`,
  `Thriller`,
  `Adventure`,
  `Documentary`,
  `Horror`,
  `Action`,
  `Biography`,
  `History`,
  `Fantasy`,
  `War`
];

const validCounty = [
  `United States`,
  `Italy`,
  `Great Britain`,
  `Japan`,
  `France`,
  `Germany`,
  `Spain`
];

function handleGetTypes(req, res) {
  res.json(validGenre);
}

app.get("/movie", (req, res) => {
  const { genre = "", country, avg_vote } = req.query;

  if (genre) {
    let results = movies.filter(movie =>
      movie.genre.toLowerCase().includes(genre.toLowerCase().trim())
    );

    console.log(results);

    res.status(200).send(results);
  }

  if (country) {
    let results = movies.filter(movie =>
      movie.country.toLowerCase().includes(country.toLowerCase().trim())
    );

    console.log(results);

    res.status(200).send(results);
  }

  if (avg_vote) {
    let results = movies.filter(
      movie => movie.avg_vote >= parseFloat(req.query.avg_vote)
    );

    console.log(results);
    console.log(req.query);

    res.status(200).send(results);
  }
});

app.get("/types", handleGetTypes);

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
