import BookDto from '../../entities/BookDto';
import AboutBookDto from '../../entities/AboutBookDto';

const BOOK_SERVICE_URL = 'https://api.itbook.store/1.0/';

export const getBooksByReq = async (
  req: string,
  page?: number,
): Promise<BookDto[] | null> => {
  try {
    const url = `${BOOK_SERVICE_URL}search/${req}?page=${page}`;
    const resJson = await fetch(url);
    const res = await resJson.json();
    return res.books ?? [];
  } catch (err) {
    console.dir(err.message);
    return null;
  }
};

export const getBookById = async (
  isbn13: string,
): Promise<AboutBookDto | null> => {
  try {
    const url = `${BOOK_SERVICE_URL}books/${isbn13}`;
    const resJson = await fetch(url);
    const res = await resJson.json();
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
