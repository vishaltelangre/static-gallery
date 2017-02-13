### To run locally

```sh
$ npm start
```

### To build

```
$ npm run build
```

### NGINX config

```
# /etc/nginx/sites-enabled/clicks_vishaltelangre

server {
    listen 0.0.0.0:80;
    server_name clicks.vishaltelangre.com;
    access_log /var/log/nginx/clicks_vishaltelangre.log;
    gzip on;

    location / {
        root /home/deployer/projects/clicks;
        try_files $uri $uri/ /;
    }
}
```
