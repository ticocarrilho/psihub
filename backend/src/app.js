const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

class AppController {

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    if(process.env.NODE_ENV !== 'production') {
      this.express.use(cors({
        origin: '*'
      }));
    } else if(process.env.NODE_ENV === 'production') {
      this.express.use(cors({
        credentials: true,
        origin: 'https://psihub.carrilho.dev',
        optionsSuccessStatus: 200
      }));
    }

    this.express.use(morgan('common'));
    this.express.use(express.json());
  }
  routes() {
    this.express.use('/api/', require('./routes'));

    if(process.env.NODE_ENV === 'production') {
      this.express.use(express.static(path.join(__dirname, '..', 'frontend')));
      this.express.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
      });
    }
  }
}

module.exports = new AppController().express;