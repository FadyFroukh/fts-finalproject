# Foothill Technology Solutions - Frontend Training Final Project - Point of Sales Management System - November 2022

---

## Business Requirements
* To solve a supermarket needs to accelerate the selling process and to store data effectively

#User Requirements
* To create a Point of Sales Management System 

## Functional Requirements
**Pages Available**
* It shall display a Login Page
* It shall display a Point of Sales Page
* It shall display a Products Page
* It shall display a Categories Page

**Point of Sales Page**
* It shall give the option to add a new product
* It shall give the option to edit a product
* It shall give the option to delete a product
* It shall give the option to search products 
* It shall give the option to filter products according to a specific category
* It shall give the option to add products to a chosen cart
* It shall give the option to remove products from a chosen cart
* It shall give the option to increment or decrement the amount of a product inside a chosen cart
* It shall give the option to choose a specific tax rate on a specific cart
* It shall give the option to choose a specific discount on a specific cart
* It shall give the option to add more than one cart
* It shall give the option to delete a chosen cart
* It shall give the option to continue the current payment in the current cart
* It shall give the option to cancel the current payment in the current cart

**Products Page**
* It shall give the option to add a new product
* It shall give the option to edit a product
* It shall give the option to delete a product
* It shall give the option to search products 
* It shall give the option to filter products according to a specific category

**Categories Page**
* It shall give the option to add a new category
* It shall give the option to edit a category
* It shall give the option to delete a category
* It shall give the option to search categories

## System Requirements (Technologies Used)
* Reactjs
* TypeScript
* vite
* reduxjs && reduxjs toolkit
* react-redux
* formik
* react-router-dom
* @mui/material
* @emotion/react
* @emotion/styled
* @mui/icons-material
* axios
* json-server

##Folder Structure
**1. Public**
* Pictures - has pictures used in the development of the project
**2. src**
* app - has the redux store file
* data - has the db.json file , which is used to mock the backend server
* features - has four feature folders, each folder is dedicated to one of the pages inside the project
* hooks - has general project self-made hooks , to be used inside features folders
* pages - has the main four pages
* utilities - has two folders , which are components and styles , those two are used for components that are used mulitple times to reduce the amount of repetition
* App.tsx - has the main routes for the project
* main.tsx - has the root of the project component
**3. index.html**
**4. package-lock.json**
**5. package.json*
**6. tsconfig.json**
**7. tsconfig.node.json**
**8. vite.config.ts**


## How to Use The Project
**Downloading The Project*
* Download the code directly from github or clone the repository
* Create a reactjs & typescript project using vite , **the command is :** npm create vite fts-finalproject
* Run **npm i -g json-server** to install the mock server globally
* Copy the code from the downloaded project and paste it directly inside the newly created project
* Run **npm i** to install the rest of the needed dependencies
* Run **json-server --watch src/data/db.json --port 4000** to start the mock server
* Run npm run dev inside the terminal , and you should be good to go!
**Navigating The Project**
* After you run the project you will be greated with a Login Form
* Enter your id and password to get to the main page , which happens to be the **Pos Page**
* The pages will have the needed components to do what have been illustrated in the Functional Requirments Section
* To filter products using the PosPage , in it's header press the **Filter** Select Component and then choose a category
* To add a new product using the PosPage , in it's header press the **Add Product** Button and you will be greated with an add product form
* To delete a product press the **Trash Icon** under every product
* To edit a product press the **Pen Icon** under every product
* To add a product to a chosen cart press the **Cart Icon** and you will be greated with available carts , if there's more than one
* To delete a product from a cart press the **Times Icon** inside a chosen cart
* To increment or decrement a product from a cart press the **Plus or Minus Icon** inside a chosen cart
* To cancel a current cart payment press the **CANCEL* button inside a chosen cart
* To proceed a current cart payment press the **PROCEED** button inside a chosen cart
* To delete a cart press the **delete** button inside a chosen cart
* Inside the Products Page and the Categories Page you can add , edit , delete , search which is very similar to the PosPage
