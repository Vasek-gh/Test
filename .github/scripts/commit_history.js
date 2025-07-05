module.exports = async ({core, exec}) => {
    try {

        const lastTag = await execCommand(`gh release list --json tagName --limit 1 --template '{{range .}}{{.tagName}}{{end}}'`);
        core.info(`lastTag: ${lastTag}`);
        await execCommand(`git fetch --shallow-exclude=${lastTag}`);
        const commits = await execCommand("git log --pretty=format:%h)");
        core.info(`Commits: ${commits}`);
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