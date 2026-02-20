# Execution Plan: Phase V – Event-Driven Cloud-Native Upgrade

**Related Spec**: Phase V – Event-Driven Architecture with Dapr & Kafka
**Status**: Draft
**Created**: 2026-02-09

---

## 1. Objective
Transform the monolithic-style Todo App into a distributed, event-driven system using Dapr for abstraction and Kafka (Redpanda) for messaging, running on a local Kubernetes cluster.

## 2. High-Level Strategy
1.  **Infrastructure Setup**: Install Dapr and Redpanda on Minikube.
2.  **Dapr Configuration**: Create Dapr Components for Pub/Sub (Kafka) and State Store (Redis/Postgres).
3.  **App Adaptation**: Refactor Backend to use Dapr SDK for publishing events.
4.  **New Services**: functionality split into microservices (Notification Service, Recurring Task Service).
5.  **Deployment**: update Helm charts to include Dapr sidecars.

## 3. Execution Phases

### Phase 1: Infrastructure & Dapr Setup
**Goal**: Get the "plumbing" ready.
- **Actions**:
    - Install Redpanda (Kafka) via Helm.
    - Install Dapr on K8s (`dapr init -k`).
    - Verify Dapr control plane health.

### Phase 2: Dapr Component Configuration
**Goal**: Define how apps talk to infrastructure.
- **Actions**:
    - Create `pubsub.yaml` (Dapr component for Kafka).
    - Create `statestore.yaml` (Dapr component for Redis).
    - Apply configurations to K8s.

### Phase 3: Backend Refactoring (Publisher)
**Goal**: Make the main backend publish events instead of just saving to DB.
- **Actions**:
    - Add `dapr-python-sdk` to backend.
    - Refactor `create_task` to publish `task.created` event.
    - Refactor `update_task` to publish `task.updated` event.

### Phase 4: New Microservices (Consumers)
**Goal**: Create specific services that react to events.
- **Notification Service**:
    - Python/Node.js service.
    - Subscribes to `task.created` and `reminders`.
    - Logs to console (mock email).
- **Audit Service**:
    - Subscribes to all events (`task.*`).
    - Logs activity to a database or file.

### Phase 5: Deployment & Verification
**Goal**: Deploy everything to Minikube and verify end-to-end.
- **Actions**:
    - Update Dockerfiles for new services.
    - Update Helm charts to add `dapr.io/enabled: "true"` annotations.
    - Deploy all services.
    - Test: Create a task -> Verify Audit Service logs it -> Verify Notification Service "sends" email.

## 4. Verification Checkpoints
- [ ] `kubectl get pods -n dapr-system` shows all Dapr pods running.
- [ ] `kubectl get pods -n redpanda` shows Redpanda running.
- [ ] Backend logs show "Published event to Dapr".
- [ ] Notification logs show "Received event from Dapr".

## 5. Dependencies
- Helm
- Kubectl
- Dapr CLI
- Docker
