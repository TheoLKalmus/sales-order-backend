using { my.bookshop as my } from '../db/data-model';

service SalesService {
  entity Books as projection on my.Books;
}