exports.typeDefs = `
  type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

  type Token {
    token: String!
  }

  type Query {
    getAllRecipes: [Recipe]
    getRecipe(_id: ID!) : Recipe
    searchRecipes (searchTerm: String) : [Recipe]
    getCurrentUser: User
    getUserRecipes(username: String!): [Recipe] 
  }

  type Mutation {

    addRecipe(name: String!, description: String!, category: String!, instructions: String!, username: String ): Recipe

    signinUser(username:String!, password: String!): Token

    signupUser(username: String!, email: String!, password: String!): Token

    deleteUserRecipe (_id: ID!) : Recipe
    likeRecipe (_id: ID!, username: String!): Recipe 
    unLikeRecipe (_id: ID!, username: String!): Recipe 

  }
`;
