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
    res.status(200).json(arr[req.params.index]);
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

app.post('/users', (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).send('Valid email and password are required');
    } else {
        arr.push(req.body);
        console.log('User created: ', arr);
        res.status(201).json(arr);
    }

});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const {email, password, id} = req.body;
    const userIndex = arr.findIndex(u => u.id === userId);

    if(userIndex === -1) {
        return res.status(404).send('User not found');
    }

    arr[userIndex] = {email, password, id};
    console.log('User updated:', arr[userIndex]);
    res.status(200).json(arr[userIndex]);
})

// app.delete('/users/:id', (req, res) => {
//     const deleteId = parseInt(req.params.id);
//
//     if(deleteId === -1) {
//         return res.status(404).json('Item not found');
//     } else {
//         arr.splice(deleteId, 1);
//         res.status(200).json(`Item with ID: ${deleteId} deleted successfully.`);
//     }
// })