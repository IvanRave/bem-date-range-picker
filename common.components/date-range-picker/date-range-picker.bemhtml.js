block('date-range-picker')(
  js()(true),
  content()(function() {
    return [
      {
        elem: 'date-start-wrap',
        content: [
          {
            elem: 'date-label',
            content: this.ctx.labelStart
          },
          {
            block: 'date-picker',
            mix: {
              block: this.ctx.block,
              elem: 'date-start-picker'
            },
            placeholder: this.ctx.labelStart
          }
        ]
      },
      {
        elem: 'date-end-wrap',
        content: [
          {
            elem: 'date-label',
            content: this.ctx.labelEnd
          },
          {
            block: 'date-picker',
            mix: {
              block: this.ctx.block,
              elem: 'date-end-picker'
            },
            placeholder: this.ctx.labelEnd
          }
        ]
      },
      {
        block: 'error-wrapper'
      }
    ];
  })
);
