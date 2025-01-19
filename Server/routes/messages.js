const express = require("express");
const router = express.Router();
const queues = require('../db/queues'); 

// Utility function to create or get a queue
const getQueue = (queueName) => {
	if (!queues[queueName]) {
		queues[queueName] = [];
	}
	return queues[queueName];
};

// Add a message to a queue
router.post("/:queue_name", (req, res) => {
	const { queue_name } = req.params;
	const message = req.body;

	if (!message || typeof message !== "object") {
		return res
			.status(400)
			.send({ error: "Message body must be a valid JSON object." });
	}

	const queue = getQueue(queue_name);
	queue.push(JSON.stringify(message));
	res.status(201).send({ message: "Message added to the queue.", queues });
});

// Retrieve the next message from the queue
router.get("/:queue_name", async (req, res) => {
	const { queue_name } = req.params;
	const timeout = parseInt(req.query.timeout, 10) || 10000;

	const queue = getQueue(queue_name);

	const getMessage = () => {
		if (queue.length > 0) {
			return queue.shift();
		}
		return null;
	};

	const waitForMessage = async () => {
		const startTime = Date.now();
		while (Date.now() - startTime < timeout) {
			const message = getMessage();
			if (message) {
				return message;
			}
			await new Promise((resolve) => setTimeout(resolve, 100)); // Poll every 100ms
		}
		return null;
	};

	const message = await waitForMessage();

	if (message) {
		return res.status(200).send(message);
	} else {
		return res.status(204).send();
	}
});


module.exports = router;
