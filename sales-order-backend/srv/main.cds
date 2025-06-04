using { sales } from '../db/schema';

@requires: 'authenticated-user'
service MainService {
    @cds.persistence.table
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
    @cds.persistence.table
    entity Customers as projection on sales.Customers;
    @cds.persistence.table
    entity Products as projection on sales.Products;
    @cds.persistence.table
    entity SalesOrderLogs as projection on sales.SalesOrderLogs;
}