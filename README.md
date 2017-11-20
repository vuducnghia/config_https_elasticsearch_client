# config_https_elasticsearch_client by NGINX with NODEJS

use elasticsearch(2.3)(use http protocol) for client by https protocol

#####   1, npm install

#####	2, config private key and certificate, then link file server.js : 
	*) sudo mkdir /etc/nginx/ssl
	*) sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt

#####	3, create file 

#	sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example 			// copy file default to example , then config file example (clean file then add code ):
	
		server {
			listen 8081;
			server_name demo;	
	
			location /{
				proxy_pass http://192.168.1.4:9200;
			}
		}

		# https  // default port https : 443

		server {
			listen 443;
			server_name demo;
	
			location /{
		        	proxy_pass http://192.168.1.4:9200;    // port elasticsearch, ip elasticsearch default localhost, ex  http://localhost:9200
			}

			ssl on;
			ssl_certificate /etc/nginx/ssl/server.crt;
			ssl_certificate_key /etc/nginx/ssl/server.key;

		}
	
#	cd /etc/nginx/sites-enabled  
#	sudo ln -s /etc/nginx/sites-available/example example   	// refer file example in sites-available to sites-enabled 

#####	4, custom host : 
		cd /etc/
		sudo nano hosts 	// add host custom   ex :     127.0.1.2    demo   (demo is new name host)

#####	5, resart nginx :  sudo service nginx restart
#####	6, run elasticsearch in your computer
#####	6, node server.js  and https://demo:port
