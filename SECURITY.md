# Security Policy

## SheMesh Tribe LLC — Public Ecosystem

This repository is the **public-facing** layer only.

### Never commit

Contributors must **NEVER** commit:

- Passwords  
- API keys  
- Access tokens  
- Authentication secrets  
- Recovery codes  
- Private cryptographic keys  
- Payment credentials  
- Private customer records  
- Private datasets  
- Confidential documents  
- Trade secrets  
- Proprietary algorithms  
- Protected implementation details  
- Confidential infrastructure information  

### If a secret is accidentally committed

1. **Stop using it** immediately.  
2. **Revoke / rotate** the credential.  
3. **Remove** it from the repository.  
4. **Check repository history** (consider history rewrite if the secret was pushed).  
5. **Notify the maintainer privately**.  
6. **Never paste the secret** into a public issue, pull request or comment.

### Reporting

Report suspected exposure of secrets or other security concerns to the repository maintainer through a private channel. Do not open a public issue that contains the secret itself.

### Scope

This public application uses only browser localStorage. There is no server-side authentication surface in the core public tools. Any future backend services would be documented and reviewed separately under the same “no secrets in public repos” rule.
