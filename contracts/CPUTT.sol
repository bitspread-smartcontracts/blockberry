pragma solidity ^0.5.8;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./BlockBerry.sol";
contract CPUTT is BlockBerry {
    constructor(string memory description, string memory symbol, uint256 cap) //initialize the contract
    BlockBerry(description, symbol, cap)
    public { }
}