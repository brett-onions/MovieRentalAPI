const {Rental} = require('../models/schemas/rental');
const {Movie}  = require('../models/schemas/movie');

async function createRental(newRental = {customer,movie}){
    const rental = new Rental({
        customer:{
            customerId: newRental.customer._id,
            name: newRental.customer.name,
            isGold: newRental.customer.isGold,
            phone: newRental.customer.phone
        },
        movie:{
            movieId: newRental.movie._id,
            title: newRental.movie.title
        },
        dateOut: Date.now()
    });
    
    const movie  = await Movie.findById(newRental.movie.id);
    movie.numberInStock--;
    await movie.save();

    const rentedMovie = await rental.save(); 
    return rentedMovie;
}

async function getAllRentals(){
    return await Rental.find({dateReturned: { "$exists" : false } }).select('-__v');
}

async function getRental(id){
    return new Promise(async (resolve,reject) => {
        const rental = await Rental.findById(id).select('-__v');
        if(!rental) return reject(new Error('No rental found with that ID'));

        return resolve(rental);
    })
}


exports.createRental    = createRental;
exports.getAllRentals   = getAllRentals;
exports.getRental       = getRental;