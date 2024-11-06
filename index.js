const express = require('express');
const path = require('path');
const userModel = require('./models/user')

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
})


app.get('/delete/:id', async (req, res) => {
    let user = await userModel.findOneAndDelete({ _id: req.params.id })

    res.redirect('/read');
})


app.get('/edit/:id', async (req, res) => {
    let user = await userModel.findById(req.params.id);

    res.render('edit', { user });
})

app.post('/edit/:id', async (req, res) => {
    let { name, email, image } = req.body;

    let user = await userModel.findById(req.params.id);

    name = name || user.name;
    email = email || user.email;
    image = image || user.image;

    await userModel.findByIdAndUpdate(req.params.id, { name, email, image })


    res.redirect('/read');

})



app.get('/read', async (req, res) => {
    const allUsers = await userModel.find();
    res.render('read', { users: allUsers })
})

app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image

    })

    res.redirect('/read');

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})