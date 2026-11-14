import express from "express";
import { getBooksHandler, getBookByIdHandler } from "./controllers/books.js";
import {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} from './controllers/authors.js';


const router = express.Router();




/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "b1"
 *         author:
 *           type: string
 *           example: "Maya Rivera"
 *         title:
 *           type: string
 *           example: "Patterns of Light"
 *         publicationDate:
 *           type: string
 *           format: date
 *           example: "2021-08-17"
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Book not found"
 */

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     description: Returns a list of all books.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/books", getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a book by ID
 *     description: Returns a single book that matches the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the book.
 *         schema:
 *           type: string
 *           example: "b1"
 *     responses:
 *       200:
 *         description: The requested book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */
router.get('/authors', getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the author.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested author
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to retrieve the author

 */
router.get("/authors/:id", getAuthorById);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create an author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *           example:
 *             id: a4
 *             name: Example Author Name
 *             birthYear: 1980
 *     responses:
 *       201:
 *         description: The created author
 *       400:
 *         description: A field is missing, unknown, or invalid, or the id already exists
 *       500:
 *         description: Unable to create the author
 */
router.post("/authors", createAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the author
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *           example:
 *             name: "Updated Author Name"
 *             birthYear: 1981
 *     responses:
 *       200:
 *         description: The updated author
 *       400:
 *         description: A field is missing, unknown, or invalid
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update the author
 */
router.put("/authors/:id", updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the author.
 *         schema:
 *           type: string
 *           example: "a1"
 *     responses:
 *       204:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author cannot be deleted because they still have books
 *       500:
 *         description: Unable to delete author
 */
router.delete("/authors/:id", deleteAuthor);

export default router;

