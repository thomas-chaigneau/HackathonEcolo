const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const url = 'mongodb://toto:toto666@ds249992.mlab.com:49992/hackathondeath';

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) { throw err; }
  console.log('DB OKKKK')
});

let DataSchema = new mongoose.Schema({
  webSite: { type: String },
  Octel: { type: Number }
});

let DataModel = mongoose.model('Data', DataSchema );

app.post('/datawebSite', async (req, res) => {
  const bidule = {
    webSite: req.body.webSite,
    Octel: parseInt(req.body.Octel),
  };
  console.log(bidule)
  const newBidule = await new DataModel(bidule);
  newBidule.save();
  res.send(bidule);
})

app.get('/datawebSite', async (req, res) => {
  const allData = await DataModel.find({});
  res.json({ allData });
});


app.get('/', (req, res) => {
  res.send('coucou le hack').status(200);
})


app.listen(port, () => {
console.log('running server on ' + port);
});