# Short Overview: 
I have made a project as per the requirements. My project is related to book and its purchase.




# Frontend Github Repo: https://github.com/ShakilJoy31/refer-frontend
# Backend Github Repo: https://github.com/ShakilJoy31/refer-server
# Project Live Link: https://refer-frontend-nu.vercel.app




# Installation and Setup:
1. Clone the project by this command one your terminal. 'git clone https://github.com/ShakilJoy31/refer-frontend' and 'git clone https://github.com/ShakilJoy31/refer-server' 
2. On the project's terminal run 'npm install'
3. After the installation complete run 'npm run dev' to start the project locally.




# .env data: 
PORT=8000
MONGO_URI=mongodb+srv://shakidul31_db_user:eL7g3scDYAW1Wpbf@cluster0.vz2njx6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0




# Features I have implemented: 
1. User can Signup with refer and without refer. After the signup user can login with the valid crediential. 

2. If user signup without being refered he will be considered as Real User and if refered by someone he will be considered as Refered User. You can see this at My Profile page. (/user/profile)

3. If an user (Refered or Unrefered) purchase book he/she will get 2 credit. From the second time he/she will not get. (Basically I am tracing isPurchased field on database. By default it will be false, if purchased finished I set isPurchased false to true to prevent for second time.)

4. User can add book to the cart and wishlist (Cart and the wishlist are accessable from all page). User can be able to proceed from cart list and wishlist as well. 

5. User can checkout any book from book's single page. Book's single page is also implemented to show brief details for a book. User can checkout book from that single page. 

5. I have implemented Google Transletor(All language in the world). 

6. Light and dark mood are implemented for all the pages and components. 

7. If someone share his unique registration link (e.g: https://refer-frontend-nu.vercel.app/register?r=68f72818bf7a71da25544d27) to his friend or family that personl will register using the unique registration link. After the registration he will be able to purchase book. Whenever he purchase book he will get 2 credit and that link given person will get 2 credit also. 

8. User can logout anytime. 

9. I have created a page where the books will be showing at this (/books). I have created products.json file to store There I have implemented filter options. User can filter by Book Category, Ratings, Price, Low to High Price, High to Low price, New Arival, Top Rated. Pagination is also added there. 

10. User can edit profile information like name, email and password also. To change/edit the password user need to provide the previous/current password.


























This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
