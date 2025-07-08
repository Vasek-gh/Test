module.exports = async ({core, exec, commitList}) => {
    try {
        core.info(`commitList ${commitList}`);

        const prList = await execCommand(`gh pr list --state closed --search "${commitList}" --json "number,url,title,closingIssuesReferences,mergeCommit"`);
        const obj = JSON.parse(prList);
        core.info(`prList ${prList}`);
        core.info(`obj ${obj}`);

        /*for (const pr of prList) {
            core.info(`found pr: ${pr.number} ${pr.title} ${pr.url}`);
        }*/
    }
    catch(e) {
        core.setFailed(e);
    }

    async function execCommand(command) {
        const {
            exitCode,
            stdout,
            stderr
        } = await exec.getExecOutput(command);

        if (exitCode === 0) {
            core.info(`Res ${stdout}`);
            return stdout;
        }

        throw new Error(`The process failed with code: ${exitCode}`);
    }
}