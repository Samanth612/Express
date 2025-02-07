# Express Framework Setup

npm init -y

npm install express mongoose dotenv cors jsonwebtoken bcryptjs zod

npm install --save-dev typescript ts-node @types/node @types/express @types/cors @types/jsonwebtoken @types/bcryptjs nodemon

npm i nodemon

# Important note

while deploying express js with mongoDB into AWS remove npm run dev mean from scripts remove dev keep only build, start

After process is done like

eb init

npm run build

tar -a -c -f deploy.zip dist package.json package-lock.json Procfile // Create a deploy.zip file

eb create my-express-app

eb logs

Add Environment properties in AWS elastic beanstalk Environment configuration file

Go to the MongoDB Atlas dashboard.

Navigate to Network Access → Add your AWS Elastic Beanstalk's public IP range (e.g., 0.0.0.0/0 for testing, though not recommended for production).

eb deploy

eb open
