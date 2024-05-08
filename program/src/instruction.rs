use {
    crate::state::{Castle, Warrior},
    shank::ShankInstruction,
    solana_program::{
        instruction::{AccountMeta, Instruction},
        program_error::ProgramError,
        pubkey::Pubkey,
        rent::Rent,
        system_instruction,
    },
};

#[derive(ShankInstruction)]
pub enum CastleRaidInstruction {
    #[account(0, writable, name = "castle", desc = "The new castle to add.")]
    #[account(1, signer, name = "authority", desc = "Castle authority")]
    AddCastle {
        /// The castle's health rating.
        health: u32,
    },
    #[account(0, writable, name = "soldier", desc = "The new warrior to add.")]
    #[account(1, signer, name = "authority", desc = "Castle authority")]
    AddWarrior {
        /// The warrior's attack rating.
        attack: u8,
        /// The warrior's health rating.
        health: u8,
        /// The warrior's stamina rating.
        stamina: u8,
    },
    #[account(0, writable, name = "castle", desc = "The castle to raid.")]
    #[account(1, signer, name = "authority", desc = "Castle authority")]
    #[account(
        2,
        optional,
        writable,
        name = "warrior1",
        desc = "1 of 5 warriors to raid the castle."
    )]
    #[account(
        3,
        optional,
        writable,
        name = "warrior2",
        desc = "2 of 5 warriors to raid the castle."
    )]
    #[account(
        4,
        optional,
        writable,
        name = "warrior3",
        desc = "3 of 5 warriors to raid the castle."
    )]
    #[account(
        5,
        optional,
        writable,
        name = "warrior4",
        desc = "4 of 5 warriors to raid the castle."
    )]
    #[account(
        6,
        optional,
        writable,
        name = "warrior5",
        desc = "5 of 5 warriors to raid the castle."
    )]
    RaidCastle,
}

impl CastleRaidInstruction {
    pub fn pack(&self) -> Vec<u8> {
        match self {
            Self::AddCastle { health } => {
                let mut data = vec![0];
                data.extend_from_slice(&health.to_le_bytes());
                data
            }
            Self::AddWarrior {
                attack,
                health,
                stamina,
            } => vec![1, *attack, *health, *stamina],
            Self::RaidCastle => vec![2],
        }
    }

    pub fn unpack(src: &[u8]) -> Result<Self, ProgramError> {
        if let Some((discr, rest)) = src.split_first() {
            if discr == &0 && rest.len() == 4 {
                let health = u32::from_le_bytes(rest.try_into().unwrap());
                return Ok(Self::AddCastle { health });
            }
            if discr == &1 && rest.len() == 3 {
                let attack = rest[0];
                let health = rest[1];
                let stamina = rest[2];
                return Ok(Self::AddWarrior {
                    attack,
                    health,
                    stamina,
                });
            }
            if discr == &2 {
                return Ok(Self::RaidCastle);
            }
        }
        Err(ProgramError::InvalidInstructionData)
    }
}

/// Derive the Program-Derived Address for a Castle.
pub fn castle_address(authority: &Pubkey, castle_number: u8) -> Pubkey {
    Pubkey::find_program_address(
        &[b"castle", authority.as_ref(), &castle_number.to_le_bytes()],
        &crate::id(),
    )
    .0
}

/// Derive the Program-Derived Address for a Warrior.
pub fn warrior_address(authority: &Pubkey, warrior_number: u8) -> Pubkey {
    Pubkey::find_program_address(
        &[
            b"warrior",
            authority.as_ref(),
            &warrior_number.to_le_bytes(),
        ],
        &crate::id(),
    )
    .0
}

/// Fund a system account with enough rent to initialize it as a Castle.
pub fn fund_castle_rent(castle: &Pubkey, authority: &Pubkey) -> Instruction {
    let lamports = Rent::default().minimum_balance(Castle::SPACE);
    system_instruction::transfer(authority, castle, lamports)
}

/// Fund a system account with enough rent to initialize it as a Warior.
pub fn fund_warrior_rent(warrior: &Pubkey, authority: &Pubkey) -> Instruction {
    let lamports = Rent::default().minimum_balance(Warrior::SPACE);
    system_instruction::transfer(authority, warrior, lamports)
}

/// Castle Raid's `AddCastle` instruction.
pub fn add_castle(castle: &Pubkey, authority: &Pubkey, health: u32) -> Instruction {
    let data = &CastleRaidInstruction::AddCastle { health }.pack();
    let accounts = vec![
        AccountMeta::new(*castle, false),
        AccountMeta::new_readonly(*authority, true),
    ];
    Instruction::new_with_bytes(crate::id(), data, accounts)
}

/// Castle Raid's `AddWarrior` instruction.
pub fn add_warrior(
    warrior: &Pubkey,
    authority: &Pubkey,
    attack: u8,
    health: u8,
    stamina: u8,
) -> Instruction {
    let data = &CastleRaidInstruction::AddWarrior {
        attack,
        health,
        stamina,
    }
    .pack();
    let accounts = vec![
        AccountMeta::new(*warrior, false),
        AccountMeta::new_readonly(*authority, true),
    ];
    Instruction::new_with_bytes(crate::id(), data, accounts)
}

/// Castle Raid's `RaidCastle` instruction.
pub fn raid_castle(castle: &Pubkey, authority: &Pubkey, warriors: &[Pubkey]) -> Instruction {
    let data = &CastleRaidInstruction::RaidCastle.pack();
    let mut accounts = vec![
        AccountMeta::new(*castle, false),
        AccountMeta::new_readonly(*authority, true),
    ];
    accounts.extend_from_slice(
        &warriors
            .iter()
            .map(|pubkey| AccountMeta::new(*pubkey, false))
            .collect::<Vec<_>>(),
    );
    Instruction::new_with_bytes(crate::id(), data, accounts)
}
