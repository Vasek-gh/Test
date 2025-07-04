module.exports = async ({github, context, core}) => {
    core.warning('Test warn');
    core.info('Test info');
    core.notice('Test notice');

    const isBug = false;
    if (isBug) {
        core.setFailed('Fail')
    }
}