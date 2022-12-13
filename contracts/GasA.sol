// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract GasA {
    address payable public owner;
    event Withdrawal(uint256 amount, uint256 when);

    constructor() payable {
        owner = payable(msg.sender);
    }

    modifier check() {
        require(msg.sender == owner, "You are not the owner");
        uint256 balance = address(this).balance;
        require(balance > 0, "Nothing here");
        _;
    }

    function setOwner(address payable owner_) external check {
        owner = owner_;
    }

    function withdraw() public check {
        uint256 balance = address(this).balance;
        emit Withdrawal(balance, block.timestamp);

        owner.transfer(balance);
        owner = payable(address(0));
    }
}
