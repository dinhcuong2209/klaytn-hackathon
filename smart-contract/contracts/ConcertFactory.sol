// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// Import contracts and libraries from OpenZeppelin
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/Proxy.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// Import the TicketERC721 contract, a custom NFT contract
import "./TicketERC721.sol";

// Define the ConcertFactory contract
contract ConcertFactory is Proxy, Ownable, ReentrancyGuard {
    using SafeERC20 for ERC20;

    // Address of the specific implementation contract
    address private implAddress;

    // Struct Ticket to store information about tickets
    struct Ticket {
        string uri;
        uint price;
        uint currentId;
    }

    // Mapping to store user indices for each type of ticket
    mapping(address => mapping(address => uint)) userIndex;

    // Mapping to store lists of tickets owned by users for each type of ticket
    mapping(address => mapping(uint => UserListToken)) public OwnerListTickets;

    // Struct UserListToken to store lists of user-owned tokens
    struct UserListToken {
        uint maxIndex;
        mapping(uint => uint) listIds;
    }

    // Mapping to check if a NFT contract is in the allowed list
    mapping(address => bool) private NftList;

    // Mapping to store URIs for each NFT contract
    mapping(address => string) private uriToken;

    // Mapping to store information about tickets based on the address of the NFT contract
    mapping(address => Ticket) public Tickets;

    // Mapping to store lists of token IDs for tickets
    mapping(uint => uint) public TokenIdsList;

    // Event emitted when a user buys a ticket
    event TokenBuy(
        address buyer,
        address ticketAddress,
        uint amount,
        uint tokenId
    );

    // Event emitted when a owner create new ticket
    event TicketFactoryCreated(address ticket);

    // Override the _implementation() function from the Proxy contract
    function _implementation() internal view override returns (address) {
        return implAddress;
    }

    // Function to allow the owner to update the address of the specific implementation contract
    function setImplAddress(address _implAddress) external onlyOwner {
        implAddress = _implAddress;
    }

    // Function to create collection
    function createCollection(string memory name, string memory symbol) external onlyOwner returns (address) {
        address newNFT = address(new TicketERC721(name, symbol));
        addNftList(newNFT);        
        emit TicketFactoryCreated(newNFT);
        return newNFT;
    }

    // Function to allow the owner to add a NFT contract to the allowed list
    function addNftList(address nft) public onlyOwner {
        require(NftList[address(nft)] == false, "NFT already in list");
        NftList[address(nft)] = true;
    }

    // Function to allow the owner to remove a NFT contract from the allowed list
    function removeNftFromList(address nft) external onlyOwner {
        require(NftList[address(nft)], "NFT is not in list");
        NftList[address(nft)] = false;
    }

    // Function to set information for a type of ticket
    function setTicket(
        address _address,
        uint price,
        string memory uri
    ) external onlyOwner {
        Ticket memory ticket = Ticket(uri, price, Tickets[address(_address)].currentId);
        Tickets[_address] = ticket;
        NftList[_address] = true;
    }

    // Function for users to buy a ticket
    function buyTicket(
        address buyer,
        uint amount,
        TicketERC721 ticketFactory
    ) external payable nonReentrant {
        require(
            address(ticketFactory) != address(0),
            "Ticket address is not valid"
        );
        Ticket memory ticket = Tickets[address(ticketFactory)];
        require(amount == ticket.price, "Insufficient balance");
        uint256 tokenId = ticket.currentId + 1;
        ticketFactory.mint(buyer, tokenId);
        ticketFactory.setTokenURI(tokenId, ticket.uri);
        Tickets[address(ticketFactory)].currentId = tokenId;
        emit TokenBuy(buyer, address(ticketFactory), amount, tokenId);

        // Update the user's list of tickets
        uint index = userIndex[buyer][address(ticketFactory)];
        if (index > 0) {
            UserListToken storage userListToken = OwnerListTickets[buyer][index];
            uint maxIndex = userListToken.maxIndex + 1;
            userListToken.listIds[maxIndex] = tokenId;
        } else {
            UserListToken storage userListToken = OwnerListTickets[buyer][
                index + 1
            ];
            userListToken.maxIndex = index + 1;
            userListToken.listIds[index + 1] = tokenId;
        }
    }
}
