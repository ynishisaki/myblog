const TAILWIND_CONFIG = {
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/classnames-order': 'off', // conflicts with prettier-plugin-tailwindcss
    'tailwindcss/enforces-negative-arbitrary-values': 'error',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/migration-from-tailwind-2': 'error',
    'tailwindcss/no-custom-classname': 'error'
  }
}

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  ignorePatterns: [
    'next-env.d.ts',
    'generated-page-map.js',
    'generated-page-map.ts'
  ],
  overrides: [
    // Rules for all files
    {
      files: '**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'prettier'
      ],
      plugins: ['import', 'unicorn', 'sonarjs'],
      rules: {
        'no-extra-boolean-cast': [
          'error',
          { enforceForInnerExpressions: true }
        ],
        'prefer-object-has-own': 'error',
        'logical-assignment-operators': [
          'error',
          'always',
          { enforceForIfStatements: true }
        ],
        'no-else-return': ['error', { allowElseIf: false }],
        'no-lonely-if': 'error',
        'prefer-destructuring': [
          'error',
          { VariableDeclarator: { object: true } }
        ],
        'import/no-duplicates': 'error',
        'no-negated-condition': 'off',
        'unicorn/no-negated-condition': 'error',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'object-shorthand': ['error', 'always'],
        'unicorn/prefer-regexp-test': 'error',
        'unicorn/no-array-for-each': 'error',
        'unicorn/prefer-string-replace-all': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        quotes: ['error', 'single', { avoidEscape: true }], // Matches Prettier, but also replaces backticks
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_' // allow underscores in destructuring
          }
        ],
        'prefer-object-spread': 'error',
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
        'unicorn/prefer-at': 'error',
        'sonarjs/no-small-switch': 'error',
        'prefer-const': ['error', { destructuring: 'all' }],
        'unicorn/prefer-array-index-of': 'error',
        'sonarjs/no-unused-collection': 'error',
        'unicorn/catch-error-name': 'error',
        'unicorn/prefer-optional-catch-binding': 'error',
        'unicorn/filename-case': 'error',
        // todo: enable
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
      }
    },
    // Rules for React files
    {
      files: 'packages/**',
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended'
        // 'plugin:@next/next/recommended'
      ],
      rules: {
        'react/prop-types': 'off',
        'react/no-unknown-property': ['error', { ignore: ['jsx'] }],
        'react-hooks/exhaustive-deps': 'error',
        'react/self-closing-comp': 'error',
        'no-restricted-syntax': [
          'error',
          {
            // ❌ useMemo(…, [])
            selector:
              'CallExpression[callee.name=useMemo][arguments.1.type=ArrayExpression][arguments.1.elements.length=0]',
            message:
              "`useMemo` with an empty dependency array can't provide a stable reference, use `useRef` instead."
          },
          {
            // ❌ z.object(…)
            selector:
              'MemberExpression[object.name=z] > .property[name=object]',
            message: 'Use z.strictObject is more safe.'
          }
        ],
        'react/jsx-filename-extension': [
          'error',
          { extensions: ['.tsx', '.jsx'], allow: 'as-needed' }
        ],
        'react/jsx-curly-brace-presence': 'error',
        'react/jsx-boolean-value': 'error'
      },
      settings: {
        react: { version: 'detect' }
      }
    },
    // Rules for TypeScript files
    {
      files: '**/*.{ts,tsx,cts,mts}',
      extends: [
        'plugin:deprecation/recommended'
        // TODO: fix errors
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parserOptions: {
        projectService: true
      },
      rules: {
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error'
      }
    },
    // ⚙️ nextra-theme-docs
    {
      ...TAILWIND_CONFIG,
      files: 'packages/nextra-theme-docs/**',
      plugins: ['typescript-sort-keys'],
      settings: {
        tailwindcss: {
          config: 'packages/nextra-theme-docs/tailwind.config.ts',
          callees: ['cn'],
          whitelist: [
            'nextra-breadcrumb',
            'nextra-bleed',
            'nextra-menu-desktop',
            'nextra-menu-mobile'
          ]
        }
      },
      rules: {
        ...TAILWIND_CONFIG.rules,
        'no-restricted-imports': [
          'error',
          {
            name: 'next/link',
            message: 'Use local <Anchor /> instead'
          }
        ]
      }
    },
    // ⚙️ nextra-theme-blog
    {
      ...TAILWIND_CONFIG,
      files: 'packages/nextra-theme-blog/**',
      settings: {
        tailwindcss: {
          config: 'packages/nextra-theme-blog/tailwind.config.ts',
          whitelist: ['subheading-']
        }
      }
    },
    // ⚙️ nextra
    {
      ...TAILWIND_CONFIG,
      files: 'packages/nextra/**',
      settings: {
        tailwindcss: {
          config: 'packages/nextra-theme-docs/tailwind.config.ts',
          callees: ['cn'],
          whitelist: ['nextra-code', 'nextra-filetree']
        }
      },
      rules: {
        ...TAILWIND_CONFIG.rules,
        'import/extensions': ['error', 'ignorePackages']
      }
    },

    // ⚙️ blog
    {
      files: 'packages/blog/**',
      settings: {
        next: { rootDir: 'packages/blog' }
      }
    },
    {
      files: [
        'prettier.config.js',
        'postcss.config.{js,cjs}',
        'next.config.js',
        '.eslintrc.cjs'
      ],
      env: {
        node: true
      }
    },
    {
      files: 'packages/{nextra,nextra-theme-docs,nextra-theme-blog}/**',
      rules: {
        // disable rule because we don't have pagesDir in above folders
        '@next/next/no-html-link-for-pages': 'off'
      }
    },
    {
      files: 'packages/nextra/src/**',
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['fs', 'node:fs'],
                message: 'Use `graceful-fs` instead'
              }
            ]
          }
        ]
      }
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'no-var': 'off'
      }
    }
  ]
}
