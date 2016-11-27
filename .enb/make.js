const path = require('path');

const LIBS = 'libs';

const techs = require('./techs');

const levels = [
  {
    path: path.join(LIBS, 'bem-core', 'common.blocks'),
    check: false
  },
  {
    path: path.join(LIBS, 'bem-core', 'desktop.blocks'),
    check: false
  },
  'common.components',
  'common.models'
];

module.exports = function(config) {
  const isProd = process.env.YENV === 'production';

  // https://github.com/enb/enb-bem-specs
  config.includeConfig('enb-bem-specs');

  const examples = config.module('enb-bem-specs')
          .createConfigurator('app-test');

  examples.configure({
    destPath: 'common.specs',
    levels: [
      'common.components',
      'common.models'
    ],
    sourceLevels: levels.concat({
      path : path.join(LIBS, 'bem-pr', 'spec.blocks'),
      check : false
    }),
    specSuffixes: ['spec.js'],
    jsSuffixes: ['vanilla.js', 'browser.js', 'js'],
    includeYM: true,
    scripts: [
      '../../libs/es5-shim/es5-shim.js',
      '../../libs/jquery/dist/jquery.js'
    ],
    depsTech: techs.bem.deps,
    templateEngine: {
      templateTech: techs.bemhtml,
      templateOptions: { sourceSuffixes: ['bemhtml', 'bemhtml.js'] },
      htmlTech: techs.bemjsonToHtml,
      htmlTechOptionNames: { bemjsonFile: 'bemjsonFile', templateFile: 'bemhtmlFile' }
    }
  });
};
