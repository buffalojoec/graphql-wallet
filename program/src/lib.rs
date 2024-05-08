use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, msg, pubkey::Pubkey};

solana_program::declare_id!("5k4AqmvciyxQu5CBDdb33tGCNvb9bNLC1pSE7Kvk4BEc");

solana_program::entrypoint!(process_instruction);

fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _data: &[u8],
) -> ProgramResult {
    msg!("Hello, world!");
    Ok(())
}
