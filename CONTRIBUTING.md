# Contributing to Job Application Agent

Thank you for your interest in contributing! This project follows ethical job application practices.

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards
- Be respectful and constructive
- Focus on solving real problems
- Follow ethical development practices
- Respect user privacy and data

### Unacceptable Behavior
- Implementing features that bypass security (CAPTCHA, login, etc.)
- Adding spam or mass automation features
- Violating terms of service of third-party platforms
- Sharing user data without consent

## How to Contribute

### Reporting Bugs
1. Check if the bug is already reported in Issues
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features
1. Check if the feature is already suggested
2. Create a new issue with:
   - Clear use case
   - Proposed implementation
   - Why it's valuable
   - Confirm it follows ethical guidelines

### Pull Requests

#### Before Starting
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Set up development environment (see DEVELOPMENT.md)

#### Development Process
1. Write code following project conventions
2. Add tests if applicable
3. Update documentation
4. Run linter: `npm run lint`
5. Format code: `npm run format`
6. Test locally

#### Submitting PR
1. Commit with clear messages: `feat: Add feature` or `fix: Fix bug`
2. Push to your fork
3. Open PR with:
   - Description of changes
   - Related issue number
   - Screenshots if UI changes
   - Checklist of completed items

#### PR Checklist
- [ ] Code follows project style guide
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No new TypeScript errors
- [ ] Changes are backwards compatible
- [ ] Follows ethical guidelines (no CAPTCHA bypass, etc.)

### Code Style

#### TypeScript
```typescript
// Use explicit types
const fetchJobs = async (filters: JobFilters): Promise<Job[]> => {
  // ...
}

// Use interfaces for objects
interface JobCardProps {
  job: Job
  onApply?: (jobId: string) => void
}
```

#### React Components
```typescript
// Use functional components
export default function JobCard({ job }: JobCardProps) {
  // ...
}

// Use Tailwind for styling
<div className="rounded-lg border border-gray-200 p-6">
```

#### File Organization
- Keep files focused and under 300 lines
- Extract reusable logic to services
- Use descriptive names
- Add comments for complex logic

### Ethical Guidelines

#### ✅ Acceptable Contributions
- Improving UI/UX
- Adding analytics features
- Enhancing AI generation quality
- Better job filtering
- Performance improvements
- Bug fixes
- Documentation improvements

#### ❌ Unacceptable Contributions
- CAPTCHA bypass
- Automated login to third-party sites
- Mass email sending without approval
- Scraping protected content
- Features that violate ToS
- Privacy-violating features

## Development Setup

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup instructions.

Quick start:
```bash
# Open in GitHub Codespaces
1. Click Code → Open with Codespaces

# Or local development
git clone https://github.com/YOUR_USERNAME/job-application-agent.git
cd job-application-agent
npm install
cp .env.local.example .env.local
# Fill in .env.local
npm run dev
```

## Project Structure

```
app/          # Next.js pages and API routes
components/   # React components
services/     # Business logic
lib/          # Utilities
types/        # TypeScript types
supabase/     # Database migrations
```

## Testing

### Manual Testing
1. Test each modified feature
2. Check edge cases
3. Test on different screen sizes
4. Verify no console errors

### Future: Automated Testing
We plan to add:
- Unit tests (Jest)
- Integration tests (Playwright)
- E2E tests

## Documentation

### Update When:
- Adding new features
- Changing API endpoints
- Modifying database schema
- Changing environment variables
- Updating dependencies

### Files to Update:
- README.md - High-level overview
- DEVELOPMENT.md - Dev setup and guidelines
- DEPLOYMENT.md - Deployment instructions
- API documentation (TODO)

## Community

### Getting Help
- GitHub Discussions for questions
- GitHub Issues for bugs/features
- Documentation for setup help

### Recognition
Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## Review Process

1. **Initial Review** (1-2 days)
   - Maintainer reviews PR
   - Provides feedback or approves

2. **Revisions** (as needed)
   - Address feedback
   - Update PR

3. **Final Review** (1 day)
   - Final check before merge

4. **Merge**
   - Squash and merge to main
   - Update changelog
   - Deploy to production

## License

By contributing, you agree that your contributions will be licensed under the MIT License with the Ethical Use Clause. See [LICENSE](LICENSE) for details.

## Questions?

Feel free to open a GitHub Discussion or reach out to the maintainers.

Thank you for contributing! 🎉
