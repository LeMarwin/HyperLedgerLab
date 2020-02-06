'use strict';

module.exports.info = 'Simchan initLedger: One time operation';

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
            chaincodeFunction: 'initLedger',
            chaincodeArguments: []
        };
    } else {
        args = {
            transaction_type: 'initLedger'
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
