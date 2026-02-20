---
name: deployment.devops.todo
description: Handles deployment, DevOps configuration, and operational readiness for Todo Web App including CI/CD pipelines, containerization, monitoring, and production deployment strategies
---

# Deployment & DevOps Skill

## Instructions

### When to Use
- Preparing application for production deployment
- Setting up CI/CD pipelines for automated testing and deployment
- Containerizing frontend and backend applications
- Configuring environment-specific configurations (dev, staging, prod)
- Setting up monitoring, logging, and alerting
- Creating deployment documentation
- Planning rollback strategies
- Optimizing for performance and scalability
- Before first production deployment

### What This Skill Does
Implements complete deployment infrastructure:
1. Docker containerization for frontend and backend
2. Docker Compose for local development
3. GitHub Actions CI/CD pipelines
4. Automated testing on every commit
5. Automated deployment on merge to main
6. Environment variable management
7. Secrets management (API keys, database credentials)
8. Database migration strategy
9. Monitoring and alerting setup
10. Rollback and disaster recovery procedures
11. Performance optimization for production
12. Security hardening for deployment

### How Claude Should Behave
- Create production-ready deployment configurations
- Implement automated testing and deployment
- Setup proper secret management (never hardcode secrets)
- Create clear deployment documentation
- Plan for failure scenarios and rollbacks
- Optimize for performance and reliability
- Implement monitoring and alerting
- Setup health checks and status pages
- NO manual deployment instructions—fully automated
- Create reproducible, reliable deployment processes

### Example Usage

```
User: "Setup complete CI/CD and prepare for production deployment"
Claude: Invokes todo-integration-agent (or creates deployment guide) →
  - Creates Dockerfiles
  - Sets up GitHub Actions workflows
  - Configures environment management
  - Creates deployment playbook
  - Sets up monitoring
```

## Examples

### Example 1: Complete Containerization
**Scenario:** Need to containerize frontend and backend for deployment.

**Input:**
```
Containerize Todo app:
- Create Dockerfile for frontend (Next.js)
- Create Dockerfile for backend (FastAPI)
- Create docker-compose.yml for local development
- Include PostgreSQL service
- Setup volumes for code changes
```

**Process:**
1. Create Dockerfile for Next.js app
   - Multi-stage build for optimization
   - Environment variable handling
   - Health checks
2. Create Dockerfile for FastAPI app
   - Dependency installation
   - Port exposure
   - Startup command
3. Create docker-compose.yml
   - Frontend service (port 3000)
   - Backend service (port 8000)
   - PostgreSQL service (port 5432)
   - Volume mounts for development
   - Environment file support
4. Test local startup with docker-compose

**Output:**
```
Dockerfile (frontend)
Dockerfile (backend)
docker-compose.yml
.dockerignore files
Build and startup documentation

Commands:
docker compose up (starts all services)
docker compose down (stops all services)
```

### Example 2: GitHub Actions CI/CD Pipeline
**Scenario:** Need automated testing and deployment.

**Input:**
```
Setup GitHub Actions:
- Run tests on every push
- Run linting and type checking
- Deploy to staging on merge to develop
- Deploy to production on merge to main
- Run migrations automatically
- Verify deployments with health checks
```

**Process:**
1. Create workflow for testing (push to any branch)
   - Install dependencies
   - Run unit tests
   - Run linting
   - Run type checking
2. Create workflow for staging deployment (merge to develop)
   - Build Docker images
   - Push to container registry
   - Deploy to staging environment
   - Run smoke tests
3. Create workflow for production deployment (merge to main)
   - Build Docker images
   - Push to container registry
   - Deploy to production environment
   - Run health checks
   - Create deployment record
4. Add environment secrets to GitHub

**Output:**
```
.github/workflows/
├── test.yml (runs on all pushes)
├── deploy-staging.yml (runs on develop merge)
└── deploy-prod.yml (runs on main merge)

Jobs in each workflow:
- Install and test
- Build and push images
- Deploy to environment
- Health check
- Notification
```

### Example 3: Environment Configuration
**Scenario:** Need to manage different configurations for dev/staging/prod.

**Input:**
```
Setup environment management:
- .env.development for local dev
- .env.staging for staging environment
- .env.production for production
- Never commit .env (add to .gitignore)
- Document all required environment variables
```

**Process:**
1. Create .env.example with all variables
2. Document each variable (required, default, description)
3. Setup .gitignore to exclude .env files
4. Create environment loading in backend (config.py)
5. Create environment loading in frontend (next.config.js)
6. Setup secrets in GitHub Actions
7. Implement environment validation on startup

**Output:**
```
.env.example
Environment variables guide:
- DATABASE_URL
- API_BASE_URL
- JWT_SECRET
- CORS_ORIGINS
- LOG_LEVEL
- etc.

Backend config validation:
- Startup checks all required vars
- Logs error if missing
- Won't start without proper config
```

### Example 4: Monitoring and Alerting
**Scenario:** Need visibility into application health.

**Input:**
```
Setup monitoring:
- Application logs collection
- Error tracking
- Performance metrics
- Health check endpoint
- Status dashboard
- Alerts for critical issues
```

**Process:**
1. Add health check endpoint (/health) to backend
2. Setup structured logging (JSON format)
3. Configure log aggregation (CloudWatch, ELK, etc.)
4. Add performance metrics (response time, error rate)
5. Setup alerting for critical thresholds
6. Create status dashboard
7. Document runbooks for common issues

**Output:**
```
Backend health endpoint:
GET /health → {status: "ok", timestamp, version}

Metrics tracked:
- API response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- Authentication failures
- Database query time
- Task creation/completion rates

Alerts:
- 5xx error rate > 1%
- Response time p95 > 2s
- Database connection failures
- High memory usage
```

### Example 5: Deployment Playbook
**Scenario:** Document complete deployment process.

**Input:**
```
Create deployment playbook:
- Pre-deployment checklist
- Deployment steps
- Verification steps
- Rollback procedure
- Post-deployment tasks
```

**Process:**
1. Create pre-deployment checklist
   - All tests passing
   - Code reviewed
   - Database migrations prepared
   - Secrets configured
   - No breaking changes
2. Document deployment steps
   - Build images
   - Push to registry
   - Deploy to production
   - Run migrations
   - Verify health
3. Create rollback procedure
   - Revert to previous image
   - Rollback database migrations
   - Clear caches
4. Document post-deployment
   - Verify with real requests
   - Check monitoring/logs
   - Notify stakeholders

**Output:**
```
DEPLOYMENT.md

Pre-Deployment:
- [ ] All tests passing
- [ ] Code reviewed by 2 developers
- [ ] Database migrations tested
- [ ] Secrets updated

Deployment:
1. git tag -a v1.2.3
2. git push origin v1.2.3
3. GitHub Actions automatically deploys
4. Verify health check
5. Run smoke tests

Rollback:
kubectl rollout undo deployment/todo-app
(or) docker service rollback (if swarm)

Post-Deployment:
- Verify /health endpoint
- Check logs for errors
- Test critical user flows
- Notify #general channel
```

### Example 6: Database Migration Strategy
**Scenario:** Need to safely deploy schema changes.

**Input:**
```
Implement database migration strategy:
- Zero-downtime migrations
- Automatic migration on deployment
- Rollback capability
- Backup before migration
```

**Process:**
1. Use Alembic for migrations (FastAPI standard)
2. Create migration that's backwards compatible
3. Run migration as part of deployment
4. Add backup step before migration
5. Verify migration success
6. Document rollback procedure

**Output:**
```
Database migration workflow:
1. Developer creates new migration: alembic revision --autogenerate
2. Migration committed to repo
3. GitHub Actions runs: alembic upgrade head
4. If fails, automatic rollback
5. If succeeds, deployment continues

All migrations:
- Backwards compatible (if possible)
- Tested in CI
- Automated on deploy
- Versioned and tracked
```

## Acceptance Criteria

- ✅ Dockerfiles created for frontend and backend
- ✅ Docker Compose file for local development
- ✅ CI/CD pipelines configured (test, build, deploy)
- ✅ Automated testing runs on every commit
- ✅ Automated deployment on merge to main
- ✅ Environment variables properly managed (.env)
- ✅ Secrets stored in GitHub Actions (never in code)
- ✅ Database migration strategy defined
- ✅ Health check endpoint available
- ✅ Monitoring and logging configured
- ✅ Alerting setup for critical issues
- ✅ Rollback procedure documented and tested
- ✅ Pre-deployment checklist created
- ✅ Deployment playbook documented
- ✅ Post-deployment verification steps
- ✅ Performance optimized for production
- ✅ Security hardening implemented (HTTPS, CORS, rate limiting)
- ✅ Scaling strategy documented (horizontal/vertical)
- ✅ Disaster recovery plan in place
- ✅ Ready for production deployment
