## To-do app 
Link to the app: https://tamk-4a00ez62-3001-group07.herokuapp.com/  
Tech: Node.js, Express, React, MySQL, CSS  
In this to-do app you can create a new list of tasks from the lower left corner.
![alt text](https://i.imgur.com/7ZVw8Yp.png)  
You can add a task from the lower right corner. In the add task form you can give a name for the task, select a day and time for deadline, write a description, select a priority and a list you want to put the task in (you dont have to select a list)
![alt text](https://i.imgur.com/uMykJfi.png)  
From adjust icon you can choose how to sort the tasks and select a list. You can also search tasks from search bar and mark tasks done/undone by pressing the checkmark button. Deleting tasks is possible aswell from the trash can button.
![alt text](https://i.imgur.com/fJng8RA.png)

Example of API curl calls.
### 
// In sort param you can use "-" for DESC and "+" for ASC and name, deadline, is_done // and priority for what to sort with.
// You can also use query params list={id}, limit and offset.

GET https://tamk-4a00ez62-3001-group07.herokuapp.com/api/tasks?apikey=&sort=-deadline&list=29&limit=1&offset=1  

### 
// You can also search tasks with search query params.

GET https://tamk-4a00ez62-3001-group07.herokuapp.com/api/tasks?apikey=&sort=-deadline&list=29&limit=1&search=banaania  

### 
// View lists.

GET https://tamk-4a00ez62-3001-group07.herokuapp.com/api/lists?apikey=  

### 
// View specific list.

GET https://tamk-4a00ez62-3001-group07.herokuapp.com/api/lists/29?apikey=  

### 
// View specific task.

GET https://tamk-4a00ez62-3001-group07.herokuapp.com/api/tasks/233?apikey=  

### 
// Post a new task.

POST https://tamk-4a00ez62-3001-group07.herokuapp.com/api/tasks?apikey=  
Content-Type: application/json
{ "user_id": 1,
"name": "tee jotain",
"description": "jotain",
"priority": 1,
"deadline": "2021-01-04 10:49:49",
"list_id": null 
} 

### 
// Delete task.

DELETE https://tamk-4a00ez62-3001-group07.herokuapp.com/api/tasks/236?apikey=  

###
// Add a new list.

POST https://tamk-4a00ez62-3001-group07.herokuapp.com/api/lists?apikey=  
Content-Type: application/json
{
    "list_name": "uusi lista"
}

###
// Delete list.

DELETE https://tamk-4a00ez62-3001-group07.herokuapp.com/api/lists/31?apikey=  

###
// Check task done/undone.
POST https://tamk-4a00ez62-3001-group07.herokuapp.com/api/tasks/check/233?apikey=  
###
