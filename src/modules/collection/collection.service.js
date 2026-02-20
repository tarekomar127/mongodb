import { ObjectId } from 'mongodb'
import {authorModel,authors} from '../../DB/model/index.js'
import {bookModel,books } from '../../DB/model/index.js'
import { logModel,logs } from '../../DB/model/index.js'
// insert one
export const addBook = async (inputs) => {
    const{BookName}=inputs
    const user=await bookModel.insertOne(inputs)
    return user
}
// insertmany

export const addManyBooks = async (inputs) => {
  
  const books = await bookModel.insertMany(inputs);
  return books;
};


export const addauthor = async (inputs) => {
    const{authorName}=inputs
    const user=await authorModel.insertOne(inputs)
    return user
}
export const addlogs = async (inputs) => {
    const{authorName}=inputs
    const user=await logModel.insertOne(inputs)
    return user
}
export const updateBookYear = async (title, newYear) => {

  const result = await bookModel.updateOne(
    { title },            
    { $set: { year: newYear } } 
  );
  return result;
}

export const findBookByTitle = async (title) => {
  const book = await bookModel.findOne({ title }); // findOne native driver
  return book;
}

export const findBooksByYearRange = async (from, to) => {
  
  const books = await bookModel.find({ year: { $gte: parseInt(from), $lte: parseInt(to) } }).toArray(); 
  return books;
};
export const findBooksByGenre = async (genre) => {
  const books = await bookModel.find({ genres: genre }).toArray();

  return books;
};

export const getSkipLimitBooks = async () => {

  const books = await bookModel
    .find({})
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();  

  return books;
};

export const getBooksWithIntegerYear = async () => {

  const books = await bookModel
    .find({ year: { $type: "int" } })   
    .toArray();                         

  return books;
};
export const getBooksExcludeGenres = async () => {

  const books = await bookModel
    .find({
      genres: {
        $nin: ["Horror", "Science Fiction"]
      }
    })
    .toArray();

  return books;
};
export const deleteBooksBeforeYear = async (year) => {

  const result = await bookModel.deleteMany({
    year: { $lt: parseInt(year) }
  });

  return result; 
};
export const aggregateBooksAfter2000 = async () => {
  const books = await bookModel.aggregate([
    { $match: { year: { $gt: 2000 } } }, 
    { $sort: { year: -1 } }              
  ]).toArray();

  return books;
};
export const aggregateBooksAfter2000Project = async () => {
  const books = await bookModel.aggregate([
    { $match: { year: { $gt: 2000 } } },  
    { $project: { 
        _id: 0,                            
        title: 1,
        author: 1,
        year: 1
    } }
  ]).toArray();

  return books;
};
export const aggregateUnwindGenres = async () => {
  const result = await bookModel.aggregate([
    { $unwind: "$genres" }, 
    { $project: {
        _id: 0,             
        title: 1,
        author: 1,
        genre: "$genres"    
    }}
  ]).toArray();

  return result;
};
export const aggregateJoinBooksLogs = async () => {
  const result = await bookModel.aggregate([
    {
      $lookup: {
        from: "logs",           // collection اللي عايزين ن join معاها
        localField: "_id",      // field في books
        foreignField: "book_id",// field في logs
        as: "logs_info"         // الاسم اللي هيظهر للبيانات المدمجة
      }
    },
    { 
      $project: {
        title: 1,
        author: 1,
        year: 1,
        logs_info: 1
      }
    }
  ]).toArray();

  return result;
};