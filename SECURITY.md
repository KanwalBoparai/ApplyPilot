# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by emailing the maintainer directly. Do NOT create a public GitHub issue.

## Security Best Practices

### Environment Variables
- Never commit `.env.local` files
- Use strong, unique API keys
- Rotate keys regularly
- Store secrets in Vercel/environment only

### Database Security
- Row Level Security (RLS) enabled on all tables
- Service role key used only in API routes (server-side)
- Never expose service role key to client
- Regular backups enabled

### API Security
- All API routes validate user input
- Rate limiting implemented (TODO in production)
- CORS properly configured
- No sensitive data in error messages

### Authentication
- Supabase Auth handles authentication
- JWT tokens for session management
- Secure session storage
- Automatic token refresh

## Compliance

### Ethical Job Application Practices
This platform is designed to ASSIST, not spam:

✅ **Allowed:**
- Using public job board APIs and RSS feeds
- Generating application materials
- Organizing application tracking
- Sending manual recruiter outreach (with approval)

❌ **Forbidden:**
- Bypassing CAPTCHA systems
- Automated login to third-party platforms
- Submitting applications without user review
- Scraping protected content
- Spamming recruiters

### Data Privacy
- User data stored securely in Supabase
- No sharing of user data with third parties
- Users can delete their data anytime
- GDPR compliant (data export available)

### AI Usage
- OpenAI API for resume parsing and generation only
- No training on user data
- User content not retained by OpenAI (as per API terms)
- Clear disclosure of AI-generated content

## Dependencies

### Security Updates
We use Dependabot to monitor dependencies:
- Automatic PR for security updates
- Weekly checks for outdated packages
- Manual review before merging

### Trusted Dependencies
- Next.js (Vercel)
- Supabase (official SDK)
- OpenAI (official SDK)
- Resend (official SDK)

## Access Control

### Database
- Row Level Security on all tables
- Users can only access their own data
- Service role used sparingly
- Admin access logged

### API Routes
- Authentication required for sensitive endpoints
- Input validation on all routes
- Error handling without leaking internals

## Incident Response

If a security incident occurs:
1. Immediately rotate affected credentials
2. Notify affected users within 24 hours
3. Document incident and response
4. Implement preventive measures
5. Update security policy

## Security Checklist

### Before Deployment
- [ ] All environment variables are set
- [ ] RLS policies are enabled
- [ ] API keys are rotated from defaults
- [ ] HTTPS is enforced
- [ ] CORS is configured correctly
- [ ] Error messages don't leak sensitive info
- [ ] Rate limiting is enabled
- [ ] Input validation on all forms
- [ ] SQL injection prevention (using Supabase SDK)
- [ ] XSS prevention (React escaping + Content Security Policy)

### Regular Maintenance
- [ ] Review access logs monthly
- [ ] Update dependencies weekly
- [ ] Rotate API keys quarterly
- [ ] Review RLS policies quarterly
- [ ] Audit user data access
- [ ] Test backup recovery

## Contact

For security concerns: [Your contact method here]
For general issues: GitHub Issues
