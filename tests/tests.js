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