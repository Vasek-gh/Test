module.exports = async ({github, context, core, exec}) => {
    try {
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