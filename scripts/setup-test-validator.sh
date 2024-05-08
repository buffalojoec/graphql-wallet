#!/bin/bash

program_id="5k4AqmvciyxQu5CBDdb33tGCNvb9bNLC1pSE7Kvk4BEc"

cargo build-sbf

solana-test-validator \
    --bpf-program "5k4AqmvciyxQu5CBDdb33tGCNvb9bNLC1pSE7Kvk4BEc" target/deploy/program.so \
    --account-dir fixtures