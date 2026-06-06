// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IMonadRoad_NFTCards {
    function mintBossCard(address to, uint256 bossId) external;
    function mintRewardPack(address to, uint256 phase) external;
}

contract MonadRoad_GameState is Ownable {
    
    struct PlayerState {
        uint256 currentPhase;
        bool hasSeedPhraseBackedUp;
        bool hasDefeatedPhase1;
        bool hasDefeatedPhase2;
        bool hasDefeatedPhase3;
    }

    mapping(address => PlayerState) public players;
    IMonadRoad_NFTCards public nftContract;

    event PhaseAdvanced(address indexed player, uint256 newPhase);
    event SeedPhraseBackedUp(address indexed player);
    event BossDefeated(address indexed player, uint256 phase);

    constructor() Ownable(msg.sender) {}

    function setNFTContract(address _nftContract) external onlyOwner {
        nftContract = IMonadRoad_NFTCards(_nftContract);
    }

    function registerPlayer() external {
        require(players[msg.sender].currentPhase == 0, "Player already registered");
        players[msg.sender].currentPhase = 1;
        emit PhaseAdvanced(msg.sender, 1);
    }

    function verifySeedPhraseBackup() external {
        require(players[msg.sender].currentPhase >= 2, "Must be at least in phase 2");
        players[msg.sender].hasSeedPhraseBackedUp = true;
        emit SeedPhraseBackedUp(msg.sender);
    }

    function recordBossDefeat(uint256 phase) external {
        PlayerState storage state = players[msg.sender];
        require(state.currentPhase == phase, "Player is not in this phase");

        if (phase == 1) {
            state.hasDefeatedPhase1 = true;
            state.currentPhase = 2;
            emit BossDefeated(msg.sender, 1);
            emit PhaseAdvanced(msg.sender, 2);
            
            // Mint Boss 1 & Phase 1 Reward Pack (which has physical seed card)
            if (address(nftContract) != address(0)) {
                nftContract.mintBossCard(msg.sender, 8); // BOSS_DUPLICATOR_HACKER
                nftContract.mintRewardPack(msg.sender, 1); // CARD_PHYSICAL_SEED (2)
            }
        } else if (phase == 2) {
            require(state.hasSeedPhraseBackedUp, "Must backup seed phrase to defeat boss");
            state.hasDefeatedPhase2 = true;
            state.currentPhase = 3;
            emit BossDefeated(msg.sender, 2);
            emit PhaseAdvanced(msg.sender, 3);

            // Mint Boss 2 & Phase 2 Reward Pack (which has digital signature card)
            if (address(nftContract) != address(0)) {
                nftContract.mintBossCard(msg.sender, 9); // BOSS_RANSOMWARE_INTERCEPTOR
                nftContract.mintRewardPack(msg.sender, 2); // CARD_DIGITAL_SIGNATURE (5)
            }
        } else if (phase == 3) {
            state.hasDefeatedPhase3 = true;
            // Advance to Phase 4 (Completion)
            state.currentPhase = 4;
            emit BossDefeated(msg.sender, 3);
            emit PhaseAdvanced(msg.sender, 4);
            
            // Mint Boss 3 & Phase 3 Reward Pack (which has parallel monad card)
            if (address(nftContract) != address(0)) {
                nftContract.mintBossCard(msg.sender, 10); // BOSS_HIGH_GAS_MONSTER
                nftContract.mintRewardPack(msg.sender, 3); // CARD_MONAD_PARALLELISM (7)
            }
        }
    }

    function getPlayerState(address player) external view returns (PlayerState memory) {
        return players[player];
    }
}
