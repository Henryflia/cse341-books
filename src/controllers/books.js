import {
    getAllBooks as getAllBooksFromDb,
    getBookById as getBookByIdFromDb,
    createBook as createBookFromDb,
    updateBook as updateBookFromDb,
    deleteBook as deleteBookFromDb,
    authorExists,
} from '../models/books.js';

const getAllBooks = async (req, res) => {
    try {
        const books = await getAllBooksFromDb();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to retrieve books.' });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await getBookByIdFromDb(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to retrieve book.' });
    }
};

const createBook = async (req, res) => {
    try {
        const { id, authorId, title, publicationDate } = req.body;

        if (!id || !authorId || !title || !publicationDate) {
            return res.status(400).json({ message: 'Missing required book fields.' });
        }

        if ([id, authorId, title, publicationDate].some((value) => {return typeof value !== 'string'})) {
            return res.status(400).json({ message: 'Invalid book fields.' });
        }

        const existingBook = await getBookByIdFromDb(id);
        if (existingBook) {
            return res.status(409).json({ message: 'Book id already exists.' });
        }

        if (!(await authorExists(authorId))) {
            return res.status(400).json({ message: 'authorId does not match an existing author.' });
        }

        const createdBook = await createBookFromDb({ id, authorId, title, publicationDate });
        return res.status(201).json(createdBook);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to create book.' });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorId, title, publicationDate } = req.body;

        if (!authorId || !title || !publicationDate) {
            return res.status(400).json({ message: 'Missing required book fields.' });
        }

        if ([authorId, title, publicationDate].some((value) => {return typeof value !== 'string'})) {
            return res.status(400).json({ message: 'Invalid book fields.' });
        }

        const existingBook = await getBookByIdFromDb(id);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        if (!(await authorExists(authorId))) {
            return res.status(400).json({ message: 'authorId does not match an existing author.' });
        }

        const updatedBook = await updateBookFromDb(id, { authorId, title, publicationDate });
        return res.status(200).json(updatedBook);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to update book.' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteBookFromDb(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Unable to delete book.' });
    }
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };