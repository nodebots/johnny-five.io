# johnny-five.io

The repo for the [johnny-five.io website](http://johnny-five.io).

## Prerequisites

- node
- npm
- sass gem (which requires ruby)

```
brew install node
gem install sass
```

## Setup 

```
npm install
```

## Content Building

Content displayed on johnny-five.io is sourced from two other repos:

- [https://github.com/rwaldron/johnny-five.git](https://github.com/rwaldron/johnny-five)
    + Example programs
        * Breadboard images
        * Breadboard fritzing files
        * tpl/programs.json
        * tpl/titles.json
- [https://github.com/rwaldron/johnny-five.wiki.git](https://github.com/rwaldron/johnny-five/wiki)
    + API Documentation

The content is consumed and processed via grunt tasks that output the website-ready versions of the content to the `public/` directory. 

-------
Bootstrap site content from remote repos: 

```
grunt bootstrap
```

Regenerate all local content from remote content sources: 

```
grunt regen
```

Development automation and server: 

```
grunt && grunt dev
```
-------


- Tasks
    + `dev` Run the `connect`, `launch`, and `watch` tasks.
        * `connect`: connect the server
        * `launch`: open the site in a browser
        * 
    + `bootstrap`: Run the `clean:deps`, `gitclone` and `copy` tasks.
        * Clean out remote content source dependencies and clone the the latest master branch of the johnny-five and johnny-five.wiki repos into the `src/` directory. Copy static resources to `public/`
    + `regen` Run `index`, `articles-from-rss`, `examples-list`, `examples`, `api-docs` and `platform-support` tasks.
    + `index` generates `public/index.html`
        * Materials & Sources: 
            - `src/platforms-plugins.json`
            - `src/tpl/.index.html`
            - `src/css/style.scss`
            - `src/img/*`
            - `src/img/platforms/*`
    + `articles-from-rss` generates article lists from a given set of rss feed targets. 
        * Materials & Sources: 
            - `tpl/.articles.html`
            - `tpl/rss-list.html`
    + `examples-list` generates `public/examples.html`
        * Materials & Sources: 
            - `tpl/.examples.html`
            - `src/johnny-five/README.md`
    + `examples` generates `public/examples/*.html`
        * Materials & Sources: 
            - `tpl/.example-content.html`
            - `src/johnny-five/README.md`
            - `src/johnny-five/tpl/programs.json`
            - `src/johnny-five/tpl/titles.json`
            - `src/johnny-five/docs/breadboard/*.png`
    + `api-docs` generates `public/api.html` and `public/api/*.html`
        * Materials & Sources: 
            - `tpl/.api.html`
            - `tpl/.api-content.html`
            - `src/johnny-five.wiki/Home.md`
            - `src/johnny-five.wiki/[API PAGES].md`
            - `src/johnny-five/docs/breadboard/*.png`
    + `platform-support` generates `public/platform-support.html` 
        * Materials & Sources: 
            - `tpl/.platform-support.html`
            - `tpl/.platform-variant.html`
            - `src/platforms-plugins.json`
            - Images in `src/img/platforms/`
                + 500x500 PNG
                + 270 pixels/inch
                    * This is the Fritzing default, it looks nice on retina displays. 
                    

## Continuous Deployment

Merging or resetting `production` will automatically trigger a deploy to johnny-five.io, and merging to `master` will deploy to staging.johnny-five.io.

In the (hopefully) rare instance you need to manually deploy the steps are below.

## Manual Deployment

### Test-deploying a local commit (Vagrant)

1. Run `./deploy/run-playbook.sh deploy vagrant local=true commit=_____` where
	 `_____` is the local commit ref (branchname, SHA, etc) to deploy. For a
	 complete list of options, see the [deploy role docs][deploy].
	 * Simulate deploying to production or staging by adding `env=production` or
		 `env=staging` to the end of this command.
1. Browse to <http://people.loc/>

[deploy]: https://deployment-workflow.bocoup.com/#deploy-role

### Deploying to staging

1. Run `./deploy/run-playbook.sh deploy staging commit=_____` where `_____` is
	 the commit ref (branchname, SHA, etc) in GitHub. Defaults to `HEAD`. For a complete list of
	 options, see the [deploy role docs][deploy].
1. Enter your [dploy][dploy] sudo password when asked.

### Deploying to production

1. Run `./deploy/run-playbook.sh deploy production commit=_____` where `_____`
	 is the commit ref (branchname, SHA, etc) in GitHub. Defaults to `HEAD`. For a complete list of
	 options, see the [deploy role docs][deploy].
1. Enter your [dploy][dploy] sudo password when asked.

[dploy]: https://github.com/bocoup/infrastructure/blob/master/ansible/group_vars/all.yml
