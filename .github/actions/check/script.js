module.exports = async ({github, context, core, exec}) => {
    core.warning('Test warn');
    core.info('Test info');
    core.notice('Test notice');

    const output = 0;
    const exitCode = 0;
    [exitCode, output] = await runGitCommand('describe --tags $(git rev-list --tags --max-count=1)');
    if (exitCode !== 0) {
        core.error((`${exitCode} => ${output}`));
        //core.setFailed('Fail');
        return;
    }

    core.info(`${exitCode} => ${output}`);

    [exitCode, output] = await runGitCommand('log v.0.0.2..HEAD --pretty=format:%h');

    core.info(`${exitCode} => ${output}`);

    const isBug = false;
    if (isBug) {
        core.setFailed('Fail')
    }

    async function runGitCommand(args) {
        try {
            const {
                exitCode,
                stdout,
                stderr
            } = await exec.getExecOutput('git', args.split(' '));
        } catch(e) {
            return [123, e];
        }

        core.info(`${exitCode} => ${exitCode}`);

        if (exitCode === 0) {
            core.info(`111: ${[0, stdout]}`);
            return [0, stdout];
        }

        core.info(`222: ${[exitCode, stderr ?? stdout]}`);

        return [exitCode, stderr ?? stdout];
    }
}