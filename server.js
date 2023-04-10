// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// app.get('/', (req, res) => {
//     res.json({ message: 'You have connected to the server' });
// });

// const port = 3000;

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// fetch('http://localhost:3000/')
//     .then(response => response.json())
//     .then(data => console.log(data.message))
//     .catch(error => console.error(error));

// axios.get('http://localhost:3000/')
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.log(error);
//     });