// Call module express
const express = require('express')

// Call module hbs
const hbs = require('hbs')

// Call module path 
const path = require('path')

// Call module from file todocontroller
const todoController = require('../controllers/todo.controller')

// Used module express
const appEx = express()

// Set module hbs by express
appEx.set('view engine', 'hbs')

// Handler directory files
const frontDir = path.join(__dirname, '../frontend')
const veiwsDir = path.join(__dirname, '../resources/viewes')
const layoutDir = path.join(__dirname, '../resources/layouts')

// Set and use directory
appEx.use(express.static(frontDir))
appEx.set('views', veiwsDir)
// to collection files hbs
hbs.registerPartials(layoutDir)

// Routes file to views
appEx.get('/', (req, res) => {
    someInfo = {
        titlePage: 'Home page',
    }
    res.render('index', someInfo)
})

appEx.get('/addTask', todoController.addTodoTaskController)

appEx.get('/displayTask', todoController.showAllTaskController)

appEx.get('/editTask/:id', todoController.editTodoTaskController)
appEx.get('/singleTask/:id', todoController.showSingleTaskController)
appEx.get('/delTask/:id', todoController.delTodoTaskController)

appEx.get('*', (req, res) => {
    
    res.render('404')
})

// Created module to call any file
module.exports = appEx // {} error
