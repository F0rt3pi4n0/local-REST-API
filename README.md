# local-REST-API
Simple ToDo API Application

The application is used for:
- fetching all tasks,
- fetching a specific task by ID,
- adding, deleting, or editing tasks,
- changing task status.

Technologies and tools used in the application:

- Node.js – environment for running the application outside the browser,

- Express.js – framework for building backend APIs in Node.js,

- REST API – communication interface based on HTTP methods:
    - GET,
    - POST,
    - PUT,
    - DELETE.
- Supertest – library for testing HTTP endpoints,
- Jest – framework for writing JavaScript tests,
- JSON as a database – data is stored and updated in a JSON file.

Structure of operation:
- Data is stored in a local .json file,
- The Express server provides an API that modifies this data,
- Tests verify the correctness of the API’s functionality.

Tests cover:
- correctness of endpoint behavior,
- proper status codes (200, 204, 404, etc.),
- presence of applied changes,
- presence of expected changes.

