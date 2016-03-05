install:	pull test /opt/nginx-1.2.8/react/bundle.js /opt/nginx-1.2.8/react/index.html

pull:
	git pull

test:
	node_modules/.bin/jest

bundle.js:	app/Content.js app/style.css
	node_modules/.bin/webpack

/opt/nginx-1.2.8/react/bundle.js:	bundle.js
	cp bundle.js /opt/nginx-1.2.8/react/

/opt/nginx-1.2.8/react/index.html:	index.html
	cp index.html /opt/nginx-1.2.8/react/

