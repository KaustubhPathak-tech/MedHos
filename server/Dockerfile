# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install


ENV JWT_SECRET="test_12" PORT="7000" CONNECTION_URL="mongodb+srv://Admin:SKA9A1LD1ZRnpmZg@stack-overflow-clone.kbyvwka.mongodb.net/MedHos?retryWrites=true&w=majority" CLIENT_ID="351222125412-4bf5d4qk2056gro080igf0clmpvnr0kf.apps.googleusercontent.com" CLIENT_SECRET="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" REFRESH_TOKEN="1//04j6yakM4rs7YCgYIARAAGAQSNwF-L9IrpbaB3e5XDzh6eHIk4E7HYP0k0qtbzbL9AjBEp0pMeo0yvi7eHGfZt7Ndmk6x9bjwMYk" Stripe_test="sk_test_51MpOpKSDYoz6IJUAKN1yyepKMkLbcv1KiZSLzeMCrcwaQYwGMUGNCRA8kAGiqzAToFfOSPbu2wmR1r0n0spnIN6f00F5Z8PWMI" Stripe_secret="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" webhook_secret="whsec_ec988f43da1788330b503841241accd30c20112855d009eeeec53df2bfbf98d7" D7SMS="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiMmRhMGUyNTgtMzQwMi00NzgzLWEwMzAtOWU3ODJjYWRlYWYzIn0.xjc_sV4-s03tHEOg4o70snKoiz2sLf9in_iia6gwT1o"

# Expose the port the app runs on
EXPOSE 7000

# Define the command to run your app
CMD ["npm", "start"]
