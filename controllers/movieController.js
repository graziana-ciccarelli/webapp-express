import connection from '../data/db.js';


function index(req, res) {
  const sql = 'SELECT * FROM movies';  

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore lato server INDEX function' });

    const movies = results.map((movie) => {
      return {
        ...movie,
        image: req.imagePath + movie.image,
      };
    });

    res.json(movies);
  });
}

function show(req, res) {
  const { id } = req.params;

  const movieSql = 'SELECT * FROM movies WHERE id= ?'; 
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';
  
  connection.query(movieSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore lato server SHOW function' });

    if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });

    const movie = results[0];

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) return res.status(500).json({ error: 'Errore lato server SHOW function' });

      movie.reviews = reviewsResults;
      movie.image = req.imagePath + movie.image;  

      res.json(movie);
    });
  });
}


function destroy(req, res) {
  const { id } = req.params;

  const sql = 'DELETE FROM movies WHERE id = ?';

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: 'Errore lato server DESTROY function' });

    res.sendStatus(204);
  });
}


function addReview(req, res) {
  const { id } = req.params;
  const { name, vote, text } = req.body;
  const sql = 'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)';
  connection.query(sql, [id, name, vote, text], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore durante l\'aggiunta della recensione' });
    }

   
    const newReview = {
      id: results.insertId,
      movie_id: id,
      name,
      vote,
      text,
      created_at: new Date() 
    };

    res.status(201).json(newReview);
  });
}

export { index, show, destroy, addReview };
