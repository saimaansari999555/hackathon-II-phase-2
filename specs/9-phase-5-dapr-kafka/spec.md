# Feature Specification: Phase V – Event-Driven Cloud-Native Upgrade

**Phase**: V
**Title**: Event-Driven Architecture with Dapr & Kafka
**Status**: Draft
**Created**: 2026-02-09

---

## 1. Objective
Upgrade the Todo Chatbot from a basic CRUD app to a production-grade, event-driven, cloud-native system using Kubernetes, Kafka, and Dapr.

## 2. Application Features
Implement advanced and intermediate features:
- **Recurring tasks**: Automate task creation for repeating schedules.
- **Due dates & reminders**: Time-sensitive task management.
- **Priorities, tags**: Enhanced organization and filtering.
- **Search, filter, sort**: Improved data discovery.

## 3. Architecture: Event-Driven (Kafka)
Decouple services using Kafka (or Redpanda locally):
- **Publish Events**:
  - `task-events`: Lifecycle events (created, updated, deleted).
  - `reminders`: Scheduled reminder triggers.
  - `task-updates`: Real-time status changes.
- **Consumers**:
  - **Notification Service**: Listens for reminders/updates to notify users.
  - **Recurring Task Service**: Manages regeneration of recurring tasks.
  - **Audit / Activity Log**: Records all system activity.

## 4. Dapr Integration
Use Dapr as the distributed application runtime to abstract infrastructure:
- **Pub/Sub**: Abstraction over Kafka/Redpanda.
- **State Management**: For conversation state (e.g., Redis via Dapr).
- **Service Invocation**: secure communication with discovery & retries.
- **Jobs API**: For exact-time reminders.
- **Secrets Management**: Secure configuration.
- **Constraint**: Application communicates ONLY with Dapr APIs, never directly with Kafka or DB.

## 5. Deployment
### Local (Minikube)
- Dapr installed on Kubernetes.
- Kafka/Redpanda running locally in-cluster.
- Services deployed via Helm.

### Cloud (AKS/GKE/OKE - Future)
- Production Kubernetes cluster.
- Managed Kafka (Redpanda / Confluent).
- CI/CD with GitHub Actions.
- Monitoring & logging.

## 6. functional Requirements
- **FR-01**: System must handle recurring task logic independent of the API service.
- **FR-02**: Notifications must be triggered asynchronously via Pub/Sub.
- **FR-03**: Users can search and filter tasks by priority/tags.

## 7. Success Criteria
- [ ] Dapr initialized in Minikube.
- [ ] Kafka/Redpanda running and healthy.
- [ ] Chat API publishes messages to Dapr Pub/Sub.
- [ ] Notification Service consumes messages successfully.
- [ ] Full system deployable via Helm.
