module.exports = async ({github, context, core, exec}) => {
    try {
        const tag = await runGitCommand('describe --tags $(git rev-list --tags --max-count=1)');
        const commits = await runGitCommand('log v.0.0.2..HEAD --pretty=format:%h');

        const isBug = false;
        if (isBug) {
            throw new Error("Bug")
        }
    }
    catch(e) {
        core.error((e));
        core.setFailed(e);
    }

    async function runGitCommand(args) {
        const {
            exitCode,
            stdout,
            stderr
        } = await exec.getExecOutput('git', args.split(' '));

        if (exitCode === 0) {
            return stdout;
        }

        throw new Error(`The process failed with code: ${exitCode}`);
    }
}