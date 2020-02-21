'use strict';

module.exports.info = 'Fabvar: get the sum of all values from VAR0 to VAR999999.';

let bc, contx;
module.exports.init = function (blockchain, context, args) {
    bc = blockchain;
    contx = context;
    return Promise.resolve();
};

module.exports.run = function () {
    let args;
    if (bc.bcType === 'fabric-ccp') {
        args = {
            chaincodeFunction: 'getSum',
            chaincodeArguments: []
        };
    } else {
        args = {
            transaction_type: "getSum"
        };
    }
    return bc.invokeSmartContract(
        contx,
        'fabvar',
        'v1',
        [args],
        120
    );
};

module.exports.end = function () {
    return Promise.resolve();
};
