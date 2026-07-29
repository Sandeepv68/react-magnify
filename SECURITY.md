# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported |
|---------|-----------|
| 1.3.x   | ✅ Active |
| 1.2.x   | ✅ Active |
| 1.1.x   | ⚠️ Critical fixes only |
| < 1.1   | ❌ Unsupported |

## Reporting a Vulnerability

We take the security of React Magnifier seriously. If you believe you have found a security vulnerability, please follow these steps:

### Private Disclosure Process

1. **Do not** disclose the vulnerability publicly via GitHub Issues, Discussions, or Pull Requests
2. **Do not** create a public issue mentioning the vulnerability
3. Send details to the maintainers via email at **sandeepv68@gmail.com**

### What to Include

- Type of vulnerability (XSS, prototype pollution, dependency issue, etc.)
- Full steps to reproduce the issue
- React version and browser where the issue was observed
- Any proof-of-concept code (if available)
- Impact assessment

### Response Timeline

- **24 hours**: Initial acknowledgment of your report
- **72 hours**: Assessment and severity classification
- **7 days**: Patch development and testing (for confirmed vulnerabilities)
- **14 days**: Public disclosure with fix release

## Security Considerations for Consumers

### XSS Prevention
React Magnifier uses React's built-in XSS protection. All user-provided strings (`imageUrl`, `imageAltText`, `cursor`, `magnifierBorderColor`, `magnifierBorderStyle`) are rendered as attributes or text content — never as raw HTML. However, consumers should still validate any user-supplied URLs passed to `imageUrl`.

### Dependency Security
- **styled-components** is the sole runtime peer dependency and is regularly monitored for CVEs
- All dependencies are checked with `npm audit` before each release
- Dependencies are pinned to exact versions in `package-lock.json`
- Dependabot is configured (if enabled) for automated security updates

### Input Validation
The component validates critical props at runtime:
- `imageUrl` must be a non-empty string (error logged if missing)
- `zoomSize` must be a positive number
- Magnifier dimensions must be positive numbers

### Reporting Non-Security Bugs
For non-security bugs, feature requests, or general issues, please use the [GitHub Issues](https://github.com/SandeepVattapparambil/react-magnify/issues) page.

## Security Best Practices for Consumers

1. **Validate image URLs**: Ensure `imageUrl` points to trusted sources, especially if user-generated
2. **Keep dependencies updated**: Regularly run `npm update` or use Dependabot
3. **Use Content Security Policy**: Add appropriate CSP headers to your application
4. **Sanitize alt text**: If `imageAltText` includes user input, sanitize it before passing to the component
5. **Review custom CSS classes**: When using `customImgClass` or `customContainerClass`, ensure the class names do not conflict with sensitive selectors

## Acknowledgments

We thank the security research community and our users for responsibly disclosing vulnerabilities and helping us keep React Magnifier secure.
