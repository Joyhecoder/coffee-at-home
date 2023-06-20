import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useDispatch, useSelector} from 'react-redux'
import { fetch_recommended } from './components/reducers/exampleSlice';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";


const App = () => {
  const dispatch = useDispatch()
  
  const recommendedCoffeeRecipeData = useSelector(state => state.coffeeReducer.recommendedList)
//  const [recommendCoffee, setRecommendCoffee] = useState([])
let coffeeDataFromRedux





  useEffect(() => {
    const fetchRecommendedCoffee = async () => {
      try {
        const response = await fetch('http://localhost:8000/api')
        const data = await response.json()
        let apiKey = data.api

        // check to see if we need to fetch initial recommened data
        if(recommendedCoffeeRecipeData.length == 0){
          console.log("initial recommendedCoffeeRecipe is 0")
          // const exampleData = [{
          //   "recipe": {
          //   "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_bbc68543b115e8c26b3ed1df96520718",
          //   "label": "Caramel Gingerbread Latte",
          //   "image": "https://edamam-product-images.s3.amazonaws.com/web-img/4c1/4c184d7e6581cc8e347bf26113567e71.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIGA1GY3xRQaIuTeTp6wDQ7%2B%2Fhf%2BHxYGnug3xmHkLIP9jAiEAjM4DtLgbGp2xTFE9etR2g3UpNCJi1ft2%2BKEvYB%2FuDsoquQUIRxAAGgwxODcwMTcxNTA5ODYiDBXCyep1uXAdoR63GyqWBV4c5JvW1Gu1OgNvco3CZtaMnBOkALT7qryp4VFN6J3gyTSria1uT7C8cC71wpb7N2Z%2BRoe0xgYDua%2Fs4NX7xFjLlIRa7cVMT2i2f%2F3tY34JNhT3tsn0nzTAdbSjrSmz9X2AwwZXTcZd69jk9y42EDySHkoygHStHW5JizlG3SlOFprrnc33sNhhT6vtRKnmQn6QAGblEjY3m%2FPV10IL0MD0QjTp7abUZsUviXWNhmzCHHvFQUoe6fKS9%2FBNHj6Gr6LlaGHMyrDdhTHoo20xeLtB%2B8%2FaIoTNt%2Frsq5RNq%2BpbMEWCLWrubmydPsTNyBqCAGYbRkY1g0m5nqU44%2BCJ5yf5gMmTNcpg0n4GI1vjLiRuRI8UN40QTb%2FQ0USnyhfJnbhGh1emwr3dj80uaJbYHG8qL7qdeMYtZHAHKZSI4D2w6KE%2Fm6mPt62MTYuCwCl3e5foccUZotpB2ofjmVmgm1agrcGhQ3iAOou52bAZVesnmeNJ95EHPBHfysnyIj1mnF1stdicKbg7M4TstVyFhIJcJ1gPoMVvXihSrBdBP%2FtCN5MD9IQQLTAt%2BkoOz5TLpgg%2BzGbcFRdzUrOn4ytMDqVidjGsnsgXdzMOsan6RoNsiqsGXBA0qgFAexCS8I81aN0UaPiRmGx07%2BriAtGgtRzkgavcw5euSx9yEQAPMIWfkBWdzt63gzPw7dCRdfDogunxXs2uAPu85qJbl2hHKEdkatj9EyhfGqkyxiyGewoRhjf0oJg4HwQR0xMCSt2aCQ13X0zeDK5z67XrWQ0o6m0jVtvZyTdOH%2BVrrmmRBOdDT%2F0ctwTuzIPHOBIwas%2FOrZ68cY6%2BugZ%2BZVS2gYoErinUsl4dB2sFHXJniBQgjndrHHahcIBRMNfJsaQGOrEB%2FNfTOgodDdhkqCZ%2BM4V2gq3FcXWAXh3G0iRXsPcEVThzuEJSHpBzErwzFLy86ngVXojDG%2BozpYLG0gnyT4VMyeSWV78z0S6ZSNAFkaBG7Y0pF1TumuSzpti6N3DKaFDnBeuB1REt1EwtIDWNTP3N8aZiw1T8ydunJi57KBEQfp1qsR2SKQtpJmsIX6gTpiqKCGbGyId6%2FwzKq0u2BnAto%2B%2Fwn2xv%2BJDwpKz%2FIKfpSB2c&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230616T144700Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFCXGCZU5H%2F20230616%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=725deed8e1922fafd1a7d3bd3b75c5eadf077250beb07aad195056afd561eeef",
          //   "images": {
          //   "THUMBNAIL": {
          //   "url": "https://edamam-product-images.s3.amazonaws.com/web-img/4c1/4c184d7e6581cc8e347bf26113567e71-s.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIGA1GY3xRQaIuTeTp6wDQ7%2B%2Fhf%2BHxYGnug3xmHkLIP9jAiEAjM4DtLgbGp2xTFE9etR2g3UpNCJi1ft2%2BKEvYB%2FuDsoquQUIRxAAGgwxODcwMTcxNTA5ODYiDBXCyep1uXAdoR63GyqWBV4c5JvW1Gu1OgNvco3CZtaMnBOkALT7qryp4VFN6J3gyTSria1uT7C8cC71wpb7N2Z%2BRoe0xgYDua%2Fs4NX7xFjLlIRa7cVMT2i2f%2F3tY34JNhT3tsn0nzTAdbSjrSmz9X2AwwZXTcZd69jk9y42EDySHkoygHStHW5JizlG3SlOFprrnc33sNhhT6vtRKnmQn6QAGblEjY3m%2FPV10IL0MD0QjTp7abUZsUviXWNhmzCHHvFQUoe6fKS9%2FBNHj6Gr6LlaGHMyrDdhTHoo20xeLtB%2B8%2FaIoTNt%2Frsq5RNq%2BpbMEWCLWrubmydPsTNyBqCAGYbRkY1g0m5nqU44%2BCJ5yf5gMmTNcpg0n4GI1vjLiRuRI8UN40QTb%2FQ0USnyhfJnbhGh1emwr3dj80uaJbYHG8qL7qdeMYtZHAHKZSI4D2w6KE%2Fm6mPt62MTYuCwCl3e5foccUZotpB2ofjmVmgm1agrcGhQ3iAOou52bAZVesnmeNJ95EHPBHfysnyIj1mnF1stdicKbg7M4TstVyFhIJcJ1gPoMVvXihSrBdBP%2FtCN5MD9IQQLTAt%2BkoOz5TLpgg%2BzGbcFRdzUrOn4ytMDqVidjGsnsgXdzMOsan6RoNsiqsGXBA0qgFAexCS8I81aN0UaPiRmGx07%2BriAtGgtRzkgavcw5euSx9yEQAPMIWfkBWdzt63gzPw7dCRdfDogunxXs2uAPu85qJbl2hHKEdkatj9EyhfGqkyxiyGewoRhjf0oJg4HwQR0xMCSt2aCQ13X0zeDK5z67XrWQ0o6m0jVtvZyTdOH%2BVrrmmRBOdDT%2F0ctwTuzIPHOBIwas%2FOrZ68cY6%2BugZ%2BZVS2gYoErinUsl4dB2sFHXJniBQgjndrHHahcIBRMNfJsaQGOrEB%2FNfTOgodDdhkqCZ%2BM4V2gq3FcXWAXh3G0iRXsPcEVThzuEJSHpBzErwzFLy86ngVXojDG%2BozpYLG0gnyT4VMyeSWV78z0S6ZSNAFkaBG7Y0pF1TumuSzpti6N3DKaFDnBeuB1REt1EwtIDWNTP3N8aZiw1T8ydunJi57KBEQfp1qsR2SKQtpJmsIX6gTpiqKCGbGyId6%2FwzKq0u2BnAto%2B%2Fwn2xv%2BJDwpKz%2FIKfpSB2c&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230616T144700Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFCXGCZU5H%2F20230616%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c1d942fad50bbfd330b2169c8f2c7039ee9d072d3de32d03a674107693a34fcb",
          //   "width": 100,
          //   "height": 100
          //   },
          //   "SMALL": {
          //   "url": "https://edamam-product-images.s3.amazonaws.com/web-img/4c1/4c184d7e6581cc8e347bf26113567e71-m.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIGA1GY3xRQaIuTeTp6wDQ7%2B%2Fhf%2BHxYGnug3xmHkLIP9jAiEAjM4DtLgbGp2xTFE9etR2g3UpNCJi1ft2%2BKEvYB%2FuDsoquQUIRxAAGgwxODcwMTcxNTA5ODYiDBXCyep1uXAdoR63GyqWBV4c5JvW1Gu1OgNvco3CZtaMnBOkALT7qryp4VFN6J3gyTSria1uT7C8cC71wpb7N2Z%2BRoe0xgYDua%2Fs4NX7xFjLlIRa7cVMT2i2f%2F3tY34JNhT3tsn0nzTAdbSjrSmz9X2AwwZXTcZd69jk9y42EDySHkoygHStHW5JizlG3SlOFprrnc33sNhhT6vtRKnmQn6QAGblEjY3m%2FPV10IL0MD0QjTp7abUZsUviXWNhmzCHHvFQUoe6fKS9%2FBNHj6Gr6LlaGHMyrDdhTHoo20xeLtB%2B8%2FaIoTNt%2Frsq5RNq%2BpbMEWCLWrubmydPsTNyBqCAGYbRkY1g0m5nqU44%2BCJ5yf5gMmTNcpg0n4GI1vjLiRuRI8UN40QTb%2FQ0USnyhfJnbhGh1emwr3dj80uaJbYHG8qL7qdeMYtZHAHKZSI4D2w6KE%2Fm6mPt62MTYuCwCl3e5foccUZotpB2ofjmVmgm1agrcGhQ3iAOou52bAZVesnmeNJ95EHPBHfysnyIj1mnF1stdicKbg7M4TstVyFhIJcJ1gPoMVvXihSrBdBP%2FtCN5MD9IQQLTAt%2BkoOz5TLpgg%2BzGbcFRdzUrOn4ytMDqVidjGsnsgXdzMOsan6RoNsiqsGXBA0qgFAexCS8I81aN0UaPiRmGx07%2BriAtGgtRzkgavcw5euSx9yEQAPMIWfkBWdzt63gzPw7dCRdfDogunxXs2uAPu85qJbl2hHKEdkatj9EyhfGqkyxiyGewoRhjf0oJg4HwQR0xMCSt2aCQ13X0zeDK5z67XrWQ0o6m0jVtvZyTdOH%2BVrrmmRBOdDT%2F0ctwTuzIPHOBIwas%2FOrZ68cY6%2BugZ%2BZVS2gYoErinUsl4dB2sFHXJniBQgjndrHHahcIBRMNfJsaQGOrEB%2FNfTOgodDdhkqCZ%2BM4V2gq3FcXWAXh3G0iRXsPcEVThzuEJSHpBzErwzFLy86ngVXojDG%2BozpYLG0gnyT4VMyeSWV78z0S6ZSNAFkaBG7Y0pF1TumuSzpti6N3DKaFDnBeuB1REt1EwtIDWNTP3N8aZiw1T8ydunJi57KBEQfp1qsR2SKQtpJmsIX6gTpiqKCGbGyId6%2FwzKq0u2BnAto%2B%2Fwn2xv%2BJDwpKz%2FIKfpSB2c&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230616T144700Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFCXGCZU5H%2F20230616%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c4c86b8f78d22ce88e9250d1defb06db929dd98aed34a4adefe223fdd043d0c8",
          //   "width": 200,
          //   "height": 200
          //   },
          //   "REGULAR": {
          //   "url": "https://edamam-product-images.s3.amazonaws.com/web-img/4c1/4c184d7e6581cc8e347bf26113567e71.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIGA1GY3xRQaIuTeTp6wDQ7%2B%2Fhf%2BHxYGnug3xmHkLIP9jAiEAjM4DtLgbGp2xTFE9etR2g3UpNCJi1ft2%2BKEvYB%2FuDsoquQUIRxAAGgwxODcwMTcxNTA5ODYiDBXCyep1uXAdoR63GyqWBV4c5JvW1Gu1OgNvco3CZtaMnBOkALT7qryp4VFN6J3gyTSria1uT7C8cC71wpb7N2Z%2BRoe0xgYDua%2Fs4NX7xFjLlIRa7cVMT2i2f%2F3tY34JNhT3tsn0nzTAdbSjrSmz9X2AwwZXTcZd69jk9y42EDySHkoygHStHW5JizlG3SlOFprrnc33sNhhT6vtRKnmQn6QAGblEjY3m%2FPV10IL0MD0QjTp7abUZsUviXWNhmzCHHvFQUoe6fKS9%2FBNHj6Gr6LlaGHMyrDdhTHoo20xeLtB%2B8%2FaIoTNt%2Frsq5RNq%2BpbMEWCLWrubmydPsTNyBqCAGYbRkY1g0m5nqU44%2BCJ5yf5gMmTNcpg0n4GI1vjLiRuRI8UN40QTb%2FQ0USnyhfJnbhGh1emwr3dj80uaJbYHG8qL7qdeMYtZHAHKZSI4D2w6KE%2Fm6mPt62MTYuCwCl3e5foccUZotpB2ofjmVmgm1agrcGhQ3iAOou52bAZVesnmeNJ95EHPBHfysnyIj1mnF1stdicKbg7M4TstVyFhIJcJ1gPoMVvXihSrBdBP%2FtCN5MD9IQQLTAt%2BkoOz5TLpgg%2BzGbcFRdzUrOn4ytMDqVidjGsnsgXdzMOsan6RoNsiqsGXBA0qgFAexCS8I81aN0UaPiRmGx07%2BriAtGgtRzkgavcw5euSx9yEQAPMIWfkBWdzt63gzPw7dCRdfDogunxXs2uAPu85qJbl2hHKEdkatj9EyhfGqkyxiyGewoRhjf0oJg4HwQR0xMCSt2aCQ13X0zeDK5z67XrWQ0o6m0jVtvZyTdOH%2BVrrmmRBOdDT%2F0ctwTuzIPHOBIwas%2FOrZ68cY6%2BugZ%2BZVS2gYoErinUsl4dB2sFHXJniBQgjndrHHahcIBRMNfJsaQGOrEB%2FNfTOgodDdhkqCZ%2BM4V2gq3FcXWAXh3G0iRXsPcEVThzuEJSHpBzErwzFLy86ngVXojDG%2BozpYLG0gnyT4VMyeSWV78z0S6ZSNAFkaBG7Y0pF1TumuSzpti6N3DKaFDnBeuB1REt1EwtIDWNTP3N8aZiw1T8ydunJi57KBEQfp1qsR2SKQtpJmsIX6gTpiqKCGbGyId6%2FwzKq0u2BnAto%2B%2Fwn2xv%2BJDwpKz%2FIKfpSB2c&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230616T144700Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIASXCYXIIFCXGCZU5H%2F20230616%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5ce6a81769dd7bfa601f7665dfc092fe97d01f5c38dcef856d692bfcc4f31dec",
          //   "width": 300,
          //   "height": 300
          //   }
          //   },
          //   "source": "Food Network",
          //   "url": "https://www.foodnetwork.com/recipes/caramel-gingerbread-latte-2105318",
          //   "shareAs": "http://www.edamam.com/recipe/caramel-gingerbread-latte-bbc68543b115e8c26b3ed1df96520718/latte",
          //   "yield": 1,
          //   "dietLabels": [
          //   "Low-Sodium"
          //   ],
          //   "healthLabels": [
          //   "Kidney-Friendly",
          //   "Vegetarian",
          //   "Pescatarian",
          //   "Peanut-Free",
          //   "Tree-Nut-Free",
          //   "Fish-Free",
          //   "Shellfish-Free",
          //   "Pork-Free",
          //   "Red-Meat-Free",
          //   "Crustacean-Free",
          //   "Celery-Free",
          //   "Mustard-Free",
          //   "Sesame-Free",
          //   "Lupine-Free",
          //   "Mollusk-Free",
          //   "Alcohol-Free",
          //   "Kosher"
          //   ],
          //   "cautions": [
          //   "Sulfites"
          //   ],
          //   "ingredientLines": [
          //   "1/2 cup hot milk",
          //   "1/3 cup double-strength hot brewed coffee",
          //   "2 to 3 tablespoons Gingerbread Latte Flavor NESTLÉ COFFEE-MATE Liquid Coffee Creamer",
          //   "1 tablespoon caramel syrup",
          //   "Ground cinnamon (optional)"
          //   ],
          //   "ingredients": [
          //   {
          //   "text": "1/2 cup hot milk",
          //   "quantity": 0.5,
          //   "measure": "cup",
          //   "food": "milk",
          //   "weight": 122,
          //   "foodCategory": "Milk",
          //   "foodId": "food_b49rs1kaw0jktabzkg2vvanvvsis",
          //   "image": "https://www.edamam.com/food-img/7c9/7c9962acf83654a8d98ea6a2ade93735.jpg"
          //   },
          //   {
          //   "text": "1/3 cup double-strength hot brewed coffee",
          //   "quantity": 0.3333333333333333,
          //   "measure": "cup",
          //   "food": "coffee",
          //   "weight": 79,
          //   "foodCategory": "coffee and tea",
          //   "foodId": "food_ax0a0yxbbe4hx0apiz1tla01s2w7",
          //   "image": "https://www.edamam.com/food-img/ee9/ee9566349cb84dfd9ddac1fdf8cbc907.jpg"
          //   },
          //   {
          //   "text": "2 to 3 tablespoons Gingerbread Latte Flavor NESTLÉ COFFEE-MATE Liquid Coffee Creamer",
          //   "quantity": 2.5,
          //   "measure": "tablespoon",
          //   "food": "Coffee Creamer",
          //   "weight": 37.5,
          //   "foodCategory": "plant-based protein",
          //   "foodId": "food_bhl8rymacn8l7navbm7icbw8mqte",
          //   "image": "https://www.edamam.com/food-img/36d/36d0342199dc45df868960c3938d3b29.jpg"
          //   },
          //   {
          //   "text": "1 tablespoon caramel syrup",
          //   "quantity": 1,
          //   "measure": "tablespoon",
          //   "food": "syrup",
          //   "weight": 20,
          //   "foodCategory": "sugars",
          //   "foodId": "food_bo37p69bopqshvaul0bn4bv0kqni",
          //   "image": "https://www.edamam.com/food-img/ced/ced25c45453a118e531c8aaf33e2ee38.jpg"
          //   },
          //   {
          //   "text": "Ground cinnamon (optional)",
          //   "quantity": 0,
          //   "measure": null,
          //   "food": "Ground cinnamon",
          //   "weight": 0.7755,
          //   "foodCategory": "Condiments and sauces",
          //   "foodId": "food_atjxtznauw5zabaixm24xa787onz",
          //   "image": "https://www.edamam.com/food-img/d4d/d4daa18b92c596a1c99c08537c38e65b.jpg"
          //   }
          //   ],
          //   "calories": 166.625485,
          //   "totalCO2Emissions": 607.6942747565001,
          //   "co2EmissionsClass": "E",
          //   "totalWeight": 259.2755,
          //   "totalTime": 0,
          //   "cuisineType": [
          //   "american"
          //   ],
          //   "mealType": [
          //   "teatime"
          //   ],
          //   "dishType": [
          //   "drinks"
          //   ],
          //   "totalNutrients": {
          //   "ENERC_KCAL": {
          //   "label": "Energy",
          //   "quantity": 166.625485,
          //   "unit": "kcal"
          //   },
          //   "FAT": {
          //   "label": "Fat",
          //   "quantity": 6.503666199999999,
          //   "unit": "g"
          //   },
          //   "FASAT": {
          //   "label": "Saturated",
          //   "quantity": 2.2809554750000003,
          //   "unit": "g"
          //   },
          //   "FATRN": {
          //   "label": "Trans",
          //   "quantity": 0,
          //   "unit": "g"
          //   },
          //   "FAMS": {
          //   "label": "Monounsaturated",
          //   "quantity": 1.0065977300000002,
          //   "unit": "g"
          //   },
          //   "FAPU": {
          //   "label": "Polyunsaturated",
          //   "quantity": 0.24261734000000001,
          //   "unit": "g"
          //   },
          //   "CHOCDF": {
          //   "label": "Carbs",
          //   "quantity": 22.390225450000003,
          //   "unit": "g"
          //   },
          //   "CHOCDF.net": {
          //   "label": "Carbohydrates (net)",
          //   "quantity": 21.978434950000004,
          //   "unit": "g"
          //   },
          //   "FIBTG": {
          //   "label": "Fiber",
          //   "quantity": 0.4117905,
          //   "unit": "g"
          //   },
          //   "SUGAR": {
          //   "label": "Sugars",
          //   "quantity": 18.26982835,
          //   "unit": "g"
          //   },
          //   "SUGAR.added": {
          //   "label": "Sugars, added",
          //   "quantity": 12.092,
          //   "unit": "g"
          //   },
          //   "PROCNT": {
          //   "label": "Protein",
          //   "quantity": 3.97674245,
          //   "unit": "g"
          //   },
          //   "CHOLE": {
          //   "label": "Cholesterol",
          //   "quantity": 12.2,
          //   "unit": "mg"
          //   },
          //   "NA": {
          //   "label": "Sodium",
          //   "quantity": 81.64255,
          //   "unit": "mg"
          //   },
          //   "CA": {
          //   "label": "Calcium",
          //   "quantity": 167.61051,
          //   "unit": "mg"
          //   },
          //   "MG": {
          //   "label": "Magnesium",
          //   "quantity": 19.2353,
          //   "unit": "mg"
          //   },
          //   "K": {
          //   "label": "Potassium",
          //   "quantity": 245.49240500000002,
          //   "unit": "mg"
          //   },
          //   "FE": {
          //   "label": "Iron",
          //   "quantity": 0.13102160000000002,
          //   "unit": "mg"
          //   },
          //   "ZN": {
          //   "label": "Zinc",
          //   "quantity": 0.7753916499999999,
          //   "unit": "mg"
          //   },
          //   "P": {
          //   "label": "Phosphorus",
          //   "quantity": 105.74632000000001,
          //   "unit": "mg"
          //   },
          //   "VITA_RAE": {
          //   "label": "Vitamin A",
          //   "quantity": 56.236325,
          //   "unit": "µg"
          //   },
          //   "VITC": {
          //   "label": "Vitamin C",
          //   "quantity": 0.029469,
          //   "unit": "mg"
          //   },
          //   "THIA": {
          //   "label": "Thiamin (B1)",
          //   "quantity": 0.08055061,
          //   "unit": "mg"
          //   },
          //   "RIBF": {
          //   "label": "Riboflavin (B2)",
          //   "quantity": 0.520537955,
          //   "unit": "mg"
          //   },
          //   "NIA": {
          //   "label": "Niacin (B3)",
          //   "quantity": 0.28599966,
          //   "unit": "mg"
          //   },
          //   "VITB6A": {
          //   "label": "Vitamin B6",
          //   "quantity": 0.04633528999999999,
          //   "unit": "mg"
          //   },
          //   "FOLDFE": {
          //   "label": "Folate equivalent (total)",
          //   "quantity": 7.7265299999999995,
          //   "unit": "µg"
          //   },
          //   "FOLFD": {
          //   "label": "Folate (food)",
          //   "quantity": 7.7265299999999995,
          //   "unit": "µg"
          //   },
          //   "FOLAC": {
          //   "label": "Folic acid",
          //   "quantity": 0,
          //   "unit": "µg"
          //   },
          //   "VITB12": {
          //   "label": "Vitamin B12",
          //   "quantity": 0.549,
          //   "unit": "µg"
          //   },
          //   "VITD": {
          //   "label": "Vitamin D",
          //   "quantity": 1.586,
          //   "unit": "µg"
          //   },
          //   "TOCPHA": {
          //   "label": "Vitamin E",
          //   "quantity": 0.1112916,
          //   "unit": "mg"
          //   },
          //   "VITK1": {
          //   "label": "Vitamin K",
          //   "quantity": 0.686956,
          //   "unit": "µg"
          //   },
          //   "WATER": {
          //   "label": "Water",
          //   "quantity": 224.95549789999998,
          //   "unit": "g"
          //   }
          //   },
          //   "totalDaily": {
          //   "ENERC_KCAL": {
          //   "label": "Energy",
          //   "quantity": 8.33127425,
          //   "unit": "%"
          //   },
          //   "FAT": {
          //   "label": "Fat",
          //   "quantity": 10.005640307692307,
          //   "unit": "%"
          //   },
          //   "FASAT": {
          //   "label": "Saturated",
          //   "quantity": 11.404777375000002,
          //   "unit": "%"
          //   },
          //   "CHOCDF": {
          //   "label": "Carbs",
          //   "quantity": 7.4634084833333345,
          //   "unit": "%"
          //   },
          //   "FIBTG": {
          //   "label": "Fiber",
          //   "quantity": 1.6471620000000002,
          //   "unit": "%"
          //   },
          //   "PROCNT": {
          //   "label": "Protein",
          //   "quantity": 7.953484900000001,
          //   "unit": "%"
          //   },
          //   "CHOLE": {
          //   "label": "Cholesterol",
          //   "quantity": 4.066666666666666,
          //   "unit": "%"
          //   },
          //   "NA": {
          //   "label": "Sodium",
          //   "quantity": 3.401772916666667,
          //   "unit": "%"
          //   },
          //   "CA": {
          //   "label": "Calcium",
          //   "quantity": 16.761051,
          //   "unit": "%"
          //   },
          //   "MG": {
          //   "label": "Magnesium",
          //   "quantity": 4.579833333333333,
          //   "unit": "%"
          //   },
          //   "K": {
          //   "label": "Potassium",
          //   "quantity": 5.223242659574469,
          //   "unit": "%"
          //   },
          //   "FE": {
          //   "label": "Iron",
          //   "quantity": 0.7278977777777779,
          //   "unit": "%"
          //   },
          //   "ZN": {
          //   "label": "Zinc",
          //   "quantity": 7.049014999999998,
          //   "unit": "%"
          //   },
          //   "P": {
          //   "label": "Phosphorus",
          //   "quantity": 15.106617142857145,
          //   "unit": "%"
          //   },
          //   "VITA_RAE": {
          //   "label": "Vitamin A",
          //   "quantity": 6.248480555555555,
          //   "unit": "%"
          //   },
          //   "VITC": {
          //   "label": "Vitamin C",
          //   "quantity": 0.03274333333333333,
          //   "unit": "%"
          //   },
          //   "THIA": {
          //   "label": "Thiamin (B1)",
          //   "quantity": 6.712550833333334,
          //   "unit": "%"
          //   },
          //   "RIBF": {
          //   "label": "Riboflavin (B2)",
          //   "quantity": 40.04138115384615,
          //   "unit": "%"
          //   },
          //   "NIA": {
          //   "label": "Niacin (B3)",
          //   "quantity": 1.787497875,
          //   "unit": "%"
          //   },
          //   "VITB6A": {
          //   "label": "Vitamin B6",
          //   "quantity": 3.564253076923076,
          //   "unit": "%"
          //   },
          //   "FOLDFE": {
          //   "label": "Folate equivalent (total)",
          //   "quantity": 1.9316324999999999,
          //   "unit": "%"
          //   },
          //   "VITB12": {
          //   "label": "Vitamin B12",
          //   "quantity": 22.875000000000004,
          //   "unit": "%"
          //   },
          //   "VITD": {
          //   "label": "Vitamin D",
          //   "quantity": 10.573333333333332,
          //   "unit": "%"
          //   },
          //   "TOCPHA": {
          //   "label": "Vitamin E",
          //   "quantity": 0.741944,
          //   "unit": "%"
          //   },
          //   "VITK1": {
          //   "label": "Vitamin K",
          //   "quantity": 0.5724633333333333,
          //   "unit": "%"
          //   }
          //   },
          //   "digest": [
          //   {
          //   "label": "Fat",
          //   "tag": "FAT",
          //   "schemaOrgTag": "fatContent",
          //   "total": 6.503666199999999,
          //   "hasRDI": true,
          //   "daily": 10.005640307692307,
          //   "unit": "g",
          //   "sub": [
          //   {
          //   "label": "Saturated",
          //   "tag": "FASAT",
          //   "schemaOrgTag": "saturatedFatContent",
          //   "total": 2.2809554750000003,
          //   "hasRDI": true,
          //   "daily": 11.404777375000002,
          //   "unit": "g"
          //   },
          //   {
          //   "label": "Trans",
          //   "tag": "FATRN",
          //   "schemaOrgTag": "transFatContent",
          //   "total": 0,
          //   "hasRDI": false,
          //   "daily": 0,
          //   "unit": "g"
          //   },
          //   {
          //   "label": "Monounsaturated",
          //   "tag": "FAMS",
          //   "schemaOrgTag": null,
          //   "total": 1.0065977300000002,
          //   "hasRDI": false,
          //   "daily": 0,
          //   "unit": "g"
          //   },
          //   {
          //   "label": "Polyunsaturated",
          //   "tag": "FAPU",
          //   "schemaOrgTag": null,
          //   "total": 0.24261734000000001,
          //   "hasRDI": false,
          //   "daily": 0,
          //   "unit": "g"
          //   }
          //   ]
          //   },
          //   {
          //   "label": "Carbs",
          //   "tag": "CHOCDF",
          //   "schemaOrgTag": "carbohydrateContent",
          //   "total": 22.390225450000003,
          //   "hasRDI": true,
          //   "daily": 7.4634084833333345,
          //   "unit": "g",
          //   "sub": [
          //   {
          //   "label": "Carbs (net)",
          //   "tag": "CHOCDF.net",
          //   "schemaOrgTag": null,
          //   "total": 21.978434950000004,
          //   "hasRDI": false,
          //   "daily": 0,
          //   "unit": "g"
          //   },
          //   {
          //   "label": "Fiber",
          //   "tag": "FIBTG",
          //   "schemaOrgTag": "fiberContent",
          //   "total": 0.4117905,
          //   "hasRDI": true,
          //   "daily": 1.6471620000000002,
          //   "unit": "g"
          //   },
          //   {
          //   "label": "Sugars",
          //   "tag": "SUGAR",
          //   "schemaOrgTag": "sugarContent",
          //   "total": 18.26982835,
          //   "hasRDI": false,
          //   "daily": 0,
          //   "unit": "g"
          //   },
          //   {
          //   "label": "Sugars, added",
          //   "tag": "SUGAR.added",
          //   "schemaOrgTag": null,
          //   "total": 12.092,
          //   "hasRDI": false,
          //   "daily": 0,
          //   "unit": "g"
          //   }
          //   ]
          //   },
          //   {
          //   "label": "Protein",
          //   "tag": "PROCNT",
          //   "schemaOrgTag": "proteinContent",
          //   "total": 3.97674245,
          //   "hasRDI": true,
          //   "daily": 7.953484900000001,
          //   "unit": "g"
          //   },
          //   {
          //   "label": "Cholesterol",
          //   "tag": "CHOLE",
          //   "schemaOrgTag": "cholesterolContent",
          //   "total": 12.2,
          //   "hasRDI": true,
          //   "daily": 4.066666666666666,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Sodium",
          //   "tag": "NA",
          //   "schemaOrgTag": "sodiumContent",
          //   "total": 81.64255,
          //   "hasRDI": true,
          //   "daily": 3.401772916666667,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Calcium",
          //   "tag": "CA",
          //   "schemaOrgTag": null,
          //   "total": 167.61051,
          //   "hasRDI": true,
          //   "daily": 16.761051,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Magnesium",
          //   "tag": "MG",
          //   "schemaOrgTag": null,
          //   "total": 19.2353,
          //   "hasRDI": true,
          //   "daily": 4.579833333333333,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Potassium",
          //   "tag": "K",
          //   "schemaOrgTag": null,
          //   "total": 245.49240500000002,
          //   "hasRDI": true,
          //   "daily": 5.223242659574469,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Iron",
          //   "tag": "FE",
          //   "schemaOrgTag": null,
          //   "total": 0.13102160000000002,
          //   "hasRDI": true,
          //   "daily": 0.7278977777777779,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Zinc",
          //   "tag": "ZN",
          //   "schemaOrgTag": null,
          //   "total": 0.7753916499999999,
          //   "hasRDI": true,
          //   "daily": 7.049014999999998,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Phosphorus",
          //   "tag": "P",
          //   "schemaOrgTag": null,
          //   "total": 105.74632000000001,
          //   "hasRDI": true,
          //   "daily": 15.106617142857145,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Vitamin A",
          //   "tag": "VITA_RAE",
          //   "schemaOrgTag": null,
          //   "total": 56.236325,
          //   "hasRDI": true,
          //   "daily": 6.248480555555555,
          //   "unit": "µg"
          //   },
          //   {
          //   "label": "Vitamin C",
          //   "tag": "VITC",
          //   "schemaOrgTag": null,
          //   "total": 0.029469,
          //   "hasRDI": true,
          //   "daily": 0.03274333333333333,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Thiamin (B1)",
          //   "tag": "THIA",
          //   "schemaOrgTag": null,
          //   "total": 0.08055061,
          //   "hasRDI": true,
          //   "daily": 6.712550833333334,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Riboflavin (B2)",
          //   "tag": "RIBF",
          //   "schemaOrgTag": null,
          //   "total": 0.520537955,
          //   "hasRDI": true,
          //   "daily": 40.04138115384615,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Niacin (B3)",
          //   "tag": "NIA",
          //   "schemaOrgTag": null,
          //   "total": 0.28599966,
          //   "hasRDI": true,
          //   "daily": 1.787497875,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Vitamin B6",
          //   "tag": "VITB6A",
          //   "schemaOrgTag": null,
          //   "total": 0.04633528999999999,
          //   "hasRDI": true,
          //   "daily": 3.564253076923076,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Folate equivalent (total)",
          //   "tag": "FOLDFE",
          //   "schemaOrgTag": null,
          //   "total": 7.7265299999999995,
          //   "hasRDI": true,
          //   "daily": 1.9316324999999999,
          //   "unit": "µg"
          //   },
          //   {
          //   "label": "Folate (food)",
          //   "tag": "FOLFD",
          //   "schemaOrgTag": null,
          //   "total": 7.7265299999999995,
          //   "hasRDI": false,
          //   "daily": 0,
          //   "unit": "µg"
          //   },
          //   {
          //   "label": "Folic acid",
          //   "tag": "FOLAC",
          //   "schemaOrgTag": null,
          //   "total": 0,
          //   "hasRDI": false,
          //   "daily": 0,
          //   "unit": "µg"
          //   },
          //   {
          //   "label": "Vitamin B12",
          //   "tag": "VITB12",
          //   "schemaOrgTag": null,
          //   "total": 0.549,
          //   "hasRDI": true,
          //   "daily": 22.875000000000004,
          //   "unit": "µg"
          //   },
          //   {
          //   "label": "Vitamin D",
          //   "tag": "VITD",
          //   "schemaOrgTag": null,
          //   "total": 1.586,
          //   "hasRDI": true,
          //   "daily": 10.573333333333332,
          //   "unit": "µg"
          //   },
          //   {
          //   "label": "Vitamin E",
          //   "tag": "TOCPHA",
          //   "schemaOrgTag": null,
          //   "total": 0.1112916,
          //   "hasRDI": true,
          //   "daily": 0.741944,
          //   "unit": "mg"
          //   },
          //   {
          //   "label": "Vitamin K",
          //   "tag": "VITK1",
          //   "schemaOrgTag": null,
          //   "total": 0.686956,
          //   "hasRDI": true,
          //   "daily": 0.5724633333333333,
          //   "unit": "µg"
          //   },
          //   {
          //   "label": "Sugar alcohols",
          //   "tag": "Sugar.alcohol",
          //   "schemaOrgTag": null,
          //   "total": 0,
          //   "hasRDI": false,
          //   "daily": 0,
          //   "unit": "g"
          //   },
          //   {
          //   "label": "Water",
          //   "tag": "WATER",
          //   "schemaOrgTag": null,
          //   "total": 224.95549789999998,
          //   "hasRDI": false,
          //   "daily": 0,
          //   "unit": "g"
          //   }
          //   ]
          //   },
          //   "_links": {
          //   "self": {
          //   "href": "https://api.edamam.com/api/recipes/v2/bbc68543b115e8c26b3ed1df96520718?type=public&app_id=14295534&app_key=9c44df4b81e3581ed0e3c019ecca5704",
          //   "title": "Self"
          //   }
          //   }
          //   }]
          const fetchCoffeeData = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=coffee&app_id=14295534&app_key=${apiKey}&diet=balanced`)
          console.log(fetchCoffeeData.data.hits)
          const exampleData = fetchCoffeeData.data.hits
          dispatch(fetch_recommended(exampleData))


         
         
        }
       
      } catch (error) {
        console.log(error)
      }
      

    }
   
    fetchRecommendedCoffee()
  }, [])

  coffeeDataFromRedux = useSelector(state => state.coffeeReducer.recommendedList[0])
  console.log(coffeeDataFromRedux)
  return (
    <>
    
    <h1 className="text-3xl font-serif underline">
      Hello world!
    </h1>
    <h1 className="text-3xl font-cursive underline">
      Hello world!
    </h1>
    <div className="flex flex-wrap">
      {console.log(coffeeDataFromRedux)}
    {coffeeDataFromRedux.length !== 0 ? 
    
  
    coffeeDataFromRedux.map(coffee => {
      return (

          <div className="w-full max-w-sm bg-white rounded-lg m-2">
              <a href="#">
              
                  <img className="p-8 rounded-full" src={coffee.recipe.images.REGULAR.url} alt="product image" />
              </a>
              <div className="px-5 pb-5">
                  <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{coffee.recipe.label}</h5>
                  </a>
                  <div className="flex items-center mt-2.5 mb-5">
                    {coffee.recipe.dietLabels.map(label => {
                      return (
                        <button class="bg-pink-300 hover:bg-pink-500 text-white font-serif py-2 px-4 mr-3 rounded-full">
                          {label}
                        </button> 
                      )
                    })}
                  </div>
                
              </div>
          </div>

      )
    })
   
    :
    <></>
  
  }
  </div>
    
    </>
  )
}

export default App
