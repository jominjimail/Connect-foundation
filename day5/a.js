const _ = require("lodash")
const data = require("./d.js");

const Checker = class {
    constructor(msg) {
        this.msg = msg;
    }
    bindMembers(targets) {
        return  (source) => {
            return new Promise( (resolve) => {
                //반드시 10밀리세컨드 지연실행되어야만 함
                setTimeout( function () {
                    const bMember = this.includeMembers(source, targets);
                    if (bMember) {
                        resolve(this.msg["ok"].msg);
                    }else{
                        resolve(this.msg["fail"].msg);
                    }
                }.bind(this), 10);
            })
        }
    }

    //lodash의 every 메서드를 활용해서 구현
    includeMembers(source ,targets) {
        console.log(source, targets);
        const res = _.every(targets,function(item) { 
            return source.includes(item);
        } );
        console.log(res);
        return res;
    }
}

const runner = function (generator, names, ourStudents) {
    let generator_fun = generator(names, ourStudents);
    let promise = generator_fun.next();

    generator_fun.next(promise.value);
}

exports.Checker = Checker
exports.runner = runner

module.exports;