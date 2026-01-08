const express = require('express'); //web server
const cors = require('cors') //Allows access on localhost
const bodyParser = require("body-parser"); //Allows json data in body section

const app = express();
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Specify allowed methods
}));
app.use(bodyParser.json());
const port = 3000;

const arr= [];
app.get("/", (req, res) => {
    res.json({
        data: arr,
    });
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

app.post('/users', (req, res) => {
    const {email, password, id} = req.body;
    if(!password || !email || !id) {
        return res.status(400).send('Email, password and id are required');
    }

    arr.push(req.body);
    console.log('User created: ', arr);
    res.status(200).json(arr);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const {email, password, id} = req.body;
    const userIndex = arr.findIndex(u => u.id === userId);

    if(userIndex === -1) {
        return res.status(404).send('User not found');
    }

    arr[userIndex] = {email, password, id};
    console.log('User updated:', req.body);
    res.status(200).send({password});
})
