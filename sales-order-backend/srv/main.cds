using { sales } from '../db/schema';
 
namespace sales;

@requires: 'authenticated-user'

service MainService {   
    @restrict: [
        {
            grant: 'READ',
            to: 'read_only_user'
        },
        {
            grant: ['READ', 'WRITE'],
            to: 'admin'
        }
    ]
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
    entity Customers as projection on sales.Customers;
    entity Products as projection on sales.Products
}