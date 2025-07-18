// MongoDB initialization script
db = db.getSiblingDB('librarydb');

// Create a user for the library service
db.createUser({
  user: 'libraryuser',
  pwd: 'librarypass',
  roles: [
    {
      role: 'readWrite',
      db: 'librarydb'
    }
  ]
});

// Create collections with some initial data
db.createCollection('books');
db.createCollection('loans');

// Insert sample data
db.loans.insertMany([
  {
     bookId: ObjectId("685bdb1f7509c0d090db7c6c"),
     userEmail: "doniagharbi141@gmail.com",
     loanDate: ISODate("2025-06-25T23:00:00.000Z"),
     dueDate: ISODate("2025-07-09T23:00:00.000Z"),
     returned: true,
     _class: "com.library.library.Loan.Loan"
   },
   {
     bookId: ObjectId("685bdb1f7509c0d090db7c6c"),
     userEmail: "doniagharbi141@gmail.com",
     loanDate: ISODate("2025-07-15T00:00:00.000Z"),
     dueDate: ISODate("2025-07-29T00:00:00.000Z"),
     returned: false,
     _class: "com.library.library.Loan.Loan"
   },
   {
     bookId: ObjectId("685bdb1f7509c0d090db7c6c"),
     userEmail: "doniagharbi141@gmail.com",
     loanDate: ISODate("2025-07-14T23:00:00.000Z"),
     dueDate: ISODate("2025-07-28T23:00:00.000Z"),
     returned: false,
     _class: "com.library.library.Loan.Loan"
   }
]);

db.books.insertMany([
  {
    _id : ObjectId("685aaacc5d0237087fd88e1f"),
    title: "Story of little Frog",
    quantity: 9,
    author: "Antoine de Saint-Exupéry",
    category: "Children",
    available: true,
    _class:  "com.library.library.book.Book"
  },
  {
    _id : ObjectId("685bdb1f7509c0d090db76c6"),
    title: "Story of little Frog",
    quantity: 0,
    author: "Antoine de Saint-Exupéry",
    category: "Children",
    available: false,
    _class:  "com.library.library.book.Book"
  },
  {
    _id : ObjectId("685bdb337509c0d090db76c7"),
    title: "Math Magic",
    quantity: 0,
    author: "Antoine de Saint-Exupéry",
    category: "Children",
    available: false,
    _class:  "com.library.library.book.Book"
  },
  {
    _id : ObjectId("685bdb417509c0d090db76c8"),
    title: "Care Your Trees",
    quantity: 2,
    author: "Antoine de Saint-Exupéry",
    category: "Children",
    available: true,
    _class:  "com.library.library.book.Book"
  }
])



print("Database initialized successfully!");