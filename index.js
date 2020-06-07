const fs = require('fs');

const superagent = require('superagent');

// callback hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
// 	console.log(`Breed: ${data}`);

// 	superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
// 		if (err) return console.log(err.message);

// 		fs.writeFile('dog-image.txt', res.body.message, err => {
// 			console.log(`Random image of a ${data} saved to file.`);
// 		});
// 	});
// });

// promises
const readFilePromise = file => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) reject(`File not found 😓: ${err}`);
			resolve(data);
		});
	});
};
const writeFilePromise = (destination, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(destination, data, err => {
			if (err) reject(`Error writing to file 😓: ${err}`);
			// single image
			// resolve(`Random image ( ${data} ) is saved to file.`);
			// multiple images
			resolve(`Random images were saved to file.`);
		});
	});
};
// readFilePromise(`${__dirname}/dog.txt`)
// 	.then(breed => {
// 		console.log(`Breed: ${breed}`);

// 		return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
// 	})
// 	.then(res => writeFilePromise('dog-image.txt', res.body.message))
// 	.then(writeResponse => console.log(writeResponse))
// 	.catch(err => (err.message ? console.log(err.message) : console.log(err)));

// async/await (under ES8)
const getDogPic = async () => {
	try {
		const breed = await readFilePromise(`${__dirname}/dog.txt`);
		console.log(`Breed: ${breed}`);
		// single API request
		// const apiResponse = await superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
		// const writeResponse = await writeFilePromise('dog-image.txt', apiResponse.body.message);
		// const writeResponse = await writeFilePromise('dog-image.txt', apiResponse.body.message);

		// multiple API requests/promises
		const apiResponse1 = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
		const apiResponse2 = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
		const apiResponse3 = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
		const all = await Promise.all([apiResponse1, apiResponse2, apiResponse3]);
		const imgUrls = all.map(el => el.body.message).join('\n');
		const writeResponse = await writeFilePromise('dog-image.txt', imgUrls);
		console.log(writeResponse);
	} catch (err) {
		let error = 'ERROR! 💥: ';
		error += err.message ? err.message : err;
		throw error;
	}

	return '2: 🐶 picture ready';
};
// IEFE (immediately-invoked function expression)
(async () => {
	try {
		console.log('1: will get dog pic...');
		const res = await getDogPic();
		console.log(res);
		console.log('3: done getting dog pic.');
	} catch (err) {
		console.log(err);
	}
})();
// console.log('1: will get dog pic');
// getDogPic()
// 	.then(res => {
// 		console.log(res);
// 		console.log('3: done getting dog pic.');
// 	})
// 	.catch(err => console.log(err));
