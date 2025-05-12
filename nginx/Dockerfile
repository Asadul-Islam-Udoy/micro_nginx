FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Step 4: Expose Ports
EXPOSE 80
EXPOSE 443

# Step 5: Run Services
CMD ["nginx", "-g", "daemon off;"]