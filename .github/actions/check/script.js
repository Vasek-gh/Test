module.exports = async ({github, context, core, exec}) => {
    core.warning('Test warn');
    core.info('Test info');
    core.notice('Test notice');

    const output = 0;
    const exitCode = 0;
    [exitCode, output] = runGitCommand('describe --tags $(git rev-list --tags --max-count=1)');

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

        console.log(`${exitCode} => ${exitCode}`);

        if (exitCode === 0) {
            console.log(`111: ${[0, stdout]}`);
            return [0, stdout];
        }

        console.log(`222: ${[exitCode, stderr ?? stdout]}`);

        return [exitCode, stderr ?? stdout];
    }
}