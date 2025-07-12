# Design-Ghar
## Frontend Deployment

To deploy the frontend:

1. Run `npm run build` to generate the production-ready files in the `dist` folder.
2. Place your `netlify.toml` configuration file inside the `dist` folder.
3. Open the Netlify portal, navigate to your project, and drag and drop the entire `dist` folder for deployment.
4. Netlify will process the upload and your site will be deployed successfully.

**Note:**  
When setting environment variables (such as API URLs) in Netlify, ensure that the URL ends with a `/`. For example:  
```
VITE_API_URL=https://your-backend-domain.com/
```
This is important because the code expects endpoint URLs to have a trailing slash.

## Backend Deployment

To deploy the backend:

1. Build your Docker image:
    ```bash
    docker build -t your-app-name:latest .
    ```
2. Tag the image for Docker Hub:
    ```bash
    docker tag your-app-name:latest your-dockerhub-username/your-app-name:latest
    ```
3. Push the image to Docker Hub:
    ```bash
    docker push your-dockerhub-username/your-app-name:latest
    ```
4. In Render, create a new web service and select "Deploy from Docker" using the Docker Hub image tag you just pushed.
5. Render will pull the image and deploy your backend application.

**Note:**  
When setting environment variables (such as API URLs) in Render, make sure the URL ends with a `/` to match how endpoints are used in the code.