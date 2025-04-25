const request = require('supertest');
const app = require('../index'); // import aplikacji
const fs = require('fs');
const path = './todos.json';


// czyszczenie pliku todos.json przy każdym starcie testów 
// beforeEach(() => {
//   fs.writeFileSync(path, JSON.stringify([])); // Resetuj dane przed każdym testem
// });

// test na sprawdzenie pustej listy
// describe('GET /todos', () => {
//   it('should return an array before adding todo', async () => {
//     const response = await request(app).get('/todos');
    
//     expect(response.status).toBe(200);       // oczekujemy kodu 200 OK
//     expect(response.body).toEqual([]);       // oczekujemy pustej tablicy
//   });
// });

// dodanie nowego todo
describe('POST /todos', () => {
    it('Should add new todo', async () => {
        const newTodo = { title: 'Learn'};
        const add = await request(app)
        .post('/todos')
        .send(newTodo);
        
        expect(add.status).toBe(201);
        expect(add.body).toHaveProperty('id');
        expect(add.body).toHaveProperty('title', 'Learn');
        expect(add.body.completed).toBe(false);

    });
});

// zwrócenie wszystkich todo
describe('GET /todos', () => {
    it('should return todos', async () => {
      const response = await request(app).get('/todos');
      
      expect(response.status).toBe(200);

      // Sprawdzamy, czy odpowiedź zawiera listę zadań
      expect(response.body).toBeInstanceOf(Array);  // Oczekujemy, że odpowiedź to tablica
      expect(response.body.length).toBeGreaterThan(0);

    });
  });
  
// zmiana tytułu todo o id = 2
describe('PATCH /todos/:id', () => {
    it('should change todo with id = 2', async () => {
        const changeToDo = await request(app)
        .patch('/todos/2')
        .send({ title: 'Refactored Title'});

        expect(changeToDo.status).toBe(200);
        expect(changeToDo.body).toHaveProperty('id', 2);
        expect(changeToDo.body).toHaveProperty('title', 'Refactored Title');


    });
});

//usuwanie todo o losowym numerze Id
describe('DELETE /todos/:id', () => {
  it('should delete todo with random ID', async () => {
    const allTodos = await request(app).get('/todos');
    const todosArray = allTodos.body;
    const randomIndex = Math.floor(Math.random() * todosArray.length);
    const randomId = todosArray[randomIndex].id;

    const toDelete = await request(app).delete(`/todos/${randomId}`);
    expect(toDelete.status).toBe(200);

    const checkDeleted = await request(app).get(`/todos/${randomId}`);
    expect(checkDeleted.status).toBe(404);

  });
});


//zmiana statusu todo 
describe('PUT /todos/:id', () => {
  it('should change completed status', async () => {
    const allTodos = await request(app).get('/todos');
    const todosArray = allTodos.body;
    const randomIndex = Math.floor(Math.random() * todosArray.length);
    const randomId = todosArray[randomIndex].id;

    const statusChange = await request(app)
    .put(`/todos/${randomId}`)
    .send({ completed: true });

    expect(statusChange.status).toBe(200);

    const updatedTodos = await request(app).get('/todos');
    const updatedTodo = updatedTodos.body.find(todo => todo.id === randomId);

    expect(updatedTodo.completed).toBe(true);
  });
});

