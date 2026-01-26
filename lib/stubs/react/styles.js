module.exports = function (name) {
    const lowerName = name.toLowerCase();

    return `.${lowerName} {
  padding: 20px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
  }
}
`;
};
