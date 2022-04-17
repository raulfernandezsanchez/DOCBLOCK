// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract DocBlock {
  address owner;
  mapping (string => Sign[]) public signs;

  struct Sign {

    string document;
  }

  constructor() public {
    owner = msg.sender;
  }

  event signAdded(address user, string name, string document);

  function sign(string memory name, string memory document) public {
    require(bytes(name).length > 0, "name is empty!");
    require(bytes(document).length > 0, "document is empty!");

    Sign memory newSign = Sign(document);
    signs[name].push(newSign);
    emit signAdded(msg.sender, name, newSign.document);
  }

  function get(string memory name, uint256 index) public view returns (string memory) {
    require(0 <= index && signs[name].length >= index, "array index out of bounds!");
    return signs[name][index].document;
  }
}
