export default class Validator {
  constructor(fields = []) {
    this.fields = fields;
  }

  addField(name, regex) {
    this.fields.push({
      name,
      regex,
    });

    return this;
  }

  validateField(name, content) {
    return this.fields.find((element, index, array) => {
      if (element.name === name) {
        return element.regex.test(content);
      }
    });
  }
}
