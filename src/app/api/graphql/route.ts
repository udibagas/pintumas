import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  origin: "*", // Adjust this for production
  methods: ["GET", "POST", "OPTIONS"],
});

// Helper to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

// Type definitions and resolvers
const typeDefs = `#graphql
  type Query {
    hello: String
    users: [User!]!
    user(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from Apollo Server with App Router!",
    users: () => [
      { id: "1", name: "John Doe", email: "john@example.com" },
      { id: "2", name: "Jane Smith", email: "jane@example.com" },
    ],
    user: () => {
      return { id: "1", name: "John Doe", email: "john@mail.com" };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => ({ req }),
});

export async function POST(req: NextRequest) {
  // Handle CORS
  const res = new Response();
  await runMiddleware(req, res, cors);

  return handler(req);
}

export async function GET(req: NextRequest) {
  // Handle CORS
  const res = new Response();
  await runMiddleware(req, res, cors);

  return handler(req);
}
