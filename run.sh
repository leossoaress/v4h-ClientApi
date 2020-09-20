docker rm v4h-example -f
docker build -t v4h-example-img .
docker run -it -p 80:80 -p 443:443 -d --name v4h-example v4h-example-img
