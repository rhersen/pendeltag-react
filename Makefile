install:	pull test /opt/nginx/secure/react/bundle.js /opt/nginx/secure/react/index.html

pull:
	git pull

test:
	node_modules/.bin/jest

bundle.js:	app/Content.js app/main.js app/Navs.js app/Trains.js app/style.css
	node_modules/.bin/webpack

/opt/nginx/secure/react/bundle.js:	bundle.js
	cp bundle.js /opt/nginx/secure/react/

/opt/nginx/secure/react/index.html:	index.html
	cp index.html /opt/nginx/secure/react/
