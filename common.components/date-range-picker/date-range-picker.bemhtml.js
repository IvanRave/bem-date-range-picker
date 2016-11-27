block('date-range-picker')(
  js()(true),
  content()(function() {
    return [
      {
        elem: 'date-start-wrap',
        content: [
          {
            elem: 'date-label',
            content: 'Departure'
          },
          {
            block: 'date-picker',
            mix: {
              block: this.ctx.block,
              elem: 'date-start-picker'
            },
            placeholder: 'from'
          }
        ]
      },
      {
        elem: 'date-end-wrap',
        content: [
          {
            elem: 'date-label',
            content: 'Arrival'
          },
          {
            block: 'date-picker',
            mix: {
              block: this.ctx.block,
              elem: 'date-end-picker'
            },
            placeholder: 'back'
          },
          {
            elem: 'is-annual',
            content: {
              block: 'checkbox',
              text: '1 year'
            }
          }
        ]
      },
      {
        block: 'error-wrapper'
      }
    ];
  })
);
