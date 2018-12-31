const express = require('express');
const bodyParser = require('body-parser');
const viewRoutes = require('./app/routes/viewRoutes');
const apiRoutes = require('./app/routes/apiRoutes');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/static', express.static('app/public'));

app.use(viewRoutes);
app.use('/api', apiRoutes);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './app/public/views/'));

const port = (process.env.PORT || 3000);
// const hostname = 'localhost';

// app.listen(port, hostname, () => {
//     console.log(`Byron's server is running at port ${port}`);
// })