'use strict';

module.exports.info = 'Fabvar: move the VAR0 value to another location.';

let bc, contx;
module.exports.init = function (blockchain, context, args) {
    bc = blockchain;
    contx = context;
    return Promise.resolve();
};

module.exports.run = function () {
  
    let varNum = 1 + Math.floor(Math.random() * 999998)
    let varId = 'VAR' + varNum.toString()
    let args;

    if (bc.bcType === 'fabric-ccp') {
        args = {
            chaincodeFunction: 'moveVar',
            chaincodeArguments: [varId]
        };
    } else {
        args = {
            transaction_type: "moveVar",
            FabvarID: varId
        };
    }
    return bc.invokeSmartContractUnordered(
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
