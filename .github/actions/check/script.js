module.exports = async ({github, context, core, exec}) => {
    try {
        await runGitCommand('tag');
        await runGitCommand2("describe --tags `git rev-list --tags --max-count=1`");
        await runGitCommand();
        const prevCommit = await runGitCommand('rev-list --tags --max-count=1');
        const tag = await runGitCommand(`describe --tags ${prevCommit}`);
        const commits = await runGitCommand('log v.0.0.2..HEAD --pretty=format:%h');

        const isBug = false;
        if (isBug) {
            throw new Error("Bug")
        }
    }
    catch(e) {
        core.setFailed(e);
    }

    async function runGitCommand(args) {
        const {
            exitCode,
            stdout,
            stderr
        } = await exec.getExecOutput('git', args.split(' '));

        if (exitCode === 0) {
            core.info(`Res ${stdout}`);
            return stdout;
        }

        throw new Error(`The process failed with code: ${exitCode}`);
    }

    async function runGitCommand2(...args) {
        const {
            exitCode,
            stdout,
            stderr
        } = await exec.getExecOutput('git', args);

        if (exitCode === 0) {
            core.info(`Res ${stdout}`);
            return stdout;
        }

        throw new Error(`The process failed with code: ${exitCode}`);
    }
}