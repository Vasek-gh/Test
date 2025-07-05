module.exports = async ({core, prListJson}) => {
    try {
        core.info(`Json ${prListJson}`);
    }
    catch(e) {
        core.setFailed(e);
    }
}