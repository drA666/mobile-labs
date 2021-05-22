import {getBookById, getBooksByReq} from '../infrastructure/api/books.api';
import {
  getAboutBookByIsbn13,
  getBooksBySearchString,
  saveAboutBook,
  saveBook,
} from '../infrastructure/db/books.repository';
import BookDto from '../entities/BookDto';
import AboutBookDto from '../entities/AboutBookDto';

export const getBooks = async (
  searchStr: string,
  page?: number,
): Promise<BookDto[] | null> => {
  try {
    const books = await getBooksByReq(searchStr, page ?? 1);
    if (!books) {
      const cacheBooks = await getBooksBySearchString(searchStr);
      return cacheBooks;
    }
    await Promise.all(books.map((book) => saveBook(book)));
    return books;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getBookByIsbn13 = async (
  isbn13: string,
): Promise<AboutBookDto | null> => {
  try {
    const book = await getBookById(isbn13);
    if (!book) {
      const cacheBook = getAboutBookByIsbn13(isbn13);
      return cacheBook;
    }
    await saveAboutBook(book);
    return book;
  } catch (err) {
    console.log(err);
    return null;
  }
};
