/***
 * Title : Application variables.
 * Author : Atik Ullah Khan.
 * Description : All the environmnet variables of the application.
 * Date : 14/08/2023.
 ***/

const variables = {
  port: process.env.PORT,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

module.exports = variables;
