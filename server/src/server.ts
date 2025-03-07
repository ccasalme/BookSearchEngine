import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authMiddleware } from './services/auth.js';
import type { JwtPayload } from 'jsonwebtoken';
import type { ExpressContextFunctionArgument } from '@apollo/server/express4';
import type { Request } from 'express';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log("🌿 MongoDB connected successfully!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Set up Apollo Server with authentication
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }: ExpressContextFunctionArgument): Promise<{ user: JwtPayload | null }> => {
      return authMiddleware({ req: req as Request }); // ✅ Force TypeScript to treat it as an Express request
    },
  }));

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
