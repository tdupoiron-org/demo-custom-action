const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");

// Get Input Parameters
const repoOwner = core.getInput('repo_owner');
const repoName = core.getInput('repo_name');
const repoVisibility = core.getInput('repo_visibility');
const token = core.getInput('token')

const octokit = new Octokit({
  auth: token,
});

async function createRepository(repoOwner, repoName, repoVisibility) {

    octokit.rest.repos.createInOrg({
        org: repoOwner,
        name: repoName,
        visibility: repoVisibility
    }).then(({ data }) => {
        core.setOutput("repo_id", data.id);
        core.setOutput("repo_full_name", data.full_name);
        core.setOutput("repo_url", data.html_url);
    }
    ).catch((error) => {
        core.setFailed(error.response.data.message);
    }
    );
}

createRepository(repoOwner, repoName, repoVisibility);