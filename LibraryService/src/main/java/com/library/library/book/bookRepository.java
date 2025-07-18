package com.library.library.book;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface bookRepository  extends MongoRepository<Book, String> {
}
