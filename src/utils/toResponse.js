function toResponse() {
  const { _id, ...rest } = this;
  delete rest.password;
  delete rest.__v;
  delete rest.userId;
  return { id: _id, ...rest };
}

const addMethods = schema => {
  // eslint-disable-next-line prettier/prettier
  schema.method('toResponse', function () {
    const { _id, ...rest } = this.toJSON();
    delete rest.password;
    delete rest.__v;
    delete rest.userId;
    return { id: _id, ...rest };
  });
};

module.exports = { addMethods, toResponse };
