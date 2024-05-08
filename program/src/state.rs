use {
    shank::ShankAccount,
    solana_program::{program_error::ProgramError, pubkey::Pubkey},
};

#[derive(ShankAccount)]
pub struct Castle {
    health: u32,
    authority: Pubkey,
}

impl Castle {
    pub const SPACE: usize = 4 + 32;

    pub fn new(health: u32, authority: &Pubkey) -> Self {
        Self {
            health,
            authority: *authority,
        }
    }

    pub fn is_dead(&self) -> bool {
        self.health == 0
    }

    pub fn raid(&mut self, warrior: &mut Warrior) {
        // Warrior attacks the castle in the raid.
        // * `attack`: The damage inflicted on the castle's health.
        // * `health`: Suffers 50 damage in the raid.
        // * `stamina`: Suffers 50 damage in the raid.
        self.health = self.health.saturating_sub(warrior.attack as u32);
        warrior.attack = warrior.attack.saturating_sub(50);
        warrior.stamina = warrior.stamina.saturating_sub(50);
    }

    pub fn serialize(&self, src: &mut [u8]) -> Result<(), ProgramError> {
        if src.len() < Self::SPACE {
            return Err(ProgramError::AccountDataTooSmall);
        }
        src[0..4].copy_from_slice(&self.health.to_le_bytes());
        src[4..36].copy_from_slice(self.authority.as_ref());
        Ok(())
    }

    pub fn deserialize(src: &[u8]) -> Result<Self, ProgramError> {
        if src.len() < Self::SPACE {
            return Err(ProgramError::AccountDataTooSmall);
        }
        let health = u32::from_le_bytes(src[0..4].try_into().unwrap());
        let authority = Pubkey::new_from_array(src[4..36].try_into().unwrap());
        Ok(Self { health, authority })
    }
}

#[derive(ShankAccount)]
pub struct Warrior {
    attack: u8,
    health: u8,
    stamina: u8,
    authority: Pubkey,
}

impl Warrior {
    pub const SPACE: usize = 1 + 1 + 1 + 32;

    pub fn new(attack: u8, health: u8, stamina: u8, authority: &Pubkey) -> Self {
        Self {
            attack,
            health,
            stamina,
            authority: *authority,
        }
    }

    pub fn check_authority(&self, key: &Pubkey) -> bool {
        self.authority.eq(key)
    }

    pub fn serialize(&self, src: &mut [u8]) -> Result<(), ProgramError> {
        if src.len() < Self::SPACE {
            return Err(ProgramError::AccountDataTooSmall);
        }
        src[0..3].copy_from_slice(&[self.attack, self.health, self.stamina]);
        src[3..35].copy_from_slice(self.authority.as_ref());
        Ok(())
    }

    pub fn deserialize(src: &[u8]) -> Result<Self, ProgramError> {
        if src.len() < Self::SPACE {
            return Err(ProgramError::AccountDataTooSmall);
        }
        let attack = src[0];
        let health = src[1];
        let stamina = src[2];
        let authority = Pubkey::new_from_array(src[3..35].try_into().unwrap());
        Ok(Self {
            attack,
            health,
            stamina,
            authority,
        })
    }
}
