// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IMonadRoad_NFTCards {
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view returns (uint256[] memory);
}

contract MonadRoad_DeckManager is Ownable {
    IMonadRoad_NFTCards public nftCardsContract;

    // Mapping from player to their active deck (array of card IDs)
    mapping(address => uint256[]) private activeDecks;

    event DeckSaved(address indexed player, uint256[] deckIds);

    constructor(address _nftCardsAddress) Ownable(msg.sender) {
        nftCardsContract = IMonadRoad_NFTCards(_nftCardsAddress);
    }

    function setNFTCardsContract(address _nftCardsAddress) external onlyOwner {
        nftCardsContract = IMonadRoad_NFTCards(_nftCardsAddress);
    }

    function saveDeck(uint256[] calldata deckIds) external {
        require(deckIds.length > 0 && deckIds.length <= 10, "Invalid deck size");

        // Validate that the player owns all the cards they want to put in their deck
        for (uint i = 0; i < deckIds.length; i++) {
            uint256 balance = nftCardsContract.balanceOf(msg.sender, deckIds[i]);
            require(balance > 0, "You do not own all cards in this deck");
        }

        activeDecks[msg.sender] = deckIds;
        emit DeckSaved(msg.sender, deckIds);
    }

    function getActiveDeck(address player) external view returns (uint256[] memory) {
        return activeDecks[player];
    }

    function validateDeck(address player) external view returns (bool) {
        uint256[] memory deck = activeDecks[player];
        if (deck.length == 0) return false;

        for (uint i = 0; i < deck.length; i++) {
            if (nftCardsContract.balanceOf(player, deck[i]) == 0) {
                return false;
            }
        }
        return true;
    }
}
