module.exports = async ({core, prJson}) => {
    try {
        const prList = JSON.parse(prJson);

        const lines = [];
        lines.push(`## 2.2.2(${new Date().toISOString().split('T')[0]})`);
        lines.push(`### Changes`);
        lines.push(...prFilter(prList, pr => hasLabel(pr, "feature") || hasLabel(pr, "enhancement")).map(createPrRow));
        lines.push(`### Fixes`);
        lines.push(...prFilter(prList, pr => hasLabel(pr, "bug fix")).map(createPrRow));

        core.info(lines.join(`\n`));
    }
    catch(e) {
        core.setFailed(e);
    }

    function prFilter(srcPrList, predicate) {
        const result = [];

        const numberSet = new Set();
        for (const pr of srcPrList) {
            if (numberSet.has(pr.number) || !predicate(pr)) {
                continue;
            }

            result.push(pr);
            numberSet.add(pr.number);
        }

        return result;
    }

    function createPrRow(pr) {
        return `* ${pr.title} by [**@${pr.author.name}**](https://github.com/${pr.author.login}) in [**#${pr.number}**](${pr.url})`
    }

    function hasLabel(obj, labelPattern) {
        for (const label of obj.labels) {
            if (label.name?.toLowerCase() === labelPattern) {
                return true;
            }
        }

        return false;
    }
}