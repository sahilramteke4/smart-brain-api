const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '7986ac8095ce425981abec43dff7e001'
});

const handleApiCall = (req, res) => {
	console.log('I am in image URL api');
	app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	if(entries.length) {
	  	res.json(entries[0]);
	  } else {
	  	res.status(400).json('User does not exists');
	  }
	  })
	  .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}