const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const isBeingRented = require('../middleware/isBeingRented');
const {Rental} = require('../models/schemas/rental');
const {Movie} = require('../models/schemas/movie');

router.delete('/:id',[auth,], async (req,res) =>{
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).json({error:"Rental not found."});

  if (rental.dateReturned) return res.status(400).send("Return already processed.");

  rental.return();
  await Movie.update(
      { _id: req.body.movieId },
      {
        $inc: { numberInStock: 1 }
      }
    );
  await rental.save();
  res.status(200).json(rental);
});

module.exports = router;