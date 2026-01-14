const express = require('express'); //web server
const cors = require('cors') //Allows access on localhost
const bodyParser = require("body-parser"); //Allows json data in body section

const app = express();
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Specify allowed methods
}));
app.use(bodyParser.json());
const port = 3000;

let nextUserId = 1

let users = [
    { id: 0, email: 'JohnDose@gmail.com', pass: '123456' }
];
app.get("/:index", (req, res) => {
    res.status(200).json(users[JSON.parse(req.params.index)]);
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

app.post("/users", (req, res) => {
    const{email, pass} = req.body;
    if(!pass || !email){
        res.status(400).json({error: 'Please enter a valid email and name'});
    }
    else {
        const newUser = {id: nextUserId++, email, pass};
        users.push(newUser);
        console.log('user created', newUser);
        res.status(201).json(newUser);
    }
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const{newEmail, newPass} = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if(userIndex === -1){
        return res.status(404).send({error: 'User not found'});
    }
    users[userIndex] = {userId, newEmail, newPass};
    console.log('user updated', users[userIndex]);
    res.status(200).json(users[userIndex]);
},)

app.delete('/users/:id', (req, res) => {
    const deleteId = parseInt(req.params.id);
    if (deleteId === -1) {
        return  res.status(404).json({ message: 'Item not found' });
    }
    else{
        console.log("User deleted at, "+deleteId +" remainingItems" +users);
        users.splice(deleteId, 1);
        res.status(200).json({ message: `Item with ID: ${deleteId} deleted successfully`, remainingItems: users});
    }
})


