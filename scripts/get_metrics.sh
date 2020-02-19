#!/usr/bin/env bash
# Script to run benchmark for a chaincode
# Chaincode defaults to marbles
# Chaincode name can be provided by CLI: e.g get_metrics.sh fabcar

source `dirname $0`/setup_env.sh node

base_dir=$INVENTORY_DIR_PATH/blockchain/benchmark

chaincode=fabvar
if [[ ! -z $1 ]]
then
    chaincode=$1
fi

benchmark_dir=$base_dir/$chaincode

set -x
node ./caliper/scripts/main.js -c $benchmark_dir/config.yaml -n $INVENTORY_DIR_PATH/blockchain/fabric_ccp_network.yaml
set +x
