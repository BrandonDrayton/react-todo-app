const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const models = require('./models')

const todosRouter = require('./routes/todos');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: models.sequelize })
app.use(
    session({
        secret: 'pancakes',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
store.sync();

// load react project from client/build folder
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/v1/todos', todosRouter);
app.use('/api/v1/users', usersRouter);

// redirect all other requests to react router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

module.exports = app;