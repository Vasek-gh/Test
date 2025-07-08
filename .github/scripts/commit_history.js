module.exports = async ({core, commitList}) => {
    try {
        core.info(`commitList ${commitList}`);

        const prList = execCommand(`gh pr list --state closed --search "${commitList}" --json "number,url,title,closingIssuesReferences,mergeCommit"`);
        core.info(`prList ${prList}`);
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