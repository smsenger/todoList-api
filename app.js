const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

let todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
    details: 'Do computer things.'
  },

  {
    id: 2,
    todo: 'Market',
    details: 'Advertising!'
  },

  {
    id: 3,
    todo: 'Make money',
    details: 'This is a new thing, but you will like it.'
  },
];


// GET /api/todos
// function todoApi(req, res) {
//   res.send(todoList)
// }
// app.get('/api/todos', todoApi);

//OR:
app.get('/api/todos', (req, res) => {
  res.json(todoList)
})



// GET /api/todos/:id
app.get('/api/todos/:id', (req, res) => {
  const todo = 
  todoList.find((todo) => {                               //find returns only one item, filter returns array of matching items
    return todo.id === Number.parseInt(req.params.id);
  }) || {};                                               //still returns an empty obj if err
  const status = Object.keys(todo).length ? 200 : 404;    //if found, returns 200&all good, if not found, returns error 404(not found)
  res.status(status).json(todo)
});


// POST /api/todos
app.post('/api/todos', (req, res) => {
  //get array of all ids
  //find max
  //add 1
  if(req.body.todo) {
    const maxId = todoList.reduce((max, currentTodo) => {
      if(currentTodo.id > max) {
        max = currentTodo.id;
      }
      return max;
    }, 0);
      const newTodo = {
        id: maxId + 1,
        todo: req.body.todo,       //use body, 2nd option to get new todo text
      }
       todoList.push(newTodo)
       res.json(newTodo);     //respond with thing just created
  } else {
      res.status(400).json({
        error: 'Please provide todo text.'
      })
  };
})



// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
  if(req.body || req.body.todo) {
    let updatedTodo = {};
    todoList.forEach((todo) => {
      if(todo.id === Number.parseInt(req.params.id)) {
        todo.todo = req.body.todo;
        updatedTodo = todo;
      }
    });
    const status = Object.keys(updatedTodo).length ? 200 : 404;
    res.status(status).json(updatedTodo);
  }; if(!req.body || !req.body.todo) {
      res.status(400).json({
        error: 'Please provide todo text.'
      }); return;
    };
  });



// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
  //put unselected items in array
  todoList = todoList.filter((todo) => {                //find returns only one item, filter returns array of matching items
    return todo.id != Number.parseInt(req.params.id)
  });                                             
  res.send('Deleted item')                              //what is send back to user, must have a res
})
  app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
});
