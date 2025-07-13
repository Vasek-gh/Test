module.exports = async ({core, fs}) => {
    try {
        const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');

        const matches = [...changelog.matchAll("## ([0-9].[0-9].[0-9])")];
        if (!matches) {
            throw new Error("empty match");
        }

        const notesLength = matches.length < 2
            ? undefined
            : matches[1].index - matches[0].index;

        const result = {
            version: matches[0][1],
            notes: changelog.substring(matches[0].index, notesLength)
                .split("\n")
                .slice(1)
                .join("\n")
        }

        core.info(result.version);
        core.info(result.notes);

        core.setOutput('version', result.version);
        core.setOutput('notes', result.notes);
    }
    catch(e) {
        core.setFailed(e);
    }
}