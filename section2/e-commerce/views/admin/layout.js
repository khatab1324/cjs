module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
      <style>
      /* Form styles */
      form {
         

      }

      input {
        display: block;
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 16px;
        box-sizing: border-box;
        font-size: 16px;
      }

      input:focus {
        outline: none;
        border: 1px solid #000000;
      }

      button {
        background-color: #006eff;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
      }

      button:hover {
        background-color: #00b8f0;
      }
      a {
        display: block;
        text-align: center;
        margin-top: 24px;
        font-size: 16px;
        text-decoration: none;
      }

      .transition {
        position: relative;
        background-color: #0800fa;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.5s ease, transform 0.5s ease;
      }

      .transition:hover {
        background-color: #0077ff;
        transform: translateX(-10px);
      }
      .centered {
        display: flex ;
        justify-content: center;
        align-items: center;
       
      }
      
    </style>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="/css/main.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
      </head>
      <body>
        ${content}
      </body>
    </html
  `;
};
