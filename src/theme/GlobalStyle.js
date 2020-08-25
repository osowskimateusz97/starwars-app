import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;500;700&display=swap');
  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin:0;
    padding:0;
  }
  
  html {
    font-size: 62.5%; 
    background-color:#E0E6EE;
  }
  
  body {
    font-size: 1.6rem;
    font-family: "Barlow", sans-serif;
    height:100vh;
  }
  #root{
    width:100%;
  }
`;

export default GlobalStyle;
