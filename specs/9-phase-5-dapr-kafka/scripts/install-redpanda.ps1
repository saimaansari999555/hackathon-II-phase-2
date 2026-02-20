# Install Redpanda on Kubernetes (Minikube/Kind/Docker Desktop)

# 1. Check prerequisites
Write-Host "Checking prerequisites..."
if (-not (Get-Command helm -ErrorAction SilentlyContinue)) {
    Write-Error "Helm is not installed. Please install Helm first: https://helm.sh/docs/intro/install/"
    exit 1
}

if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-Error "kubectl is not installed. Please install kubectl first."
    exit 1
}

# 2. Add Redpanda Repo
Write-Host "Adding Redpanda Helm repository..."
helm repo add redpanda https://charts.redpanda.com
helm repo update

# 3. Create Namespace
Write-Host "Creating 'redpanda' namespace..."
kubectl create namespace redpanda --dry-run=client -o yaml | kubectl apply -f -

# 4. Install Redpanda
Write-Host "Installing Redpanda..."
# For local development (Minikube/Docker Desktop), we use a lightweight configuration
helm upgrade --install redpanda redpanda/redpanda `
  --namespace redpanda `
  --set statefulset.replicas=1 `
  --set resources.cpu.cores=1 `
  --set resources.memory.container.max=2Gi `
  --set external.domain=custom-redpanda-domain.local `
  --wait

Write-Host "Redpanda installation complete!"
Write-Host "To access Redpanda externally, you may need to configure port forwarding."
