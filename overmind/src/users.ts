import "graphql-import-node";

import * as typeDefs from "./schema/users.graphql";
const { User } = require("./models");
import { makeExecutableSchema } from "graphql-tools";

export class Users {
  genId() {
    const min = Math.ceil(100000);
    const max = Math.floor(2147483646);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  buildSchema = () => {
    const resolvers = {
      Query: {
        users_list: async () => await User.findAll(),
      },

      // Mutation: { },
      // Subscription: { }
    };

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    return schema;
  };
}

const users = new Users();
export default users;
