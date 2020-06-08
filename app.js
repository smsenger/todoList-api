const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
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


// GET /api/todo
// function todoApi(req, res) {
//   res.send(todoList)
// }
// app.get('/api/todo', todoApi);

//OR:
app.get('/api/todo', (req, res) => {
  res.json(todoList)
})



// GET
app.get('/api/todo/:id', (req, res) => {
  const todo =
    todoList.find((todo) => {                               //find returns only one item, filter returns array of matching items
      return todo.id === Number.parseInt(req.params.id);
    }) || {};                                               //still returns an empty obj if err
  const status = Object.keys(todo).length ? 200 : 404;    //if found, returns 200&all good, if not found, returns error 404(not found)
  res.status(status).json(todo)
});


// POST
app.post('/api/todo', (req, res) => {
  //get array of all ids
  //find max
  //add 1
  if (req.body.todo) {
    const maxId = todoList.reduce((max, currentTodo) => {
      if (currentTodo.id > max) {
        max = currentTodo.id;
      }
      console.log('poooooooooooooooooooooooooooooooost')
      return max;
    }, 0);
    const newTodo = {
      id: maxId + 1,
      todo: req.body.todo,       //use body, 2nd option to get new todo text
    }
    todoList.push(newTodo)
    if (req.query.form) {
      res.redirect('/');
    } else {
      res.json(newTodo);     //respond with thing just created
    }
  } else {
    res.status(400).json({
      error: 'Please provide todo text in input field.'
    })
  };
})

app.put('/api/detail/:id', (req, res) => {
  if (req.body || req.body.details) {
    let updatedDetails = {};
    todoList.forEach((todo) => {
      if (todo.id === Number.parseInt(req.params.id)) {
        todo.details = req.body.details;
        updatedDetails = details;
      }
    });
    const status = Object.keys(updatedDetails).length ? 200 : 404;
    if (req.query.form) {
      res.redirect('/');
    } else {
      res.status(status).json(updatedDetails)
    }
  }; if (!req.body || !req.body.details) {
    res.status(400).json({
      error: 'Please provide detail text.'
    }); return;
  };
});

// PUT /api/todo/:id
app.put('/api/todo/:id', (req, res) => {
  if (req.body || req.body.todo) {
    let updatedTodo = {};
    todoList.forEach((todo) => {
      if (todo.id === Number.parseInt(req.params.id)) {
        todo.todo = req.body.todo;
        updatedTodo = todo;
      }
    });
    const status = Object.keys(updatedTodo).length ? 200 : 404;
    if (req.query.form) {
      res.redirect('/');
    } else {
      res.status(status).json(updatedTodo)
    }
  }; if (!req.body || !req.body.todo) {
    res.status(400).json({
      error: 'Please provide todo text.'
    }); return;
  };
});



// DELETE
app.delete('/api/todo/:id', (req, res) => {
  //put unselected items in array
  todoList = todoList.filter((todo) => {                //find returns only one item, filter returns array of matching items
    return todo.id != Number.parseInt(req.params.id)
  });
  if (req.query.form) {
    res.redirect('/');
  } else {
    res.json(todo);
  }
  res.send('Deleted item')                              //what is send back to user, must have a res
})

app.listen(8001, function () {
  console.log('Todo List API is now listening on port 8000...');
});
