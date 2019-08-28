pragma solidity 0.5.11;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/access/Roles.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
contract BlockBerry is ERC20, ERC20Detailed, Ownable {
    using SafeMath for uint256;
    using Roles for Roles.Role;

    uint256 private _cap;

    constructor(string memory description, string memory symbol, uint256 cap) //initialize the contract
    ERC20Detailed(description, symbol, 18) //description symbol decimals
    public {
        _cap = cap;
    }

    /**
     * @dev returns cap of tokens
     */
    function cap() public view returns (uint256) {
        return _cap;
    }

    /**
     * @dev mints tokens. see ERC20._mint
     * requirements: cannot exceed total cap
     */
    function mint(uint256 value) public onlyOwner returns (bool) {
        require(totalSupply().add(value) <= _cap, "Cap exceeded");
        _mint(msg.sender, value);
        return true;
    }

    /**
     * @dev burn tokens. see _burn
     */
    function burn(uint256 value) public onlyOwner returns (bool) {
        _burn(msg.sender, value);
        return true;
    }

    /**
     * @dev override func to check if relevant accounts are frozen. see ERC20.transfer
     */
    function transfer(address to, uint256 value) public notFrozen(msg.sender) notFrozen(to) returns (bool) {
        return super.transfer(to, value);
    }

    /**
     * @dev override func to check if relevant accounts are frozen. see ERC20.transferFrom
     */
    function transferFrom(address from, address to, uint256 value) public notFrozen(msg.sender) notFrozen(from) notFrozen(to) returns (bool) {
        return super.transferFrom(from, to, value);
    }

    /**
     * @dev Emitted when owner freezes an account
     */
    event Freeze(address indexed frozenAccount);

    /**
     * @dev Emitted when owner unfreezes an account
     */
    event Unfreeze(address indexed unfrozenAccount);

    /**
     * @dev _frozenAccounts keeps tracks of accounts that are frozen
     */
    Roles.Role private _frozenAccounts;

    /**
     * @dev used to override transfer funcs to ensure no transfers to and from frozen accounts
     */
    modifier notFrozen(address account) {
        require(!isFrozen(account), "Account is frozen");
        _;
    }

    /**
     * @dev checks if an account is frozen
     */
    function isFrozen(address account) public view returns (bool) {
        return _frozenAccounts.has(account);
    }

    /**
     * @dev freeze functionality, requires account to be not the owner's account
     * only owner can call this, and owner cannot provide his own address to freeze
     */
    function freeze(address account) public onlyOwner returns (bool) {
        require(account!=msg.sender, "owner cannot freeze own account");
        _frozenAccounts.add(account);
        emit Freeze(account);
        return true;
    }

    /**
     * @dev unfreeze an account
     */
    function unfreeze(address account) public onlyOwner returns (bool) {
        _frozenAccounts.remove(account);
        emit Unfreeze(account);
        return true;
    }
}