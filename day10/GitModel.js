
let file = require("./File.js");

// var today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); 
// 출처 : https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs

function GitModel(data){
    this.data = data;

}
GitModel.prototype = {
    makeFile([filename],local){
        var today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var file_calss = new file(filename,today);
        console.log(...local.files);
        const newData = [
            ...local.files, 
            file_calss
        ];
        local.files = newData;
        console.log(local);
    },
    showStatus(local){
        let printOut = '';
        printOut += getXStatus(local.files, ["Untracked","Modified"],"---Working Directory/\n");
        printOut += getXStatus(local.files, ["Staged"], "\n---Staging Area/\n");
        printOut += getXStatus(local.files, ["Unmodified"],"\n---Git Repository/\n");
        console.log(printOut);
    },
    moveStage([filename],local){
        let foundFile = local.files.find(element => element.name === filename);
        if(foundFile !== undefined){
            foundFile.status = "Staged";
            console.log(getXStatus(local.files, ["Staged"], "---Staging Area/\n"));
        }else{
            console.log(`No exist ${filename}`);
        }
    },
    moveRepo([...ment],local){
        var today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let filestr = '';
        
        local.files.forEach(function(element) {
            if(element.status === "Staged"){
                element.status = "Unmodified";
                element.commitTime = today;
                filestr += element.name;
                filestr += " ";
                filestr += element.commitTime;
                filestr += "\n";
            }
        });
        console.log(getXStatus2(local.files, ["Unmodified"], "---commit files/\n"));
        let line = ment2string(ment);
        local.log.push(`commit "${line}"\n${filestr}`);
    },
    editFile([filename],local){
        var today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        local.files.forEach(function(element) {
            if(element.status === "Unmodified" && element.name === filename){
                element.status = "Modified";
                element.timestamp = today;
            }
        });
        console.log(getXStatus(local.files, ["Untracked","Modified"],"---Working Directory/\n"));
    },
    printlog(local){
        local.log.forEach(element => console.log(element));
    },
    filterFile(local){
        let new_file = [];
        local.files.forEach(function(element){
            if(element.status === "Unmodified"){
                new_file.push(element);
            }
        });
        return new_file;

    }
};

function getXStatus(list, state,ment){
    return ment+ `${list.filter(element => state.includes(element.status)).map(function(element){
        return `${element.name} ${element.timestamp}`;
    })}`
}

function getXStatus2(list, state,ment){
    return ment+ `${list.filter(element => state.includes(element.status)).map(function(element){
        return `${element.name} ${element.commitTime}`;
    })}`
}

function ment2string([first,...others]){
    return others.reduce( (acc, currentValue) => {
        return acc+" "+currentValue;
    },first);
}


module.exports = GitModel;
