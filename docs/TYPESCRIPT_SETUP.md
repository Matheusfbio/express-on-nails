# Setting Up TypeScript with Express

This guide will walk you through the steps to install and configure TypeScript in your Express application.

## Prerequisites
Make sure you have Node.js installed on your machine.

## 1. Install TypeScript and Express Types
You can install the required packages using npm:

```bash
npm install typescript @types/node @types/express --save-dev
```

## 2. Create a `tsconfig.json` File
In the root of your project, you need to create a `tsconfig.json` file to define the TypeScript compiler options. You can do this with the following command:

```bash
npx tsc --init
```

Edit the `tsconfig.json` file and update it with the following content:
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 3. Create an Entry Point
Create a new folder named `src` and inside it create a file named `index.ts`:
```typescript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello TypeScript with Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

## 4. Build and Run Your Application
Add the following scripts to your `package.json` file:
```json
"scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
}
```
To build the project, run:
```bash
npm run build
```
To start the application:
```bash
npm start
```

## Conclusion
You now have a basic setup for using TypeScript with Express. You can extend this setup as per your application's requirements!