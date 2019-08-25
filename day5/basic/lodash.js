const _ = require("lodash");
const data = require("./d.js");

function includeMembers2(source ,targets) {
    return _.every(targets,function(item) { 
        return source.includes(item);
    } );
}


console.log(includeMembers2(data.ourStudents, ['crong', 'jk']));
