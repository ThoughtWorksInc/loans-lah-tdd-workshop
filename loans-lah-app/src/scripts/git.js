const getRepoInfo = require('git-repo-info');
const fs = require('fs');

var gitInfo = getRepoInfo();

const info = {
    git: {
        branch: gitInfo.branch,
        commit: {
            id: gitInfo.abbreviatedSha,
            time: gitInfo.committerDate
        }
    }
}

fs.writeFile ("build/git.json", JSON.stringify(info), function(err) {
    if (err) throw err;
});