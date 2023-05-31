const express = require('express');
const cors = require('cors');

const PORT = 5000;
const app = express();

app.use(express.static('Public'));

app.use(express.json());
app.use(cors());

// const { usersRoute, postsRoute, authRoute } = require('./routers');

// app.use('/users', usersRoute);
// app.use('/posts', postsRoute);
// app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
