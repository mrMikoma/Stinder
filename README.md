# Stinder
Skinnarila-Tinder

# Local installation

## 0. Make sure you have node, npm, git and docker installed

```node --version```
```npm --version```
```git --version```
```docker --version```

## 1. Clone project from GitHub

```git clone https://github.com/mrMikoma/Stinder.git```
```cd Stinder/```

## 2. Install dependencies

```npm install```

## 3. Set up database

```docker pull mongo```
```docker run -d --name mongodb -p 27017:27017 mongo ```

## 4. Create .env.local file

```echo "AUTH_SECRET=something secret > .env.local```
```echo "MONGODB_URI=mongodb://localhost:27017" > .env.local```
```echo "DB_NAME=hassutietokanta" >> .env.local```

## 5. Run project
```npm run dev```

### Your Next.js application should now be running locally at http://localhost:3000 


