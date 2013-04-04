test("Basic usage of proreq library", function () {
    var test_method = function (m) {
        console.log(m);
    };

    module("com.company.product.module");

    Provide("com.company.product.module.BIN_CONSTANT", 0xFF);
    Provide("com.company.product.module.INT_CONSTANT", 3);
    Provide("com.company.product.module.BOOL_CONSTANT", true);
    Provide("com.company.product.module.STR_CONSTANT", "test string");
    Provide("com.company.product.module.NUM_CONSTANT", 3.14);
    Provide("com.company.product.module.OBJ_CONSTANT", {a:"test"});
    Provide("com.company.product.module.method", test_method);

    equal(Require("com.company.product.module.BIN_CONSTANT"), 0xFF, "Binary constant is stored properly");
    equal(Require("com.company.product.module.INT_CONSTANT"), 3, "Integer constant is stored properly");
    equal(Require("com.company.product.module.BOOL_CONSTANT"), true, "Boolean constant is stored properly");
    equal(Require("com.company.product.module.STR_CONSTANT"), "test string", "String constant is stored properly");
    equal(Require("com.company.product.module.NUM_CONSTANT"), 3.14, "Number constant is stored properly");
    deepEqual(Require("com.company.product.module.OBJ_CONSTANT"), {a:"test"}, "Object constant is stored properly");
    equal(Require("com.company.product.module.method"), test_method, "Method is stored properly");
});

test("Advanced usage of proreq library", function () {
    module("com.company.product.module");

    var test_method = function (m) {
        console.log(m);
    };
    Provide("com.company.product.module.BIN_CONSTANT", 0xFF, {cache:true});
    Provide("com.company.product.module.INT_CONSTANT", 3, {cache:true});
    Provide("com.company.product.module.BOOL_CONSTANT", true, {cache:true});
    Provide("com.company.product.module.STR_CONSTANT", "test string", {cache:true});
    Provide("com.company.product.module.NUM_CONSTANT", 3.14, {cache:true});
    Provide("com.company.product.module.OBJ_CONSTANT", {a:"test"}, {cache:true});
    Provide("com.company.product.module.method", test_method, {cache:true});

    equal(Require("com.company.product.module.BIN_CONSTANT"), 0xFF, "Binary constant is stored properly");
    equal(Require("com.company.product.module.INT_CONSTANT"), 3, "Integer constant is stored properly");
    equal(Require("com.company.product.module.BOOL_CONSTANT"), true, "Boolean constant is stored properly");
    equal(Require("com.company.product.module.STR_CONSTANT"), "test string", "String constant is stored properly");
    equal(Require("com.company.product.module.NUM_CONSTANT"), 3.14, "Number constant is stored properly");
    deepEqual(Require("com.company.product.module.OBJ_CONSTANT"), {a:"test"}, "Object constant is stored properly");
    strictEqual(Require("com.company.product.module.method"), test_method, "Method is stored properly");
});

test("Traversal testing", function () {
    ok(isPackage(Require("com.company.product.module")), "Package is recognized properly");
    equal(fqn(Require("com.company.product.module")), "com.company.product.module", "Fully qualified name is composed properly");
    equal(fqn(__ns), "", "Fully qualified name of global namespace is empty string");
    deepEqual(Require(""), __ns, "Root namespace is Required properly");
});

test("Elvis function testing", function() {
   var obj = {
      property1 : 'property1value'
   };
   equal(elvis(obj, 'property'), undefined);
   equal(elvis(obj, 'property1'), 'property1value');
   deepEqual(elvis(obj, 'property1.property2', 'newValue'),{property2: 'newValue'});
   equal(elvis(obj, 'property1.property2'), 'newValue');

   equal(typeof obj.elvis, 'function');
   equal(obj.elvis('property1.property2'), 'newValue');
   deepEqual(obj.elvis('property1.property2.property3','newValue'), {property3:'newValue'});
});

test("Stub feature testing", function() {
   var stub = new Stub('Test');

   stub.method('foo').
        when(1).
         returns(2).
        when(3).
         returns(4).
        otherwise().
         returns(5).
         done();

   stub.method('baz').
        always().
         returns(4).
        done();

   stub.method('wrong').
        always().
        otherwise().
        done();

   stub.iterator('iter').
        always().
         yields(4).
        done();

   stub.iterator('iter1').
        yields(3).
        yields(5).
        done();

   stub.property('array1',[1,2,3,4,5]).done();

   stub.iterator('iter2').bindTo('array1').done();

   equal(typeof stub.foo, 'function');
   equal(stub.foo(1),2);
   equal(stub.foo(3),4);
   equal(stub.foo(),5);
   equal(stub.foo(100),5);
   equal(stub.foo(false),5);
   equal(stub.foo('sd'),5);

   equal(typeof stub.baz, 'function');
   equal(stub.baz(1),4);
   equal(stub.baz([]),4);
   equal(stub.baz({}),4);
   equal(stub.baz('eee'),4);
   equal(stub.baz(true),4);

   equal(typeof stub.wrong, 'function');
   equal(stub.wrong(1),undefined);
   equal(stub.wrong([]),undefined);
   equal(stub.wrong({}),undefined);
   equal(stub.wrong('eee'),undefined);
   equal(stub.wrong(true),undefined);

   equal(stub.iter.next(), 4);
   equal(stub.iter.next(), 4);
   equal(stub.iter.next(), 4);

   equal(stub.iter1.next(), 3);
   equal(stub.iter1.next(), 5);
   equal(stub.iter1.next(), null);

   deepEqual(stub.array1, [1,2,3,4,5]);

   equal(stub.iter2.next(), 1);
   equal(stub.iter2.next(), 2);
   equal(stub.iter2.next(), 3);
   equal(stub.iter2.next(), 4);
   equal(stub.iter2.next(), 5);
   equal(stub.iter2.next(), null);

});