const parse = require('node-html-parser').parse;
const fetch = require('node-fetch');
const fs = require('fs-extra');

const promises = [];

async function getArtBlocksPlatform () {
    const platform = {};

    const response = await fetch(`https://api.artblocks.io/platform`);
    const html = await response.text();

    const body = parse(html).querySelector('body');

    body.childNodes.forEach((node, i) => {
        if (node.tagName === 'pre') return;

        keyValue = node.text.split(':');
        if (keyValue.length >= 2 && keyValue[1]) {
            platform[keyValue.shift().split(' ').join('_').toLowerCase()] = keyValue.join(':').trim();
        }
    });

    platform.projects_list = platform.projects_list.split(',').map((p) => parseInt(p));
        return platform.projects_list;
};

async function getArtBlocksProject (id) {
    const project = { id };

    const response = await fetch(`https://api.artblocks.io/project/${id}`);
    const html = await response.text();

    const body = parse(html).querySelector('body');

    body.childNodes.forEach((node, i) => {
        if (node.tagName === 'pre') return;

        let nodeText = node.text;
        keyValue = nodeText.split(':');
        keyValue = keyValue.length === 1 ? nodeText.split('?') : keyValue;

        if (keyValue.length >= 2 && keyValue[1]) {
            project[keyValue.shift().split(' ').join('_').toLowerCase()] = keyValue.join(':').trim();
        }
    });

    if (project.http || project.https) {
        project.website = `http${project.https ? `s:${project.https}` : `:${project.http}`}`;
        delete project.http;
        delete project.https;
    }

    project.token_ids = [];
    for (let i = 0; i < project.invocations; i++) {
        project.token_ids.push(id * 1000000 + i);
    }

        return project;
};

async function isFactoryProject (id) {

       let tokenid = id*1000000;
       let is_factory = false;
       try {
           const response = await fetch(`https://api.artblocks.io/token/${tokenid}`, { timeout: 5000 });
           const json = await response.json();
           console.log(json.curation_status);
           if (json.curation_status == "factory") {
               is_factory = true;
           } 
       } catch (err) {
           console.error(err);
       } 

       return is_factory;

}

module.exports.getArtBlocksProject = getArtBlocksProject;
module.exports.isFactoryProject = isFactoryProject;
module.exports.getArtBlocksPlatform = getArtBlocksPlatform;
