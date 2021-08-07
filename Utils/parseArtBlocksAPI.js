const parse = require('node-html-parser').parse;
const fetch = require('node-fetch');
const fs = require('fs-extra');

const promises = [];
const token_max = 1e6;

async function getArtBlocksPlatform () {
    const platform = {};
    try {
    const response = await fetch(`https://api.artblocks.io/platform`, { timeout: 5000 });
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
    } catch (err) {
        console.error(err);
        return [];
    } 
};

async function getArtBlocksProject (id) {
    const project = { id };
 
    try {
        const response = await fetch(`https://api.artblocks.io/project/${id}`, { timeout: 5000 });
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

	project.token_ids = [];
	for (let i = 0; i < project.invocations; i++) {
	    project.token_ids.push(id * token_max + i);
	}

    } catch (err) {
        console.error(err);
        return undefined;
    } 
    return project;
};

async function isFactoryProject (id) {

       let tokenid = id * token_max;
       let is_factory = false;
       try {
           const response = await fetch(`https://api.artblocks.io/token/${tokenid}`, { timeout: 5000 });
           const json = await response.json();
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
