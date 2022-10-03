// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Blink {
    uint public myData;

    event blinkEvent(uint data);

    function getData() public view returns (uint retData) {
        return myData;
    }

    function setData(uint theData) public{
        myData=theData;
        emit blinkEvent(myData);
    }
}
