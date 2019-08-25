const Manager = require('./Manager.js');
const Chashier = require('./Chashier.js');

const manager  = new Manager();

const chashier = new Chashier(manager);

chashier.input();
