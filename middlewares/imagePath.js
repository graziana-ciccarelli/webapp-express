function setImagePath(req,res, next) {
    req.imagePath = `${req.protocol}://${req.get('host')}/cover_movies/`;
    next();
  }
  
  export default setImagePath;
  