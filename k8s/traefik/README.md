# Setup & Implement Traefik for INGRESS & INGRESS ROUTE

### Install Traefik via Helm chart

```bash
helm repo add traefik https://helm.traefik.io/traefik
helm repo update
```

### Update the default values.yaml to activate ingress and ingress route

```bash
helm show values traefik/traefik > values.yaml
nano values.yaml
```

### Modify the values.yaml

```bash
ingressClass:
  enabled: true
  isDefaultClass: true
service:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
globalArguments:
- "--api.insecure=true"
```

### Update/Install with new value.yaml

```bash
helm install traefik traefik/traefik --create-namespace --namespace=traefik --values=values.yaml



helm upgrade --install traefik traefik/traefik --namespace traefik --values values.yaml
```


### Check traefik pod and LB assigned to it or not 

```bash
kubectl get service -n traefik
```

### Lets deploy our app manifests

```bash
kubectl apply -f k8s/app/
```

### Now lets deploy ingress

```bash
kubectl apply -f traefik/ingress.yaml
```

### Now lets deploy ingress route

```bash
kubectl apply -f traefik/ingress-route.yaml
```
