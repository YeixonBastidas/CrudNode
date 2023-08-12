const express = require('express');
const cors = require('cors');
const router = require('../routes/user.routes');
const conect = require('../DB/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        this.conectDB();
        this.middlewares();
        this.routes();
    }

    async conectDB() {
        await conect.dbConection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.userPath, router);
    }

    listen = () => this.app.listen(this.port)
    
}

module.exports = Server;