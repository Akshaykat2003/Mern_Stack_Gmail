import express from 'express';
import cors from 'cors';
import Connection from './database/db.js';
import routes from './routes/route.js';
import dotenv from 'dotenv';
import path from 'path';

const __dirname =path.resolve();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true}));

// used to handle api body
app.use(express.json({extended: true}));
app.use('/', routes);

app.use(express.static(path.join(__dirname,"./client/build")))

app.get('*',function(_,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"), function(err){
        res.status(500).send(err);
    })
})

const PORT = process.env.PORT || 8000;

Connection();

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));