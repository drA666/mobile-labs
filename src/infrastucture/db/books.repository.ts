import {connect} from './connection';
import BookDto from '../../entities/BookDto';
import AboutBookDto from '../../entities/AboutBookDto';

export const getBooksBySearchString = async (
  searchString: string,
): Promise<BookDto[] | null> => {
  try {
    const connection = await connect();
    const sql = `
        SELECT
            book_title, 
            book_subtitle,
            book_price,
            book_image,
            book_isbn13
        FROM books
        WHERE INSTR(book_title, $1) OR INSTR(lower(book_subtitle), lower($1))`;
    const results = await connection.executeSql(sql, [searchString]);
    const books: BookDto[] = [];
    const {
      rows: {length, item},
    } = results[0];
    for (let i = 0; i < length; i++) {
      const {
        book_title,
        book_subtitle,
        book_price,
        book_image,
        book_isbn13,
      } = item(i);
      books.push(
        new BookDto(
          book_title,
          book_subtitle,
          book_isbn13,
          book_price,
          book_image,
        ),
      );
    }
    return books;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const saveBook = async (bookDto: BookDto): Promise<boolean> => {
  try {
    const connection = await connect();
    const sql = `
            INSERT OR REPLACE
            INTO books (
                book_title, 
                book_subtitle,
                book_price,
                book_image,
                book_isbn13
            ) VALUES ($1, $2, $3, $4, $5)
        `;
    const {title, subtitle, price, image, isbn13} = bookDto;
    const result = await connection.executeSql(sql, [
      title,
      subtitle,
      price,
      image,
      isbn13,
    ]);
    const {rowsAffected} = result[0];
    return !!rowsAffected;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const saveAboutBook = async (
  aboutBookDto: AboutBookDto,
): Promise<boolean> => {
  try {
    const {
      authors,
      desc,
      image,
      isbn13,
      language,
      pages,
      price,
      publisher,
      rating,
      subtitle,
      title,
      year,
    } = aboutBookDto;
    const sql = `
            INSERT OR REPLACE
            INTO books (
                book_title, 
                book_subtitle,
                book_price,
                book_image,
                book_isbn13,
                book_authors,
                book_desc,
                book_language,
                book_pages,
                book_publisher,
                book_rating,
                book_year
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `;
    const params = [
      title,
      subtitle,
      price,
      image,
      isbn13,
      authors,
      desc,
      language,
      pages,
      publisher,
      rating,
      year,
    ];
    const connection = await connect();
    const result = await connection.executeSql(sql, params);
    const {rowsAffected} = result[0];
    return !!rowsAffected;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAboutBookByIsbn13 = async (
  isbn13: string,
): Promise<AboutBookDto | null> => {
  try {
    const connection = await connect();
    const sql = `
            SELECT
                *
            FROM books
            WHERE book_isbn13 = $1
        `;
    const result = await connection.executeSql(sql, [isbn13]);
    const books: AboutBookDto[] = [];
    const {
      rows: {length, item},
    } = result[0];
    for (let i = 0; i < length; i++) {
      const {
        book_title,
        book_subtitle,
        book_price,
        book_image,
        book_isbn13,
        book_authors,
        book_desc,
        book_language,
        book_pages,
        book_publisher,
        book_rating,
        book_year,
      } = item(i);
      books.push(
        new AboutBookDto(
          book_authors,
          book_desc,
          book_image,
          book_isbn13,
          book_language,
          book_pages,
          book_price,
          book_publisher,
          book_rating,
          book_subtitle,
          book_title,
          book_year,
        ),
      );
    }
    return books[0] ?? new AboutBookDto();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
