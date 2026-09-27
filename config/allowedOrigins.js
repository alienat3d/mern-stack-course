// 2.6.3 Here we'll create just a strings array with the origins that are allowed to access our API. The first will be for the development "localhost" and a typical port for React.
// (Go to [config/corsOptions.js])
const allowedOrigins = [
  "http://localhost:3000",
  "https://api.zapl.in",
]

module.exports = allowedOrigins;