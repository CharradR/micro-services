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
db.createCollection('authors');
db.createCollection('categories');

// Insert sample data
db.books.insertMany([
  {
    title: "Spring Boot in Action",
    author: "Craig Walls",
    isbn: "978-1617292545",
    category: "Programming",
    publishedDate: new Date("2015-12-06"),
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Microservices Patterns",
    author: "Chris Richardson",
    isbn: "978-1617294549",
    category: "Architecture",
    publishedDate: new Date("2018-10-30"),
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

db.authors.insertMany([
  {
    name: "Craig Walls",
    bio: "Software developer and author",
    birthDate: new Date("1970-01-01"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Chris Richardson",
    bio: "Microservices expert and consultant",
    birthDate: new Date("1965-01-01"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

db.categories.insertMany([
  {
    name: "Programming",
    description: "Programming and software development books",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Architecture",
    description: "Software architecture and design books",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print("Database initialized successfully!");
