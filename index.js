const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware do parsowania JSON

const path = './todos.json';  // Ścieżka do pliku JSON z zadaniu

app.get('/', (req, res) => {
  res.send('Witaj w aplikacji To-Do!');
});


// Ładowanie zadań z pliku JSON
let todos = [];
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify([])); // nowy plik, jeśli nie istnieje
} 
else {
  const data = fs.readFileSync(path);
  todos = JSON.parse(data);  // Wczytanie danych z pliku
}

// Endpoint do pobierania zadań
app.get('/todos', (req, res) => {
  res.status(200).json(todos);  // Zwrócenie tablicy zadań
});

// Endpoint do dodawania nowych zadań
app.post('/todos', (req, res) => {
  try {
    const newTodo = {
      id: todos.length + 1,  // Generowanie ID na podstawie długości tablicy
      title: req.body.title,
      completed: false
    };
    todos.push(newTodo);  // Dodanie nowego zadania do tablicy

    // Zapisanie tablicy do pliku JSON
    fs.writeFileSync(path, JSON.stringify(todos, null, 2));
    res.status(201).json(newTodo);  // Zwrócenie odpowiedzi z nowym zadaniem
  } catch (error) {
    console.error("Błąd zapisu do pliku:", error);
    res.status(500).json({ message: "Problem z zapisem danych. Spróbuj ponownie później." });
  }
});

// Endpoint do modyfikacji tytułu
app.patch('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  todo.title = req.body.title || todo.title;
  fs.writeFileSync(path, JSON.stringify(todos, null, 2));
  res.status(200).json(todo);
});

// Endpoint do usuwania wpisu
app.delete('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  const index = todos.findIndex(todo => todo.id === id);
  todos.splice(index, 1);
  fs.writeFileSync(path, JSON.stringify(todos, null, 2));
  res.status(200).json('Todo deleted successfully');
});

//Endpoint do zmiany statusu completed
app.put('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }
  fs.writeFileSync(path, JSON.stringify(todos, null, 2));
  res.status(200).json({ message: 'Todo s status changed'});
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


module.exports = app;