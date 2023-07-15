// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Token {
    string public tokenName = "TOKEN";
    string public tokenAbbrv = "TKN";
    uint public totalSupply = 0;
    mapping(address => uint) public balances;

    function mint(address _address, uint _value) public {
        require(_address != address(0), "Invalid address");
        totalSupply += _value;
        balances[_address] += _value;
    }

    function burn(address _address, uint _value) public {
        require(_address != address(0), "Invalid address");
        require(balances[_address] >= _value, "Insufficient balance");

        totalSupply -= _value;
        balances[_address] -= _value;
    }

    function exampleFunction(uint _value) public {
        assert(_value > 0);

        if (_value < 10) {
            revert("Value must be at least 10");
        }

    }
}
