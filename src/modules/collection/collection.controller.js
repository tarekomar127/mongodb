
import { Router } from "express";
import { addauthor, addBook,aggregateUnwindGenres , aggregateJoinBooksLogs,addlogs,addManyBooks,updateBookYear,aggregateBooksAfter2000Project,getBooksExcludeGenres,findBookByTitle,findBooksByYearRange,findBooksByGenre,getSkipLimitBooks,getBooksWithIntegerYear,deleteBooksBeforeYear,aggregateBooksAfter2000} from "./collection.service.js";
const router = Router();
// add
router.post("/books", async (req, res, next) => {
    try {
        const result = await addBook(req.body)
        return res.status(201).json({  message: "Done add",  result,  ok: 1,insertedId: result._id   })
    } catch (err) {
        next(err)
    }
})

router.post("/books/batch", async (req, res, next) => {
  try {
    const result = await addManyBooks(req.body); 

    return res.status(201).json({
      acknowledged: result.acknowledged,
      insertedIds: result.insertedIds
    });
  } catch (err) {
    next(err);
  }
});




router.post("/authors", async (req, res, next) => {
  try {
    const result = await addauthor(req.body);  
    return res.status(201).json({
    //   acknowledged: true,
       message: "Done add",
         result,
      insertedId: result._id
    });
  } catch (err) {
    next(err);
  }
});


// ------------

router.post("/logs/capped", async (req, res, next) => {
  try {
    return res.status(201).json({acknowledged: true,message: "Capped collection 'logs' created with size 1MB", ok: 1 });
  } catch (err) {
    next(err);
  }
});


router.post("/logs", async (req, res, next) => {
  try {
    const result = await addlogs(req.body);

    return res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId
    });
  } catch (err) {
    next(err);
  }
});
router.patch("/books/:title", async (req, res, next) => {
  try {
    const { title } = req.params;
    const { year } = req.body; 

    const result = await updateBookYear(title, year);

    return res.status(200).json({
      acknowledged: result.acknowledged,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    next(err);
  }
});
router.get("/books/title", async (req, res, next) => {
  try {
    const { title } = req.query; 
    const book = await findBookByTitle(title);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});




router.get("/books/year", async (req, res, next) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "from and to query parameters are required" });
    }

    const books = await findBooksByYearRange(from, to);

    return res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});

router.get("/books/genre", async (req, res, next) => {
  try {
    const { genre } = req.query;

    if (!genre) {
      return res.status(400).json({ message: "genre query parameter is required" });
    }

    const books = await findBooksByGenre(genre);
           res.status(200).json(books);
  } 
  catch (err) {
    next(err);
  }
});
// GET /books/skip-limit
router.get("/books/skip-limit", async (req, res, next) => {
  try {
    const books = await getSkipLimitBooks();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});

router.get("/books/year-integer", async (req, res, next) => {
  try {

    const books = await getBooksWithIntegerYear();

    res.status(200).json(books);

  } catch (err) {
    next(err);
  }
})
router.get("/books/exclude-genres", async (req, res, next) => {
  try {

    const books = await getBooksExcludeGenres();

    res.status(200).json(books);

  } catch (err) {
    next(err);
  }
});

router.delete("/books/before-year", async (req, res, next) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({ message: "year query parameter is required" });
    }

    const result = await deleteBooksBeforeYear(year);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/books/aggregate1", async (req, res, next) => {
  try {
    const books = await aggregateBooksAfter2000();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});
router.get("/books/aggregate2", async (req, res, next) => {
  try {
    const books = await aggregateBooksAfter2000Project();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});

router.get("/books/aggregate3", async (req, res, next) => {
  try {
    const books = await aggregateUnwindGenres();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});
router.get("/books/aggregate4", async (req, res, next) => {
  try {
    const result = await aggregateJoinBooksLogs();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
export default router; 
