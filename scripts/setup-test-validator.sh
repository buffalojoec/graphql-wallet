#!/bin/bash

program_id="5k4AqmvciyxQu5CBDdb33tGCNvb9bNLC1pSE7Kvk4BEc"
program_so="target/deploy/program.so"

cargo build-sbf

shank idl -r program -o program --out-filename idl.json

solana-test-validator \
    --bpf-program $program_id $program_so \
    --account-dir fixtures \
    --reset