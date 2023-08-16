/***
 * Title : Query Builder.
 * Author : Atik Ullah Khan.
 * Description : Helper function to build query.
 * Date : 15/08/2023.
 ***/

const queryBuilder = (collectionId, author, name) => {
  let query = `
      SELECT DISTINCT b.book_id, b.name, b.author, b.price FROM books AS b
  `;

  if (collectionId) {
    query += `
        LEFT JOIN book_collections AS bc ON b.book_id = bc.book_id
        LEFT JOIN collections AS c ON bc.collection_id = c.collection_id
        WHERE c.collection_id = ?
    `;
  }

  if (author || name) {
    query += collectionId ? " AND" : " WHERE";

    if (author) {
      query += " b.author LIKE ?";
      if (name) {
        query += " AND";
      }
    }
    if (name) {
      query += " b.name LIKE ?";
    }
  }

  return query;
};

module.exports = queryBuilder;
