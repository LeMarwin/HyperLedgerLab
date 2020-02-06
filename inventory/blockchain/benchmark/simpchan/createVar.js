'use strict';

module.exports.info = 'Simpchan: Creating vars.';

let txIndex = 0;

let maxVal = 1000000

let bc, contx;
module.exports.init = function (blockchain, context, args) {
    bc = blockchain;
    contx = context;
    return Promise.resolve();
};

module.exports.run = function () {
    txIndex++;

    let varVal = Math.floor(Math.random() * maxVal)
    let varId = 'var_' + process.pid.toString() + '_' + txIndex.toString() + '_' + varVal.toString()
    let args;

    if (bc.bcType === 'fabric-ccp') {
        args = {
            chaincodeFunction: 'setVar',
            chaincodeArguments: [varId, varVal.toString()]
        };
    } else {
        args = {
            transaction_type: "setVar",
            TestVariableID: varId,
            Value: varVal.toString()
        };
    }
    return bc.invokeSmartContract(
        contx,
        'simpchan',
        'v1',
        [args],
        30
    );
};

module.exports.end = function () {
    return Promise.resolve();
};
