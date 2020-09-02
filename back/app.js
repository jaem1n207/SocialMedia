const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello api');
});

/* loadPostAPI */
app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

/* addPostAPI */
app.post('/api/post', (req, res) => {
  res.json({ id: 1, content: 'hello' });
});

/* removePostAPI */
app.delete('/api/post', (req, res) => {
  res.json({ id: 1 });
});

app.listen(8000, () => {
  console.log('서버 실행 중');
});
