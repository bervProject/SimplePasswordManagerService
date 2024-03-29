# Simple Password Manager Service

[![SPMS Build (.NET)](https://github.com/bervProject/SimplePasswordManagerService/actions/workflows/spms-dotnet.yml/badge.svg)](https://github.com/bervProject/SimplePasswordManagerService/actions/workflows/spms-dotnet.yml)
[![codecov](https://codecov.io/github/bervProject/SimplePasswordManagerService/branch/main/graph/badge.svg?token=3y903WRHIN)](https://codecov.io/github/bervProject/SimplePasswordManagerService)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/5a145d5673b345878291690d9267c36f)](https://www.codacy.com/gh/bervProject/SimplePasswordManagerService/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bervProject/SimplePasswordManagerService&amp;utm_campaign=Badge_Grade)

Simple Password Manager Service

## Tools

.NET

## Storage Provider

1. MongoDB

### Planned

1. Azure Key Vault
2. AWS Secrets Manager

## Pipelines

### Azure DevOps

```mermaid
flowchart TD
    A[Install AWS CDK CLI] --> B(CDK Synth)
    B --> C[Docker Build]
    C --> D{Is Running in Main?}
    D -->|Yes| E[Push to ECR]
    D -->|No| F[End]
    E --> G[CDK Deploy]
    G --> F
```

## LICENSE

MIT
