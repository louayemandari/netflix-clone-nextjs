const app = require('./app');

const port = 3001;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
