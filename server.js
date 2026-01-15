const express = require('express'); //web server
const cors = require('cors') //Allows access on localhost
const bodyParser = require("body-parser"); //Allows json data in body section

const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Specify allowed methods
}));

app.use(bodyParser.json());
const port = 3000;

let nextUserId = 0

let users = [
    { id: 0, email: 'JohnDose@gmail.com', pass: '123456' }
];

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if(!user) {
        return res.status(404).send('User Not Found');
    }
    res.status(200).json(user);
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

app.post("/users", (req, res) => {
    const{email, pass} = req.body;
    if(!pass || !email){
        return res.status(400).json({error: 'Please enter a valid email and name'});
    }
        const newUser = {id: nextUserId++, email, pass};
        users.push(newUser);
        console.log('User created', JSON.stringify(newUser, null, 2));
        res.status(201).json(newUser);

});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const{newEmail, newPass} = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if(userIndex === -1){
        return res.status(404).json({error: 'User not found'});
    }
    users[userIndex] = {userId, newEmail, newPass};
    console.log('user updated', JSON.stringify(users[userIndex], null, 2));
    res.json(users[userIndex]);
},)

app.delete('/users/:id', (req, res) => {
    const deleteId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === deleteId);
    if (index === -1) {
        return  res.status(404).json({ message: 'User not found' });
    }
        users.splice(index, 1);
        console.log("Remaining users: ", JSON.stringify(users, null, 2));
        res.json({ message: `Item with ID: ${deleteId} deleted successfully`, remainingItems: users});
})


