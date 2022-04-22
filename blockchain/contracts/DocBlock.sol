// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

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

  function get(string memory name) public view returns (Sign [] memory) {
    require(bytes(name).length > 0, "name is empty!");
    return signs[name];
  }
}
