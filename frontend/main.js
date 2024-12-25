const applyStyle = function(elem, record){
    for(let key in record){
        elem.style[key] = record[key];
    }
}


const dataChannel;// backend data representation

const insertAfter = function(parent, elem, newelem){
    if(elem.nextSibling){
        parent.insertBefore(newelem, elem.nextSibling);
    }else{
        parent.appendChild(newElem);
    }
}

class CommitView{
    constructor(commitData){
        const wrapper = document.createElement("div");
        const circle = document.createElement("div");
        const 
    }
}

class branchView{
    constructor(){
        this.elem = document.createElement("div");
        applyStyle(this.elem, {
            width: "300px",
            backgroundColor: "#eee",
            overflow: "scroll",
        });
    }
    commits = new Map;//hash -> child object
    clearCommits(){
        for(let [hash, commit] of this.commits){
            this.removeCommit(commit);
        }
    }
    // commits are handled as commit object, which is an instance of CommitView sclass
    addCommit(commit){
        if(commit.prev){
            const prev = this.commits.get(commit.prev);
            if(!prev)return errorMgr.raise("previous commit DNE");
            // make the correction to the previous commit
            // gonna have to revise this, if we were to base this on CRDT
            prev.next = commit.hash;
            // the order is reversed, because the top commit will be the newest commit
            this.elem.insertBefore(commit.elem, this.commits.get(commit.prev));
        }else if(commit.next){
            const next = this.commits.get(commit.next);
            if(!next)return errorMgr.raise("next commit DNE");
            next.prev = commit.hash;
            insertAfter(this.elem, next.elem, commit.elem);
        }else{// the first and only commit
            this.elem.prepend(commit.elem);
        }
    }
    removeCommit(commit){
        this.elem.removeChild(commit.elem);
        this.commits.delete(commit.hash);
    }
    setBranch(hash){
        const commits = await dataChannel.getBranchInfo(hash);
        // linked list, when an update happens, it changes one at a time
        // example of update
        // {
        //     prev: "hashgyaig176",
        //     operation: "add",// add, delete
        //     commit: {...payload},
        // }
        this.clearCommits();
        for(let commitData of commits){
            const commit = new CommitView(commitData);
            this.addCommit(commit);
        }
    }
}



