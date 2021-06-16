// Call module built in file system
const fileSys = require('fs')

// Create function to read data from json file
const readDataFromJson = () => {
    try {
        data = JSON.parse(fileSys.readFileSync('jsonData/todoTask.json').toString())
    }
    catch(ex) {
        data = []
    }
    return data
}

// Create function to write(insert) data from json file
const insertDataInJson = (taskList) => {
    try {
        fileSys.writeFileSync('jsonData/todoTask.json', JSON.stringify(taskList))
    }
    catch(ex) {
        fileSys.writeFileSync('jsonData/todoTask.json', '[]')
    }
}

// Create function to add todoTask in file json
const addTodoTask = (task) => {
    //- get function read and store in var
    getAllData = readDataFromJson()
    try {
        
        //- used this var and push argument function
        getAllData.push(task)
        //- update data by used function isertData after push
        insertDataInJson(getAllData)
        result = {
            status: true
        }
    }
    
    catch(ex) {
        result = {
            status: false,
            error: ex.message // require to show erro writ .message
        }
       
    }
    return result
}


module.exports = {
    addTodoTask,
    readDataFromJson,
    insertDataInJson
}