Now
* use background to save app params on action click when closing
* save app params when ap is closed due to page close/reload
* agent-prefix maker
* schematize app-cs-agent-bg messages to conform to a single logic
* improve app messages layout
* fix scrolling to the top of the window on new song
* redo app starting (static content-script + listening to agent event)
* extension icons on-waiting-off for action
* big comment section for files
* sanitize code and css
 ** rework background and cs
 ** manage constants better
 ** swap to 'is' boolean naming
 ** error proofing & console messages styling (debug mode?)
 ** style (color vars)
 ** unify app prefix and event names
 ** unify filenames (hyphen/camelcase)
 ** manifest by https://developer.chrome.com/docs/extensions/mv3/manifest/
 ** document everything
 ** thoroughly comment everything
* set repo protection before making public
* make actual readme

Later
* (try postcss)
* wave svg for scroll blur
* render scroll blur smoothly on scroll independently from padding

Later-later
* typescript