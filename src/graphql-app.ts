import { ApolloServer, gql } from "apollo-server-express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { User } from "./entity/User";

export const resolvers = {
    Query: {
        user: async (_: any, args: any) => {
            const { id } = args;
            return await User.findOne({ where: { id: id } });
        },
        users: async (_: any, args: any) => {
            return await User.find();
        }
    },
    Mutation: {
        addUser: async (_: any, args: any) => {
            const { firstName, lastName, username } = args;
            try {
                const user = User.create({
                    firstName,
                    lastName,
                    username
                });
                await user.save();
                return user.id;
            } catch (error) {
                return false;
            }
        }
    }
};

export const typeDefs = gql`
  type Query {
    users: [User]!
    user(id: String!): User
  }
  
  type Mutation {
    addUser(firstName: String!, lastName: String, username: String): String!
  }
  type User {
    id: String!
    firstName: String!
    lastName: String!
    username: String!
  }`;

const startServer = async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start()
    await createConnection();

    const app = express();

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();