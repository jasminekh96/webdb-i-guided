const express = require('express');

// database access using knex
const knex = require('../data/db-config.js'); //rename from db to knex

const router = express.Router();
// return a list of posts from database
router.get('/', (req, res) => {
	//select * from posts
	knex
		.select('*')
		.from('posts')
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error getting the post' });
		});
});

router.get('/:id', (req, res) => {
	//select * from posts where id = req.params.id
	knex
		.select('*')
		.from('posts')
		// .where("price", ">", 30) --where with specifics
		.where({ id: req.params.id })
		.first() // equivalent to post [0]
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error getting the post' });
		});
});

router.post('/', (req, res) => {
	//insert into () values ()
	const postData = req.body;
	//validate the postData before calling the database
	//knew.insert(postData).into('posts')
	//second argument ("Id") will show a warning in console when using SQLite, it's ok.
	//the warning is there for the future (when we move to MySQL or Postgres)
	//select controls what we see
	knex('posts')
		.insert(postData, 'id')
		.then((ids) => {
			//returns an array of one element, the id of the last record inserted
			const id = ids[0];
			return knex('posts').select('id', 'title', 'contents').where({ id }).then((post) => {
				res.status(201).json(post);
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error adding the post' });
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	//validate the data
	knex('posts')
		.where({ id })
		.update(changes)
		.then((count) => {
			res.status(200).json({ message: `${count} records(s) updated` });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error updating the post' });
		});
});

router.delete('/:id', (req, res) => {
	knex('posts')
		.where({ id: req.params.id })
		.del()
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ message: `${count} records(s) deleted` });
			} else {
				res.status(404).json({ message: 'record not found' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error deleting the post' });
		});
});

module.exports = router;
