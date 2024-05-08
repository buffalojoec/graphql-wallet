//! Castle raid!!

pub mod instruction;
pub mod state;

use {
    instruction::CastleRaidInstruction,
    solana_program::{
        account_info::{next_account_info, AccountInfo},
        entrypoint::ProgramResult,
        msg,
        program_error::ProgramError,
        pubkey::Pubkey,
    },
    state::{Castle, Warrior},
};

solana_program::declare_id!("5k4AqmvciyxQu5CBDdb33tGCNvb9bNLC1pSE7Kvk4BEc");

solana_program::entrypoint!(process_instruction);

fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    data: &[u8],
) -> ProgramResult {
    match CastleRaidInstruction::unpack(data)? {
        CastleRaidInstruction::AddCastle { health } => process_add_castle(accounts, health),
        CastleRaidInstruction::AddWarrior {
            attack,
            health,
            stamina,
        } => process_add_warrior(accounts, attack, health, stamina),
        CastleRaidInstruction::RaidCastle => process_raid_castle(accounts),
    }
}

fn process_add_castle(accounts: &[AccountInfo], health: u32) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let castle_info = next_account_info(accounts_iter)?;
    let authority_info = next_account_info(accounts_iter)?;

    if !authority_info.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    if castle_info.lamports() == 0 {
        return Err(ProgramError::AccountNotRentExempt);
    }

    let castle = Castle::new(health, authority_info.key);
    castle.serialize(&mut castle_info.try_borrow_mut_data()?[..])?;

    Ok(())
}

fn process_add_warrior(
    accounts: &[AccountInfo],
    attack: u8,
    health: u8,
    stamina: u8,
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let warrior_info = next_account_info(accounts_iter)?;
    let authority_info = next_account_info(accounts_iter)?;

    if !authority_info.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    if warrior_info.lamports() == 0 {
        return Err(ProgramError::AccountNotRentExempt);
    }

    let warrior = Warrior::new(attack, health, stamina, authority_info.key);
    warrior.serialize(&mut warrior_info.try_borrow_mut_data()?[..])?;

    Ok(())
}

fn process_raid_castle(accounts: &[AccountInfo]) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let castle_info = next_account_info(accounts_iter)?;
    let authority_info = next_account_info(accounts_iter)?;

    if !authority_info.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    if accounts.is_empty() {
        msg!("No warriors raided!");
        return Err(ProgramError::InvalidArgument);
    }

    let mut castle = Castle::deserialize(&castle_info.try_borrow_data()?)?;

    if castle.is_dead() {
        msg!("Castle already toppled!");
        return Err(ProgramError::InvalidArgument);
    }

    // Up to 5 warriors per raid.
    for _ in 0..5 {
        if let Ok(warrior_info) = next_account_info(accounts_iter) {
            let mut warrior = Warrior::deserialize(&warrior_info.try_borrow_data()?)?;
            if !warrior.check_authority(authority_info.key) {
                msg!("Unauthorized warrior!");
                return Err(ProgramError::IllegalOwner);
            }
            castle.raid(&mut warrior);
            warrior.serialize(&mut warrior_info.try_borrow_mut_data()?[..])?;
        } else {
            break;
        }
    }

    if castle.is_dead() {
        msg!("Castle toppled!");
    }

    Ok(())
}
