import antfu from '@antfu/eslint-config'
import prettier from 'eslint-config-prettier'

export default antfu(
  {
    ignores: [
      '!packages/**',
      '!others/**',
      'pnpm-workspace.yaml',
      'types/js-framework',
      'private/references',
    ],
    markdown: false,
    toml: false,
  },
  prettier,
  {
    rules: {
      'no-console': 'off',

      'antfu/consistent-chaining': 'off',
      'antfu/consistent-list-newline': 'off',
      'antfu/if-newline': 'off',

      'jsdoc/require-param-description': 'off',
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-template-description': 'off',
      'jsdoc/require-throws-description': 'off',
      'jsdoc/require-yields-description': 'off',

      'jsonc/comma-dangle': 'off',

      'ts/no-redeclare': ['error', { ignoreDeclarationMerge: true }],

      'vue/v-on-event-hyphenation': 'off',

      'yaml/plain-scalar': 'off',
    },
  },
)
