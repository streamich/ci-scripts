const isDryRun = ({params = {}}) =>
    params.plan
    || params['dry-run']
    || process.env.DRY_RUN
    || process.env.CI_PLAN;

module.exports = isDryRun;
