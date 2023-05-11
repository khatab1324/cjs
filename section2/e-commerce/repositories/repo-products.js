const express = require("express");
const Repository = require("./repositories");

class RepositoriesProducts extends Repository {}
module.exports = new RepositoriesProducts("products.json");
