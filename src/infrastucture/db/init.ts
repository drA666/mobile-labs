import {connect} from './connection';

const booksSql =
  'CREATE TABLE IF NOT EXISTS "books"( "book_id" INTEGER, "book_title" TEXT NOT NULL, "book_subtitle" TEXT NOT NULL, "book_price" TEXT NOT NULL, "book_image" TEXT NOT NULL, "book_isbn13" TEXT NOT NULL UNIQUE, "book_author" TEXT, "book_desc" TEXT, "book_language" TEXT, "book_pages" TEXT, "book_publisher" TEXT, "book_rating" TEXT, "book_authors" TEXT, "book_year" TEXT, PRIMARY KEY("book_id" AUTOINCREMENT))';

const initDatabase = async () => {
  try {
    const connection = await connect();
    await connection.executeSql(booksSql);
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default initDatabase;
