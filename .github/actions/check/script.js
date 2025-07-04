module.exports = async ({github, context, core, exec}) => {
    core.warning('Test warn');
    core.info('Test info');
    core.notice('Test notice');

    const output = 0;
    const exitCode = 0;
    [exitCode, output] = runGitCommand('describe --abbrev=0 --tags');

    console.log(`${exitCode} => ${output}`);

    [exitCode, output] = runGitCommand('log v.0.0.2..HEAD --pretty=format:%h');

    console.log(`${exitCode} => ${output}`);

    const isBug = false;
    if (isBug) {
        core.setFailed('Fail')
    }

    async function runGitCommand(args) {
        const {
            exitCode,
            stdout,
            stderr
        } = await exec.getExecOutput('git', args.split(' '));

        if (exitCode === 0) {
            return [0, stdout];
        }

        if (exitCode === 0) {
            return [exitCode, stderr ?? stdout];
        }
    }
}