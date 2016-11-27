block('date-picker')(
  js()(true),
  tag()('input'),
  attrs()(function() {
    return { placeholder: this.ctx.placeholder };
  })
);
