const File = class{
    constructor(name,today){
        this.name = name;
        this.status = "Untracked";
        this.timestamp = today;
        this.commitTime = "";
    }
}

module.exports = File;