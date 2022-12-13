// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract GasB {
    address payable public owner;
    event Withdrawal(uint256 amount, uint256 when);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function _check() internal view {
        require(msg.sender == owner, "You are not the owner");
        uint256 balance = address(this).balance;
        require(balance > 0, "Nothing here");
    }

    function setOwner(address payable owner_) external {
        _check();
        owner = owner_;
    }

    function withdraw() public {
        _check();
        uint256 balance = address(this).balance;
        emit Withdrawal(balance, block.timestamp);

        owner.transfer(balance);
        owner = payable(address(0));
    }
}
