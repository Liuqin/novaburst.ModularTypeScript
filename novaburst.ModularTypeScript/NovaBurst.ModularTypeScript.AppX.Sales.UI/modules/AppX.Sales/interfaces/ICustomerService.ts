module NovaBurst.ModularTypeScript.AppX.Sales {

    import Core = NovaBurst.ModularTypeScript.Core;

    export interface ICustomerService {

        // get by ID
        getById(id: string): ng.IPromise<Customer>;
    }
} 