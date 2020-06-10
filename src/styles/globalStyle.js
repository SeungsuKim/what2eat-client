import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  * {
     box-sizing: border-box;
   }
   body {
     margin: 0;
     padding: 0;
     font-size: 14px;
     font-family: 'Open Sans', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
   }
   a {
     color: ${(props) => props.theme.blueColor};
     text-decoration: none;
   }
   input:focus {
     outline: none;
   }
`;
