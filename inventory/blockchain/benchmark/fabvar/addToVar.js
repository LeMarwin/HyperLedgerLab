'use strict';

module.exports.info = 'Fabvar: add values to default var: 0.';

let txIndex = 0;

let maxVal = 10

let bc, contx;
module.exports.init = function (blockchain, context, args) {
    bc = blockchain;
    contx = context;
    return Promise.resolve();
};

module.exports.run = function () {
    txIndex++;

    let varAdd = Math.floor(Math.random() * maxVal)
    let varId = 'VAR0'
    let args;

    if (bc.bcType === 'fabric-ccp') {
        args = {
            chaincodeFunction: 'addToVar',
            chaincodeArguments: [varId, varAdd.toString()]
        };
    } else {
        args = {
            transaction_type: "addToVar",
            TestVariableID: varId,
            Value: varVal.toString()
        };
    }
    return bc.invokeSmartContract(
        contx,
        'fabvar',
        'v1',
        [args],
        30
    );
};

module.exports.end = function () {
    return Promise.resolve();
};
