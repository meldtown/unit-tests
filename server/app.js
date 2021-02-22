const cors = require('cors');
const express = require('express');

const users = require('./users.json');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(4000, () => console.log('Server is running on port 4000'));

app.get('/users', (req, res) => {
  res.send(users);
});
