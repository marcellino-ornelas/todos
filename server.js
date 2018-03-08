// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   var search = req.query.q
   console.log(search)

   var queue = todos.filter(function(todo){

    return (todo.description.indexOf(search) >= 0) || (todo.task.indexOf(search) >= 0)
   })

   res.json({data:queue})

});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({data: todos})
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var data = { _id: (todos[todos.length - 1]._id + 1), task: req.body.task , description: req.body.description}

   todos.push(data);
   res.json(data)

});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */

  for(var i = 0; i < todos.length; i++){
    var curr = todos[i];
    if(curr._id === parseInt(req.params.id) ){
      return res.json(curr)
    }
  }

});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
  var data = req.body
  var id = parseInt(req.params.id)

  for(var i = 0; i < todos.length; i++){
    var curr = todos[i];

    if(curr._id === id){
      curr.task = data.task || curr.task
      curr.description = data.description || curr.description
      return res.json(curr)
    }
  }

});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
  var id = parseInt(req.params.id)

  for(var i = 0; i < todos.length; i++){
    var curr = todos[i];

    if(curr._id === id){
      todos.splice(i,1)
      res.json(todos)
    }
  }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
