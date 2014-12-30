module NovaBurst.ModularTypeScript.AppX.Sales {

    import Core = NovaBurst.ModularTypeScript.Core;

    export class CustomerService implements ICustomerService {

        private url: string = "/api/customer";

        constructor(
            private EntityService: Core.IEntityService<Customer>) {
        }

        // get by ID
        getById(id: string): ng.IPromise<Customer> {
            return this.EntityService.getById(this.url, id);
        }
    }


    // register angular service
    angular.module(angularModuleName).service('CustomerService', ['EntityService', CustomerService]);
}