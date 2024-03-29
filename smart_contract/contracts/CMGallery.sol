// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../contracts@4.5.0/token/ERC721/ERC721.sol";
import "../contracts@4.5.0/token/ERC721/extensions/ERC721Enumerable.sol";
import "../contracts@4.5.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "../contracts@4.5.0/access/Ownable.sol";
import "../contracts@4.5.0/utils/Counters.sol";

contract CMGallery is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 public mintRate = .01 ether;
    uint256 public MAX_SUPPLY = 10000;

    constructor() ERC721("CMGallery", "CMG") {}

    function safeMint(address to, string memory uri) public payable {
        require(totalSupply() < MAX_SUPPLY, "Sorry max supply reached.");
        require(msg.value >= mintRate, "Not enough ether to cover mint rate.");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Balance is currently 0.");
        payable(owner()).transfer(address(this).balance);
    }
}
