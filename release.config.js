module.exports = {
  branches: ["master"],
  plugins: [
    [
      "semantic-release-gitmoji",
      {
        releaseRules: {
          major: { include: [":boom:"] },
          minor: { include: [":sparkles:"] },
          patch: {
            include: [
              ":bug:",
              ":ambulance:",
              ":lock:",
              ":recycle:",
              ":lipstick:",
              ":alien:",
              ":package:",
            ],
          },
        },
        releaseNotes: {
          template:
            '## v{{nextRelease.version}} ({{datetime "UTC:yyyy-mm-dd"}})\n\n' +
            '[📝 Release notes](https://github.com/{{owner}}/{{repo}}/releases/tag/v{{nextRelease.version}})' +
            '{{#if compareUrl}} · [💻 Compare]({{compareUrl}}){{/if}} · ' +
            '[🔖 Tag](https://github.com/{{owner}}/{{repo}}/tree/v{{nextRelease.version}}) · ' +
            '🗄️ Archive ([zip](https://github.com/{{owner}}/{{repo}}/archive/v{{nextRelease.version}}.zip) · ' +
            '[tar.gz](https://github.com/{{owner}}/{{repo}}/archive/v{{nextRelease.version}}.tar.gz))\n\n' +
            '{{#with commits}}\n' +
            '{{#if sparkles}}\n### ✨ New features\n\n{{#each sparkles}}- {{> commitTemplate}}{{/each}}\n{{/if}}\n' +
            '{{#if recycle}}\n### ♻️ Updates\n\n{{#each recycle}}- {{> commitTemplate}}{{/each}}\n{{/if}}\n' +
            '{{#if lipstick}}\n### 💄 Interface changes\n\n{{#each lipstick}}- {{> commitTemplate}}{{/each}}\n{{/if}}\n' +
            '{{#if bug}}\n### 🐛 Bug fixes\n\n{{#each bug}}- {{> commitTemplate}}{{/each}}\n{{/if}}\n' +
            '{{#if ambulance}}\n### 🚑 Critical hotfixes\n\n{{#each ambulance}}- {{> commitTemplate}}{{/each}}\n{{/if}}\n' +
            '{{#if lock}}\n### 🔒 Security issues\n\n{{#each lock}}- {{> commitTemplate}}{{/each}}\n{{/if}}\n' +
            '{{#if arrow_up}}\n### ⬆️ Dependency updates\n\n{{#each arrow_up}}- {{> commitTemplate}}{{/each}}\n{{/if}}\n' +
            '{{#if boom}}\n### 💥 Breaking changes\n\n{{#each boom}}- {{> commitTemplate}}{{/each}}\n{{/if}}\n' +
            '{{/with}}',
          partials: {
            commitTemplate:
              '[`{{commit.short}}`](https://github.com/{{owner}}/{{repo}}/commit/{{commit.short}}) {{subject}}\n' +
              '{{#if issues}}(Issues:{{#each issues}} [`{{text}}`]({{link}}){{/each}}){{/if}}' +
              '{{#if wip}}{{#each wip}}\n- [`{{commit.short}}`](https://github.com/{{owner}}/{{repo}}/commit/{{commit.short}}) {{subject}}{{/each}}\n{{/if}}',
          },
          issueResolution: {
            template: "{baseUrl}/{owner}/{repo}/issues/{ref}",
            baseUrl: "https://github.com",
            source: "github.com",
          },
        },
      },
    ],
    "@semantic-release/github",
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json", "package-lock.json"],
        message: ":bookmark: Release v${nextRelease.version} [skip ci]",
      },
    ],
  ],
};
