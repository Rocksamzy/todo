const http = require('http');
const url = require('url');
const fs = require('fs');

// Array to store todos
let todos = [];

// Function to handle requests
const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.pathname;

    // Read all todos
    if (path === '/todos' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    }

    // Read one todo
    else if (path.startsWith('/todos/') && req.method === 'GET') {
        const id = parseInt(path.substring(7));
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(todo));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Todo not found');
        }
    }

    // Delete one todo
    else if (path.startsWith('/todos/') && req.method === 'DELETE') {
        const id = parseInt(path.substring(7));
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Todo deleted successfully');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Todo not found');
        }
    }

    // Method not allowed
    else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log('Server is running on port');
});