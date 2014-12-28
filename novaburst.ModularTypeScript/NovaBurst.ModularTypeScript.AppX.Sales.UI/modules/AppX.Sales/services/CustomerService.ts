module NovaBurst.ModularTypeScript.AppX.Sales {

    import Core = NovaBurst.ModularTypeScript.Core;

    export class CustomerService extends Core.EntityService<Customer> implements ICustomerService {

        constructor(
            public $q: ng.IQService,
            public $http: ng.IHttpService) {

            super($q, $http, '/api/customer');
        }
    }


    // register angular service
    angular.module(angularModuleName).service('CustomerService', CustomerService);
}