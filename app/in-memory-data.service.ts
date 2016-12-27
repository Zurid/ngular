import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let users = [
            { customerId: 11, name: 'Mr. Nice' },
            { customerId: 12, name: 'Narco' },
            { customerId: 13, name: 'Bombasto' },
            { customerId: 14, name: 'Celeritas' },
            { customerId: 15, name: 'Magneta' },
            { customerId: 16, name: 'RubberMan' },
            { customerId: 17, name: 'Dynama' },
            { customerId: 18, name: 'Dr IQ' },
            { customerId: 19, name: 'Magma' },
            { customerId: 20, name: 'Tornado' },
            {
                "customerId": 1,
                "name": "Yuriy",
                "type": "customer",
                "addressline1": "111 E. Las Olivas Blvd",
                "addressline2": "Suite 51",
                "city": "Fort Lauderdale",
                "creditLimit": 100000,
                "discountCode": {
                    "discountCode": "N"
                },
                "email": "jumboeagle@example.com",
                "fax": "305-555-0189",
                "phone": "305-555-0188",
                "state": "FL",
                "zip": {
                    "zipCode": "95117"
                }
            },

        ];
        return { users };
    }
}
