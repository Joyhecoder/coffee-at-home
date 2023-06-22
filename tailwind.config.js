/** @type {import('tailwindcss').Config} */


export const content = [
  "./src/components/layout/BaseLayout.jsx",
  "./src/components/layout/Header.jsx",
  "./src/components/AboutHomeMade.jsx",
  "./src/components/Recipe.jsx",
  "./src/App.jsx",
  "./src/components/Details.jsx"
];
export const theme = {
  extend: {
    fontFamily: {
      serif: ["Merriweather", "serif"],
      cursive: ["Tilt Prism", "cursive"]
    },
    color: {
      pink: '#ffcdb2',
      green: '#ccd5ae'
     
    },
    

    
  },
 
  
};
export const plugins = [];

