import cds, { db, Request, Service } from '@sap/cds';
import { Customers, Product, SalesOrderHeader, SalesOrderHeaders, SalesOrderItems } from '@models/sales';
import { request } from 'axios';
import { customerController } from './factories/controllers/customer';
import { FullRequestParams } from './protocols';


type Teste<T> = Request & {
    results: T;
}

export default (service: Service) => {    
    service.before('READ', '*', (request: Request) => {
        console.log(JSON.stringify(request.user));
        console.log("antes de ler");
        console.log(request.user.id);
        console.log(request.user.roles);
        if(request.user.is('read_only_user')) {
            return request.reject(403, 'Não autorizado');
        }

        service.before(['WRITE', 'DELETE'], '*', (request: Request) => {
            if(request.user.is('read_only_user')) {
                	return request.reject(403, 'Não autorizada a escrita/deleção');
            }
        })

    });
    service.after('READ', 'Customers', (customersList: Customers, request) => {
        console.log(request);

        (request as unknown as Teste<Customers>).results = customerController.afterRead(customersList);
    });

    service.after('CREATE', 'SalesOrderHeader', async (results: SalesOrderHeaders, request: Request) => {
        const headersAsArray = Array.isArray(results) ? results : [results] as SalesOrderHeaders;
        for (const header of headersAsArray) {
            const items = header.items as SalesOrderItems;
            const productsData = items.map(item => ({
                id: item.product_id as string,
                quantity: item.quantity as number
            }));
            const productsIds: string[] = productsData.map((productData) => productData.id);
            const productsQuery = SELECT.from('sales.Products').where({id: productsIds});
            const products: Products = await cds.run(productsQuery);
            for (const productData of productsData) {
                const foundProduct = products.find(product => product.id === productData.id) as Product;
                foundProduct.stock = (foundProduct.stock as number) - productData.quantity;
                await cds.update('sales-Products').where({id: foundProduct.id }).with({ stock: foundProduct.stock });
            }
            const headersAsString = JSON.stringify(header);
            const userAsString = JSON.stringify(request.user);
            const log = [{
                header_id: header.id,
                userData: userAsString,
                orderData: headersAsString
            }];
            await cds.create('sales.SalesOrderLogs').entries(log)
            console.log('Products data:', productsData);
        }
    });
};