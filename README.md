To contribute to NSUT-IIF Website, please follow these guidelines:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix: `git checkout -b feat/your-feature-name` or `git checkout -b fix/your-bug-fix-name`.
4. Make your changes and commit them with descriptive messages: `git commit -am 'add your commit message'`.
5. Push your changes to your forked repository: `git push origin feat/your-feature-name`.
6. Submit a pull request to the main repository.

## Commit Message Format <a name="commit-message-format"></a>

Follow the conventional commit message format to provide a clear and standardized history of our project's changes. Each commit message should consist of a type and a descriptive message.

| Type     | Heading  | Rule                                       | Description                                                                       |
| -------- | -------- | ------------------------------------------ | --------------------------------------------------------------------------------- |
| ci       | CI       | Continuous Integration                     | Changes related to continuous integration.                                        |
| chore    | Chore    | Maintenance tasks                          | Other changes that don't affect production.                                       |
| docs     | Docs     | Documentation                              | Changes related to documentation.                                                 |
| feat     | Feature  | New Feature                                | New feature implementations or additions.                                         |
| fix      | Fix      | Bug Fixes                                  | Bug fixes or corrections.                                                         |
| perf     | Perf     | Performance Improvements                   | Performance-related improvements.                                                 |
| refactor | Refactor | Code Refactoring                           | Code changes that don't fix bugs or add features, but improve the code structure. |
| revert   | Revert   | Revert Previous Commits                    | Reverting previous commits.                                                       |
| style    | Style    | Code Formatting or Style                   | Changes related to code formatting or style.                                      |
| assets   | Assets   | Add or Update Assets (e.g., images, files) | Changes related to adding or updating assets, such as images or other files.      |

### Format

The commit message should start with the type, followed by a colon and a space, and then the descriptive message in present tense.

Example:

- feat: add user authentication feature
- fix: correct typo in README

Please adhere to this format when making commits. This will help us maintain a clean and organized commit history.
