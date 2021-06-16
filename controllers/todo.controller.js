const helperFunction = require('../helpers/method.helper')

// Create function add todo task controller
const addTodoTaskController = (req, res) => {
    let dataInfo = {
        titlePage: 'Add tasks',
        editShow: true,
        head: 'Add new task'
    }
    // req.params.id != 'undefined' ? dataInfo.editShow = false : dataInfo.editShow = true
    console.log(dataInfo)
    setAllData = req.query
    setAllData.status == 'on' ? 
        setAllData.status = 'Task done' :
        setAllData.status = 'Wating'
    setAllData.id = Date.now()
    
    // helperFunction.addTodoTask(req.query)

    if(req.query.title && req.query.content) {
        helperFunction.addTodoTask(setAllData)
        res.redirect('/displayTask')
        
    }
    
    res.render('newTask', {dataInfo}) // erro reload {title page : ''}
}


// Create function to show todo task from json file
const showAllTaskController = (req, res) => {
    let allData =  helperFunction.readDataFromJson()
    let dataInfo = {
        titlePage: 'display tasks',
        todoList: allData,
        checkFound: allData.length != 0 ? true : false
    }

    res.render('display', dataInfo)
}

// Create function to show single task from json file
const showSingleTaskController = (req, res) => {
    let dataInfo = {
        titlePage: 'Show single task',
        status: true
    }
    const id = req.params.id
    const allDtata = helperFunction.readDataFromJson()
    let singleTask = allDtata.find(task => task.id == id)
    singleTask ? dataInfo.myTask = singleTask : dataInfo.status = false
    
    // res.send(`${singleTask.title}`)
    res.render('singleTask', dataInfo)
}

// Create function to edit task
const editTodoTaskController = (req, res) => {
    let dataInfo = {
        titlePage: 'Edit task',
        editShow: true,
        head: 'Edit this task',
        // updateData : null
    }

    const id = req.params.id
    const allData = helperFunction.readDataFromJson()
    let editTask = allData.find(task => task.id == id)
    if(editTask) dataInfo.updateData = editTask
    else dataInfo.editShow = false
    console.log(dataInfo)
    
    dataInfo.updateData.title = req.query.title
    dataInfo.updateData.content = req.query.content
    

    req.query.status == 'on' ? 
        dataInfo.updateData.status = 'Task done' :
        dataInfo.updateData.status = 'Wating'

    console.log(dataInfo.updateData)

    // helperFunction.insertDataInJson(dataInfo.updateData)

    // res.redirect('/displayTask')
    
    res.render('newTask', {dataInfo} )
}

// Create function to delete task
const delTodoTaskController = (req, res) => {
    const id = req.params.id
    const allDtata = helperFunction.readDataFromJson()
    let delTask = allDtata.findIndex(task => task.id == id)
    if (delTask != -1) {
        allDtata.splice(delTask, 1)
        helperFunction.insertDataInJson(allDtata)
    }
    res.redirect('/displayTask')
}

// To export function controller file app
module.exports = {
    addTodoTaskController,
    showAllTaskController,
    editTodoTaskController,
    showSingleTaskController,
    delTodoTaskController
}