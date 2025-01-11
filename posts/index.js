const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const axios = require('axios');


app.use(bodyParser.json());
app.use(cors());


const  posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {      // new route
  const id = randomBytes(4).toString('hex');
  const {title} = req.body;
  posts[id] = {
    id, title
  };
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id, title
    }
  });  // new line
  return res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event:', req.body.type);
  res.send({});
});  // new route

app.listen(4000, () => {
  console.log("Hey this is the change basically im doing to update my deployment!")
  console.log('just another change to check the deployment method 2');
  console.log('Listening on 4000');
});