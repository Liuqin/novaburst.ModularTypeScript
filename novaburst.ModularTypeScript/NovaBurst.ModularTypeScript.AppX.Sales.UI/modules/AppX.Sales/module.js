var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
                Sales.angularModuleName = "NovaBurst.ModularTypeScript.AppX.Sales";

                angular.module(Sales.angularModuleName, [NovaBurst.ModularTypeScript.Core.angularModuleName]);
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
                var Customer = (function () {
                    function Customer() {
                    }
                    return Customer;
                })();
                Sales.Customer = Customer;
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
                var Product = (function () {
                    function Product() {
                    }
                    return Product;
                })();
                Sales.Product = Product;
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
                var CustomerService = (function () {
                    function CustomerService(EntityService) {
                        this.EntityService = EntityService;
                        this.url = "/api/customer";
                    }
                    // get by ID
                    CustomerService.prototype.getById = function (id) {
                        return this.EntityService.getById(this.url, id);
                    };
                    return CustomerService;
                })();
                Sales.CustomerService = CustomerService;

                // register angular service
                angular.module(Sales.angularModuleName).service('CustomerService', ['EntityService', CustomerService]);
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
                var ProductService = (function () {
                    function ProductService(EntityService) {
                        this.EntityService = EntityService;
                        this.url = "/api/product";
                    }
                    // get by ID
                    ProductService.prototype.getById = function (id) {
                        return this.EntityService.getById(this.url, id);
                    };

                    // GET - may yield multiple result types
                    ProductService.prototype.get = function (listOptions) {
                        return this.EntityService.get(this.url, listOptions);
                    };

                    // get count
                    ProductService.prototype.getCount = function () {
                        return this.EntityService.getCount(this.url);
                    };

                    // get list
                    ProductService.prototype.getList = function (pagingOptions, orderOptions) {
                        return this.EntityService.getList(this.url, pagingOptions, orderOptions);
                    };

                    // get paged list
                    ProductService.prototype.getPagedList = function (pagingOptions, orderOptions) {
                        return this.EntityService.getPagedList(this.url, pagingOptions, orderOptions);
                    };
                    return ProductService;
                })();
                Sales.ProductService = ProductService;

                // register angular service
                angular.module(Sales.angularModuleName).service('ProductService', ['EntityService', ProductService]);
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
                // base controller for all sales controllers
                var SalesControllerBase = (function () {
                    function SalesControllerBase($scope, $location) {
                        this.$scope = $scope;
                        this.$location = $location;
                        $scope['sales'] = this;
                    }
                    // go to customer account
                    SalesControllerBase.prototype.goToCustomer = function () {
                        this.$location.url('/account');
                    };

                    SalesControllerBase.prototype.goToProducts = function () {
                        this.$location.url('/');
                    };
                    return SalesControllerBase;
                })();
                Sales.SalesControllerBase = SalesControllerBase;
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
                var CustomerController = (function (_super) {
                    __extends(CustomerController, _super);
                    /*
                    * Ctor.
                    * Inject CustomerService to handle customer related operations.
                    */
                    function CustomerController($scope, $location, CustomerService) {
                        _super.call(this, $scope, $location);
                        this.$scope = $scope;
                        this.$location = $location;
                        this.CustomerService = CustomerService;

                        var ctx = this;

                        // initialize
                        var initPromise = ctx.init();
                    }
                    // initialize
                    CustomerController.prototype.init = function () {
                        var ctx = this;

                        // get current customer
                        var customerPromise = ctx.CustomerService.getById("123");

                        customerPromise.then(function (customer) {
                            ctx.currentCustomer = customer;
                        });

                        return customerPromise;
                    };
                    return CustomerController;
                })(Sales.SalesControllerBase);
                Sales.CustomerController = CustomerController;

                // register angular controller
                angular.module(Sales.angularModuleName).controller('CustomerController', ['$scope', '$location', 'CustomerService', CustomerController]);
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Sales) {
                var Core = NovaBurst.ModularTypeScript.Core;

                var ProductController = (function (_super) {
                    __extends(ProductController, _super);
                    function ProductController($scope, $location, ProductService) {
                        _super.call(this, $scope, $location);
                        this.$scope = $scope;
                        this.$location = $location;
                        this.ProductService = ProductService;

                        var ctx = this;

                        var initPromise = ctx.init();
                    }
                    ProductController.prototype.init = function () {
                        var ctx = this;

                        // create paging options
                        var pagingOptions = new Core.PagingOptions().setSkip(25).setTake(25);

                        // create order options
                        var orderFields = [
                            { fieldName: 'id', ascending: true }
                        ];

                        var orderOptions = {
                            fields: orderFields
                        };

                        // get list of products
                        var prodPromise = ctx.ProductService.getPagedList(pagingOptions, orderOptions);

                        prodPromise.then(function (products) {
                            ctx.products = products;
                        });

                        return prodPromise;
                    };
                    return ProductController;
                })(Sales.SalesControllerBase);
                Sales.ProductController = ProductController;

                // register angular controller
                angular.module(Sales.angularModuleName).controller('ProductController', ['$scope', '$location', 'ProductService', ProductController]);
            })(AppX.Sales || (AppX.Sales = {}));
            var Sales = AppX.Sales;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Core) {
            Core.angularModuleName = 'NovaBurst.ModularTypeScript.Core';

            angular.module(Core.angularModuleName, []);
        })(ModularTypeScript.Core || (ModularTypeScript.Core = {}));
        var Core = ModularTypeScript.Core;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Core) {
            var PagingOptions = (function () {
                function PagingOptions() {
                }
                PagingOptions.prototype.getPageSize = function () {
                    return this.take;
                };

                PagingOptions.prototype.getPageIndex = function () {
                    if (!this.take || this.skip == null || typeof (this.skip) == 'undefined')
                        return 1;

                    return Math.floor(this.skip / this.take) + 1;
                };

                PagingOptions.prototype.setSkip = function (skip) {
                    this.skip = skip;
                    return this;
                };

                PagingOptions.prototype.setTake = function (take) {
                    this.take = take;
                    return this;
                };

                PagingOptions.prototype.setPage = function (pageIndex, pageSize) {
                    this.take = pageSize;
                    this.skip = (pageIndex - 1) * pageSize;
                    return this;
                };
                return PagingOptions;
            })();
            Core.PagingOptions = PagingOptions;
        })(ModularTypeScript.Core || (ModularTypeScript.Core = {}));
        var Core = ModularTypeScript.Core;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Core) {
            var PagedList = (function () {
                /*
                * Ctor.
                * items = list of entities
                * itemsCount = total number of entities
                * pagingOptions = options used to determine current paged list
                */
                function PagedList(items, itemsCount, pagingOptions) {
                    this.items = items;
                    this.itemsCount = itemsCount;
                    this.pagingOptions = pagingOptions;
                }
                /*
                * Get number of pages.
                */
                PagedList.prototype.getPageCount = function () {
                    if (!this.pagingOptions.take) {
                        return 0;
                    }

                    return Math.ceil(this.itemsCount / this.pagingOptions.take);
                };

                /*
                * Get paged list from promises.
                * $q = service for handling promises and deferred execution
                * countPromise = promise that resolves to the count of entities
                * listPromise = promise that resolves to the list of entities
                */
                PagedList.fromPromises = function ($q, countPromise, listPromise, pagingOptions) {
                    var def = $q.defer();

                    // get entity count
                    var count;
                    countPromise.then(function (cnt) {
                        count = cnt;
                    });

                    // get list of entities
                    var list;
                    listPromise.then(function (lst) {
                        list = lst;
                    });

                    // sync both promises
                    $q.all([countPromise, listPromise]).then(function () {
                        // create paged list
                        var pagedList = new PagedList(list, count, pagingOptions);
                        def.resolve(pagedList);
                    }, function (reason) {
                        def.reject(reason);
                    });

                    return def.promise;
                };
                return PagedList;
            })();
            Core.PagedList = PagedList;
        })(ModularTypeScript.Core || (ModularTypeScript.Core = {}));
        var Core = ModularTypeScript.Core;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Core) {
            var OrderOptionsField = (function () {
                function OrderOptionsField() {
                }
                return OrderOptionsField;
            })();
            Core.OrderOptionsField = OrderOptionsField;
        })(ModularTypeScript.Core || (ModularTypeScript.Core = {}));
        var Core = ModularTypeScript.Core;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Core) {
            var OrderOptions = (function () {
                function OrderOptions() {
                }
                return OrderOptions;
            })();
            Core.OrderOptions = OrderOptions;
        })(ModularTypeScript.Core || (ModularTypeScript.Core = {}));
        var Core = ModularTypeScript.Core;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Core) {
            var ListOptions = (function () {
                function ListOptions() {
                }
                return ListOptions;
            })();
            Core.ListOptions = ListOptions;
        })(ModularTypeScript.Core || (ModularTypeScript.Core = {}));
        var Core = ModularTypeScript.Core;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (Core) {
            var EntityService = (function () {
                /*
                * url = resource URL that corresponds to the requested entity and which service is REST based
                */
                function EntityService($q, $http) {
                    this.$q = $q;
                    this.$http = $http;
                }
                // get by ID
                EntityService.prototype.getById = function (url, id) {
                    var ctx = this;
                    var url = url + '/' + id;
                    var promise = ctx.$http.get(url);
                    return ctx.httpPromiseToPromise(promise);
                };

                // GET - may yield multiple result types
                EntityService.prototype.get = function (url, listOptions) {
                    var ctx = this;
                    var promise = ctx.getFiltered(url, null, listOptions);
                    return promise;
                };

                // GET - may yield multiple result types
                EntityService.prototype.getFiltered = function (url, filter, listOptions) {
                    var ctx = this;
                    var paramsObj = !filter ? { listOptions: listOptions } : $.extend(true, {}, { listOptions: listOptions }, filter);
                    var params = $.param(paramsObj);
                    url = url + '?' + params;
                    var promise = ctx.$http.get(url);
                    return ctx.httpPromiseToPromise(promise);
                };

                // get count
                EntityService.prototype.getCount = function (url) {
                    var ctx = this;
                    var promise = ctx.getCountFiltered(url, null);
                    return promise;
                };

                // get count
                EntityService.prototype.getCountFiltered = function (url, filter) {
                    var ctx = this;
                    var listOptions = new Core.ListOptions();
                    listOptions.fetchCount = true;
                    var promise = ctx.getFiltered(url, filter, listOptions);
                    return promise;
                };

                // get list
                EntityService.prototype.getList = function (url, pagingOptions, orderOptions) {
                    var ctx = this;
                    var promise = ctx.getListFiltered(url, null, pagingOptions, orderOptions);
                    return promise;
                };

                // get list
                EntityService.prototype.getListFiltered = function (url, filter, pagingOptions, orderOptions) {
                    var ctx = this;
                    var listOptions = new Core.ListOptions();
                    listOptions.pagingOptions = pagingOptions;
                    listOptions.orderOptions = orderOptions;
                    var promise = ctx.getFiltered(url, filter, listOptions);
                    return promise;
                };

                // get paged list
                EntityService.prototype.getPagedList = function (url, pagingOptions, orderOptions) {
                    var ctx = this;

                    // get count
                    var countPromise = ctx.getCount(url);

                    // get list
                    var listPromise = ctx.getList(url, pagingOptions, orderOptions);

                    // create paged list from promise results
                    var pagedListPromise = Core.PagedList.fromPromises(ctx.$q, countPromise, listPromise, pagingOptions);

                    return pagedListPromise;
                };

                // get paged list
                EntityService.prototype.getPagedListFiltered = function (url, filter, pagingOptions, orderOptions) {
                    var ctx = this;

                    // get count
                    var countPromise = ctx.getCountFiltered(url, filter);

                    // get list
                    var listPromise = ctx.getListFiltered(url, filter, pagingOptions, orderOptions);

                    // create paged list from promise results
                    var pagedListPromise = Core.PagedList.fromPromises(ctx.$q, countPromise, listPromise, pagingOptions);

                    return pagedListPromise;
                };

                EntityService.prototype.httpPromiseToPromise = function (promise) {
                    var def = this.$q.defer();

                    promise.then(function (res) {
                        def.resolve(res.data);
                    }, function () {
                        def.reject.apply(def, arguments);
                    });

                    return def.promise;
                };
                return EntityService;
            })();
            Core.EntityService = EntityService;

            // register angular service
            angular.module(Core.angularModuleName).service('EntityService', ['$q', '$http', EntityService]);
        })(ModularTypeScript.Core || (ModularTypeScript.Core = {}));
        var Core = ModularTypeScript.Core;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="module.angular.ts" />
/// <reference path="List/models/PagingOptions.ts" />
/// <reference path="List/models/PagedList.ts" />
/// <reference path="List/models/OrderOptionsField.ts" />
/// <reference path="List/models/OrderOptions.ts" />
/// <reference path="List/models/ListOptions.ts" />
/// <reference path="Model/interfaces/IEntityService.ts" />
/// <reference path="Model/services/EntityService.ts" />
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Core) {
                var Address = (function () {
                    function Address() {
                    }
                    return Address;
                })();
                Core.Address = Address;
            })(AppX.Core || (AppX.Core = {}));
            var Core = AppX.Core;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Core) {
                var Phone = (function () {
                    function Phone() {
                    }
                    return Phone;
                })();
                Core.Phone = Phone;
            })(AppX.Core || (AppX.Core = {}));
            var Core = AppX.Core;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Core) {
                var Person = (function () {
                    function Person() {
                    }
                    return Person;
                })();
                Core.Person = Person;
            })(AppX.Core || (AppX.Core = {}));
            var Core = AppX.Core;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Core) {
                var PersonAddress = (function (_super) {
                    __extends(PersonAddress, _super);
                    function PersonAddress() {
                        _super.apply(this, arguments);
                    }
                    return PersonAddress;
                })(Core.Address);
                Core.PersonAddress = PersonAddress;
            })(AppX.Core || (AppX.Core = {}));
            var Core = AppX.Core;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Core) {
                var PersonPhone = (function (_super) {
                    __extends(PersonPhone, _super);
                    function PersonPhone() {
                        _super.apply(this, arguments);
                    }
                    return PersonPhone;
                })(Core.Phone);
                Core.PersonPhone = PersonPhone;
            })(AppX.Core || (AppX.Core = {}));
            var Core = AppX.Core;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
var NovaBurst;
(function (NovaBurst) {
    (function (ModularTypeScript) {
        (function (AppX) {
            (function (Core) {
                (function (PersonPhoneType) {
                    PersonPhoneType[PersonPhoneType["Home"] = 1] = "Home";
                    PersonPhoneType[PersonPhoneType["Work"] = 2] = "Work";
                })(Core.PersonPhoneType || (Core.PersonPhoneType = {}));
                var PersonPhoneType = Core.PersonPhoneType;
            })(AppX.Core || (AppX.Core = {}));
            var Core = AppX.Core;
        })(ModularTypeScript.AppX || (ModularTypeScript.AppX = {}));
        var AppX = ModularTypeScript.AppX;
    })(NovaBurst.ModularTypeScript || (NovaBurst.ModularTypeScript = {}));
    var ModularTypeScript = NovaBurst.ModularTypeScript;
})(NovaBurst || (NovaBurst = {}));
/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ref.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/scripts/typings/angularjs/angular.d.ts" />
/// <reference path="models/Address.ts" />
/// <reference path="models/Phone.ts" />
/// <reference path="models/Person.ts" />
/// <reference path="models/PersonAddress.ts" />
/// <reference path="models/PersonPhone.ts" />
/// <reference path="models/PersonPhoneType.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/modules/Core/ref.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.AppX.Core.UI/modules/AppX.Core/ref.ts" />
/// <reference path="../../../NovaBurst.ModularTypeScript.Core.UI/scripts/typings/angularjs/angular.d.ts" />
/// <reference path="module.angular.ts" />
/// <reference path="models/Customer.ts" />
/// <reference path="models/Product.ts" />
/// <reference path="interfaces/ICustomerService.ts" />
/// <reference path="interfaces/IProductService.ts" />
/// <reference path="services/CustomerService.ts" />
/// <reference path="services/ProductService.ts" />
/// <reference path="controllers/SalesControllerBase.ts" />
/// <reference path="controllers/CustomerController.ts" />
/// <reference path="controllers/ProductController.ts" />
//# sourceMappingURL=module.js.map
