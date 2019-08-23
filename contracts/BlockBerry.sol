pragma solidity ^0.5.11;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
contract BlockBerry is ERC20, ERC20Detailed, Ownable {
    using SafeMath for uint256;

    /* This notifies clients about the amount frozen */
    event Freeze(address indexed from, uint256 value);
	/* This notifies clients about the amount unfrozen */
    event Unfreeze(address indexed from, uint256 value);
    mapping (address => uint256) private _frozen;

    uint256 private _cap;

    constructor(string memory description, string memory symbol, uint256 cap) //initialize the contract
    ERC20() //ERC20 functions
    ERC20Detailed(description, symbol, 18) //description symbol decimals
    Ownable()
    public {
        _cap = cap;
    }

    function cap() public view returns (uint256) {
        return _cap;
    }

    function mint(uint256 value) public onlyOwner returns (bool) {
        require(totalSupply().add(value) <= _cap, "Cap exceeded");
        _mint(msg.sender, value);
        return true;
    }

    function burn(uint256 value) public onlyOwner returns (bool) {
        _burn(msg.sender, value);
        return true;
    }

    function frozenOf(address account) public view returns (uint256) {
        return _frozen[account];
    }

    function freeze(address account, uint256 value) public onlyOwner returns (bool){
        _burn(account, value);
        _frozen[account] = _frozen[account].add(value);
        emit Freeze(account, value);
        return true;
    }

    function unfreeze(address account, uint256 value) public onlyOwner returns (bool){
        _frozen[account] = _frozen[account].sub(value);
        require(totalSupply().add(value) <= _cap, "Cap exceeded");
        _mint(account, value);
        emit Unfreeze(account, value);
        return true;
    }
}