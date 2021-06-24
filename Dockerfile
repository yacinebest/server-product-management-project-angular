# we generate dist folder using 
#ng build --prod
#docker build -t product-management-frontend-angular .
FROM nginx:1.17.1-alpine
COPY /dist/client-product-management /usr/share/nginx/html