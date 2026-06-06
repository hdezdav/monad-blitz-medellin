// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MonadRoad_NFTCards is ERC1155, Ownable {
    using Strings for uint256;

    // Define card IDs (example based on README)
    uint256 public constant STARTER_PACK = 0;
    uint256 public constant CARD_PHISHING_FILTER = 1;
    uint256 public constant CARD_PHYSICAL_SEED = 2;
    uint256 public constant CARD_L2_CHANNEL = 3;
    uint256 public constant CARD_SHIELDED_CONTRACT = 4;
    uint256 public constant CARD_DIGITAL_SIGNATURE = 5;
    uint256 public constant CARD_IMMUTABLE_LEDGER = 6;
    uint256 public constant CARD_MONAD_PARALLELISM = 7;
    
    // Bosses
    uint256 public constant BOSS_DUPLICATOR_HACKER = 8;
    uint256 public constant BOSS_RANSOMWARE_INTERCEPTOR = 9;
    uint256 public constant BOSS_HIGH_GAS_MONSTER = 10;

    mapping(address => bool) public authorizedMinters;

    event MinterStatusChanged(address minter, bool status);

    constructor(string memory uri) ERC1155(uri) Ownable(msg.sender) {
        // Example base URI: "ipfs://QmYourIpfsCID/{id}.json"
    }

    modifier onlyMinter() {
        require(authorizedMinters[msg.sender] || msg.sender == owner(), "Not authorized to mint");
        _;
    }

    function setMinter(address minter, bool status) external onlyOwner {
        authorizedMinters[minter] = status;
        emit MinterStatusChanged(minter, status);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mintStarterPack(address to) external onlyMinter {
        // Mint basic cards to the user
        uint256[] memory ids = new uint256[](3);
        ids[0] = CARD_PHISHING_FILTER;
        ids[1] = CARD_L2_CHANNEL;
        ids[2] = CARD_SHIELDED_CONTRACT;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 1;
        amounts[1] = 1;
        amounts[2] = 1;

        _mintBatch(to, ids, amounts, "");
    }

    function mintRewardPack(address to, uint256 phase) external onlyMinter {
        // Logic to mint specific rewards per phase
        if (phase == 1) {
            _mint(to, CARD_PHYSICAL_SEED, 1, "");
        } else if (phase == 2) {
            _mint(to, CARD_DIGITAL_SIGNATURE, 1, "");
        } else if (phase == 3) {
            _mint(to, CARD_MONAD_PARALLELISM, 1, "");
        }
    }

    function mintBossCard(address to, uint256 bossId) external onlyMinter {
        require(bossId >= BOSS_DUPLICATOR_HACKER && bossId <= BOSS_HIGH_GAS_MONSTER, "Invalid boss ID");
        _mint(to, bossId, 1, "");
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyMinter {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyMinter {
        _mintBatch(to, ids, amounts, data);
    }
}
