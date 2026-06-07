class Controller {
    async get(req, res) {
        // Handle GET requests
        res.send('GET request handled');
    }

    async post(req, res) {
        // Handle POST requests
        res.send('POST request handled');
    }

    // Additional methods for other HTTP methods can be added here
}

module.exports = new Controller();