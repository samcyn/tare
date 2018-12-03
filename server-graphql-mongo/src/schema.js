/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

exports.typeDefs = `
  scalar Date

  type Vote {
    id: ID!
    link: Link!
    user: User!
  }
 
  type Link {
    id: ID!
    createdAt: Date!
    description: String!
    url: String!
    postedBy: User
    votes:[Vote!]
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link!]!
  }

  type Query {
    info: String!
    feed(filter: String, skip: Int, first: Int, orderBy: String): Feed!
  }

  type Feed {
    links: [Link!]!
    count: Int!
  }

  type Mutation {
    #post link
    post(url: String!, description: String!): Link!
    
    # Update a link
    updateLink(id: ID!, url: String, description: String): Link

    # Delete a link
    deleteLink(id: ID!): Link

    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    vote(linkId: ID!): Vote
  }
`;
