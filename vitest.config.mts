import { defineConfig } from 'vitest/config'

const exclude = [
  '**/node_modules/**',
  '**/dist/**',
  '**/lib/**',
  '**/cache/**',
  '**/data/**',
  '**/temp/**',
]

export default defineConfig({
  test: {
    clearMocks: true,
    exclude,
    passWithNoTests: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['packages/**/src/**/*.{ts,tsx}', 'scripts/**/*.ts'],
      exclude: [
        ...exclude,
        '**/*.d.ts',
        '**/*.{test,spec}.{ts,tsx,js,jsx}',
        '**/global*.ts',
        '**/types/**',
      ],
    },
    projects: [
      {
        test: {
          name: 'node',
          environment: 'node',
          include: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
          exclude: [...exclude, '**/*.{dom,browser}.{test,spec}.{ts,tsx,js,jsx}'],
        },
      },
      {
        test: {
          name: 'dom',
          environment: 'happy-dom',
          include: ['**/*.{dom,browser}.{test,spec}.{ts,tsx,js,jsx}'],
          exclude,
        },
      },
    ],
  },
})
