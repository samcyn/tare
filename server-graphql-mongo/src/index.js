require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// G R A P H Q L - E X P R E S S - M I D D L E W A R E
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const Link = require('./models/Link');
const Vote = require('./models/Vote');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// C R E A T E - S C H E M A 
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// C O N N E C T - T O - D A T A B A S E
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log('CONNECTED');
}).catch(err => console.log(err));

// I N I T I A L I Z E - A P P L I C A T I O N
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// S E T - U P - M I D D L E W A R E
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  console.log('TOKEN', token);
  next();
});

// create Grahhiql app
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// Connects schema with Graphql
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      Link,
      Vote,
      currentUser,
    },
  })),
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
