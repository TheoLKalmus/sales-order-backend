using { sales } from '../db/schema';
 
namespace sales;

service MainService {
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
}